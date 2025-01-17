// LICENSE_CODE ZON
'use strict'; /*jslint node:true, browser:true, es5: true, -W082*/
(function(){
var magic = 'SLOADER', inited, frame_srcs = [], params;
var poll_timer, load_timer, init = function(){};
var protocol = typeof window!='undefined' && window.location &&
    window.location.protocol;
protocol = !protocol || !/^http/.test(protocol) ? 'http:' : protocol;
var loader_url = protocol+'//player.h-cdn.com/loader.js?customer=ard_de&no_conf=true&md5=969398-7f0d8625';
var config_url = protocol+'//player.h-cdn.com/config.js?customer=ard_de&md5=47014-b6aaf6dd';
var script_load_delay = +'4000';
var script_delay_root_only = +'1';
window.spark_live_cache_seed = '1695458355899000000';
function debug_log(msg){
    if (console.debug)
        console.debug(msg);
}
function load_custom_scripts(){
    if (!(scripts instanceof Array))
        return;
    if (scripts.length==1 && scripts[0].name=='loader_full')
        return;
    if (scripts.length==1 && scripts[0].name=='loader_api_wrapper')
    {
        create_script(protocol+'//player.h-cdn.com/loader_api_wrapper.js?customer=ard_de&no_conf=true&md5=28819-a5fccf34', 'loader_api_wrapper');
        create_script(config_url, 'config');
        return true;
    }
    try {
        for (var i=0; i<scripts.length; ++i)
            create_script(scripts[i].url, scripts[i].name||'unknown'+i);
        return true;
    } catch(e){ debug_log(e); }
}
function load_script(caller){
    var a = location.search.match(/spark_loader_delay=([0-9]+)/);
    var delay = (a && +a[1])||script_load_delay;
    var root_only = (a && +a[1])||script_delay_root_only;
    debug_log('Spark loader: load_script by '+caller+' on '+(is_top ? 'top' :
        'frame'));
    clearTimeout(load_timer);
    if (load_custom_scripts())
        return;
    if (spark_mode)
    {
        loader_url += (~loader_url.indexOf('?') ? '&' : '?')
            +'spark_mode='+spark_mode;
    }
    if (delay && (!root_only || location.pathname=='/')){
        setTimeout(function(){
            create_script(loader_url, 'loader');
            create_script(config_url, 'config');
        }, delay);
        return;
    }
    create_script(loader_url, 'loader');
    create_script(config_url, 'config');
}
function create_script(url, name){
    var script = document.createElement('script');
    script.onload = function(){ storage_set('spark_'+name+'_url', url); };
    script.src = url;
    script.async = true;
    if (document.getElementsByTagName('head').length)
        document.getElementsByTagName('head')[0].appendChild(script);
    else if (document.getElementsByTagName('body').length)
        document.getElementsByTagName('body')[0].appendChild(script);
    else if (document.head)
        document.head.appendChild(script);
}
function get_top_url(){
    if (typeof window=='undefined' || typeof document=='undefined')
        return;
    var info = {location: (window.location||{}).href};
    if (window.top!=window)
    {
        info.referrer = document.referrer;
        try { info.top_location = window.top.location.href; } catch(e){}
    }
    return info.top_location||info.referrer||info.location;
}
function is_url_match(match, url){
    try {
        if (typeof match=='string')
            match = JSON.parse(match);
    } catch(e){ match = undefined; }
    if (!(match instanceof Array)||!match.length)
        return false;
    return match.filter(function(_match){
        return new RegExp(_match).test(url); })[0];
}
function is_random_match(r){
    if (!r || isNaN(r))
        return;
    var rand = storage_get('spark_loader_rand');
    if (!rand)
        storage_set('spark_loader_rand', rand = Math.random());
    return rand > r/100;
}
function verify_msg(e){
    return e.data && typeof e.data=='string' && e.data.startsWith(magic); }
function on_top_msg(e){
    if (!verify_msg(e))
        return;
    debug_log('Spark loader: received top msg '+e.data);
    var data = {top_url: top_url}, rand;
    if (params.length)
        data.params = params;
    if (rand = storage_get('spark_loader_rand'))
        data.rand = rand;
    e.source.postMessage(magic+'welcome'+JSON.stringify(data), '*');
    if (inited)
        e.source.postMessage(magic+'init_script', '*');
    else
        frame_srcs.push(e.source);
}
function on_frame_msg(ev){
    if (!verify_msg(ev))
        return;
    debug_log('Spark loader: received frame msg '+ev.data);
    if (ev.data.substring(0, magic.length+7)==magic+'welcome')
    {
        clearTimeout(poll_timer);
        try { top_p = JSON.parse(ev.data.substring(magic.length+7)); }
        catch(e){ debug_log('fail '+ev.data.substring(magic.length+7)); }
        init();
    }
    else if (ev.data==magic+'init_script')
        init_load_script();
}
function poll_top_frame(){
    window.top.postMessage(magic+'hello', '*');
    poll_timer = setTimeout(poll_top_frame, 1000);
}
function add_event_listener(ev, cb){
    if (window.addEventListener)
        window.addEventListener(ev, cb);
    else if (window.attachEvent)
        window.attachEvent(ev=='load' ? 'onload' : ev, cb);
    else if (ev=='load')
        window.onload = cb;
}
function remove_event_listener(ev, cb){
    if (window.removeEventListener)
        window.removeEventListener(ev, cb);
    else if (window.detachEvent)
        window.detachEvent(ev=='load' ? 'onload' : ev, cb);
    else if (ev=='load')
        window.onload = undefined;
}
var ev_name;
function on_page_load(){
    remove_event_listener(ev_name, on_page_load);
    load_script('on_page_load');
}
function on_load_timeout(){
    remove_event_listener(ev_name, on_page_load);
    load_script('load_timer');
}
function init_load_script(){
    if (inited)
        return;
    debug_log('Spark loader: init load script event '+ev);
    inited = true;
    frame_srcs.forEach(function(s){
        s.postMessage(magic+'init_script', '*'); });
    if (iframe_autoload && !is_top)
        load_script('iframe_autoload');
    else if (ev=='page_load' || ev=='external')
    {
        ev_name = ev=='page_load' ? 'load' : 'external_spark_load';
        var loaded = ev=='page_load' ? document.readyState=='complete' :
            window.init_spark_load;
        if (loaded)
            load_script('loaded');
        else
        {
            add_event_listener(ev_name, on_page_load);
            if (ev=='page_load')
            {
                load_timer = setTimeout(on_load_timeout, is_top ?
                    timeout||20000 : 10000);
            }
        }
    }
    else if (ev=='cpu_idle')
    {
        if (window.requestIdleCallback)
        {
            window.requestIdleCallback(load_script.bind(null, 'cpu_idle'),
                {timeout: timeout||10000});
        }
        else
            setTimeout(load_script, timeout||10000, 'cpu_idle');
    }
    else
        setTimeout(load_script, +ev||500, 'timer');
}
var _is_mocha = undefined;
function is_mocha(){
    if (_is_mocha!==undefined)
        return _is_mocha;
    if (typeof process!='undefined' && typeof process.env!='undefined')
        return _is_mocha = process.env.IS_MOCHA||false;
    return _is_mocha = false;
}
function _has_local_storage(){
    try {
        var _ = window.localStorage;
        if (_.length)
            return true;
        _.setItem('_', 0);
        _.removeItem('_');
        return true;
    } catch(e){}
}
var disable_storage = +'0';
var has_local_storage = _has_local_storage();
function storage_get(i){ return has_local_storage ?
    window.localStorage.getItem(i) : undefined;
}
function storage_set(i, v){
    if (!disable_storage && has_local_storage)
        window.localStorage.setItem(i, v);
}
function cached(name, url){
    return url.indexOf('md5=')>-1 && storage_get('spark_'+name+'_url')==url; }
var is_top = window==window.top;
var rules = '[]';
var ev = 'page_load';
var timeout = +'15000';
var ev_cached = '';
var enable_cached_key = '';
var ab_testing = '';
var iframe_autoload = +'0';
var url_filter = '';
var min_android_ver = '0';
var min_ios_ver = '0';
var random = +'0';
var experimental = '';
var top_url = get_top_url(), os_ver, top_p;
var is_spark_cp = !!top_url.match(/holaspark.com\/cp\//);
var local_p = storage_get('spark_load');
var spark_mode = storage_get('spark_mode')||
    (top_url.match(/(\?|&|#)spark_mode=([a-z_]+)($|&|#)/)||[])[2];
var url_p = (top_url.match(/(\?|&|#)spark_load=([0-9a-z_;]+)($|&|#)/)||[])[2];
var ua = typeof window!=undefined && navigator && navigator.userAgent;
var scripts;
params = url_p||local_p ? (url_p||local_p).split(';') : [];
if (/(\?|&|#)spark_enable=(1|true)($|&|#)/.test(top_url))
    params.push('spark_enable');
if (/(\?|&|#)spark_disable=(1|true)($|&|#)/.test(top_url))
    params.push('spark_disable');
window.spark_loader = window.spark_loader||{};
window.spark_loader.top_url = top_url;

if (params.indexOf('spark_disable')!=-1 || random &&
    (!has_local_storage || disable_storage))
{
    return;
}

function is_filtered(rule){
    if (is_url_match(rule.url_filter, top_url) || is_random_match(rule.random))
        return true;
    if (rule.min_android_ver && ua
        && (os_ver=/(Android|Andr0id)(?: (\d+\.\d+))?/.exec(ua)) && os_ver[2]
        && +os_ver[2] < +rule.min_android_ver)
    {
        return true;
    }
    if (rule.min_ios_ver && ua && (os_ver=
        /(?:iPhone|iPad|iPod|iPod touch);.*?OS (\d+[._]\d+)/.exec(ua))
        && os_ver[1] && +os_ver[1].replace('_', '.') < +rule.min_ios_ver)
    {
        return true;
    }
    return false;
}
var _init = function(){
    try { rules = rules ? JSON.parse(rules) : []; }
    catch(e){ rules = []; }
    rules.push({match: ['.*'], url_filter: url_filter, random: random,
        min_android_ver: min_android_ver, min_ios_ver: min_ios_ver, ev: ev,
        ab_testing: ab_testing});
    var rule = rules.filter(function(r){
        return is_url_match(r.match, top_url); })[0];
    if (params.indexOf('spark_enable')==-1 && is_filtered(rule))
        return;
    ev = rule.ev||ev;
    if (rule.loader_host)
    {
        var host_re = /\/\/[^/]+\//, rule_host = '//'+rule.loader_host+'/';
        loader_url = loader_url.replace(host_re, rule_host);
        config_url = config_url.replace(host_re, rule_host);
    }
    if (ev_cached && (!enable_cached_key ||
        storage_get('spark_enable_cached_event')==enable_cached_key) &&
        cached('loader', loader_url) && cached('config', config_url))
    {
        ev = ev_cached;
        timeout = +''||timeout;
    }
    scripts = rule.scripts;
    ab_testing = rule.ab_testing;
    if (!params.length)
        return true;
    ev = params[0];
    ab_testing = is_spark_cp ? false : params.indexOf('ab_testing')!=-1 ? true
        : params.indexOf('disable_ab_testing')!=-1 ||
        params.indexOf('spark_enable')!=-1 ? false : ab_testing;
    var t = params.find(function(p){ return /^(\d+)$/.test(p); });
    if (t && (t = t.match(/^(\d+)$/)))
        timeout = t[1];
    return true;
};

if (!experimental)
{
    if (!_init())
        return;
    if (ab_testing)
        add_event_listener('message', is_top ? on_top_msg : on_frame_msg);
    if (!ab_testing || window.init_spark_load)
        return init_load_script();
    if (!is_top)
        poll_top_frame();
    else
        add_event_listener('init_spark_load', init_load_script);
}
else
{
    init = function(){
        if (top_p)
        {
            if (top_p.params)
                params = params.concat(top_p.params);
            if (top_p.rand)
                storage_set('spark_loader_rand', top_p.rand);
            window.spark_loader.top_url = top_url = top_p.top_url;
        }
        if (!_init())
            return;
        if (!ab_testing || window.init_spark_load)
            return init_load_script();
        if (is_top)
            add_event_listener('init_spark_load', init_load_script);
    };
    add_event_listener('message', is_top ? on_top_msg : on_frame_msg);
    if (is_top)
        init();
    else
        poll_top_frame();
}
if (is_mocha())
{
    window.hsl = {set_top_url: function(url){ top_url = url; },
        set_ua: function(_ua){ ua = _ua; }, is_filtered: is_filtered,
        set_conf: function(conf){ url_filter = conf.url_filter;
        random = conf.random; min_android_ver = conf.min_android_ver;
        min_ios_ver = conf.min_ios_ver; ev = conf.ev;
        ab_testing = conf.ab_testing; }, has_local_storage: function(){
        has_local_storage = _has_local_storage(); }};
    if (typeof window.hola_cdn_on_load=='function')
        window.hola_cdn_on_load();
}
}());
