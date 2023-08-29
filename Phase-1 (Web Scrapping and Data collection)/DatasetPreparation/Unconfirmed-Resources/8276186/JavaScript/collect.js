(function () {
    Number.prototype.mul = function (arg) {
        var m = 0,
            s1 = this.toString(),
            s2 = arg.toString();
        try {
            m += s1.split(".")[1].length;
        } catch (e) {}
        try {
            m += s2.split(".")[1].length;
        } catch (e) {}
        return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / Math.pow(10, m);
    };

    function funcUrlDel(names) {
        if (typeof names == "string") {
            names = [names];
        }
        var loca = window.location;
        var obj = {};
        var arr = loca.search.substr(1).split("&");
        //获取参数转换为object
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        }
        //删除指定参数
        for (var i = 0; i < names.length; i++) {
            delete obj[names[i]];
        }
        //重新拼接url

        if (JSON.stringify(obj) === "{}") {
            return loca.origin + loca.pathname;
        } else {
            var url =
                loca.origin +
                loca.pathname +
                "?" +
                JSON.stringify(obj)
                    .replace(/[\"\{\}]/g, "")
                    .replace(/\:/g, "=")
                    .replace(/\,/g, "&");
            return url;
        }
    }

    function Collect() {
        //是否提交统计
        this.isSubmitPerformance = false;

        //页面渲染高度出现滚动高度时间
        this.ttsr_end_time = 0;

        // 第一次错误发送page_view_error
        this.firstSendError = false;

        this.initScrollHeight();
    }

    /**
     * @description: 添加计时器获取滚动高度
     * @param {*}
     * @return {*}
     */
    Collect.prototype.initScrollHeight = function () {
        const self = this;
        let limit = 0;
        const timer = setInterval(function () {
            if ((document.body && document.body.scrollHeight > 0) || limit++ == 500) {
                clearInterval(timer);
                self.ttsr_end_time = new Date().getTime();
            }
        }, 10);
    };

    /**
     * @description: 时间毫秒
     * @param {*} str 字符串
     * @return {*}
     */
    Collect.prototype.getDateSec = function (str) {
        const str1 = str.substring(1, str.length) * 1;
        const str2 = str.substring(0, 1);
        if (str2 == "s") {
            return str1 * 1000;
        } else if (str2 == "h") {
            return str1 * 60 * 60 * 1000;
        } else if (str2 == "d") {
            return str1 * 24 * 60 * 60 * 1000;
        }
    };

    /**
     * @description:  //设置cookie
     * @param {*} name  key
     * @param {*} value value
     * @param {*} time 存储时间 s20是代表20秒 h是指小时，如12小时则是：h12 d是天数，30天则：d30
     * @param {*} path 路径
     * @return {*}
     */
    Collect.prototype.setCookie = function (name, value, time, path) {
        const strsec = this.getDateSec(time);
        const exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=" + (path || "/");
    };

    /**
     * @description: 获取cookie
     * @param {*} name key
     * @return {*} 为空返回false
     */
    Collect.prototype.getCookie = function (name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) {
            return decodeURIComponent(arr[2]);
        } else {
            return false;
        }
    };

    Collect.prototype.formatDate = function (date, format) {
        const opt = {
            "Y+": date.getFullYear().toString(), // 年
            "m+": (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
            "d+": date.getDate().toString(), // 日
            "H+": date.getHours().toString(), // 时
            "M+": date.getMinutes().toString(), // 分
            "S+": date.getSeconds().toString() // 秒
        };
        for (let k in opt) {
            let r = new RegExp("(" + k + ")").exec(format);
            // 若输入的长度不为1，则前面补零
            if (r) format = format.replace(r[1], RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, "0"));
        }
        return format;
    };

    /**
     * @description:  存储客户端信息到cookie
     * @param {*}
     * @return {*}
     */
    Collect.prototype.saveCookieClient = function () {
        // 获取是否保存cookie数据
        if (this.getCookie("oemcart_client_broswer_date_time")) {
            return false;
        }
        var d = new Date();
        var gmtHours = d.getTimezoneOffset() / 60;
        var timezone = "Etc/GMT";
        if (gmtHours > 0) {
            timezone = timezone + "+" + gmtHours;
        } else if (gmtHours < 0) {
            timezone = timezone + "" + gmtHours;
        } else {
            timezone = "Etc/UTC";
        }
        var user_agent = navigator.userAgent;
        var pre_url = document.referrer;
        this.setCookie("oemcart_client_user_agent", encodeURIComponent(user_agent), "d1");
        this.setCookie("oemcart_client_pre_url", encodeURIComponent(pre_url), "d1");
        this.setCookie("oemcart_client_timezone", encodeURIComponent(timezone), "d1");
        this.setCookie("oemcart_client_screen_size", window.screen.width + "X" + window.screen.height, "d1");
        this.setCookie("oemcart_client_broswer_language", navigator.language, "d1");
        this.setCookie("oemcart_client_viewport_size", window.innerWidth + "X" + window.innerHeight, "d1");
        this.setCookie("oemcart_client_broswer_date_time", this.formatDate(new Date(), "YYYY-mm-dd HH:MM:SS"), "d1");
    };

    /**
     * @description:  获取mate标签 content
     * @param {*} metaName mate name
     * @return {*} content or ''
     */
    Collect.prototype.getMetaContent = function (metaName) {
        const metas = document.getElementsByTagName("meta");
        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute("name") === metaName) {
                return metas[i].getAttribute("content");
            }
        }
        return "";
    };

    /**
     * @description: 获取oemcart_product title
     * @param {*}
     * @return {*}
     */
    Collect.prototype.getHitTypeLabel = function () {
        var oemcart_current_template = window.oemcart_current_template;
        if (oemcart_current_template == "product_detail" || oemcart_current_template == "product_quick_detail") {
            return oemcart_product["title"];
        }
        if (oemcart_current_template == "collection_detail") {
            return oemcart_collection["title"];
        }
        if (oemcart_current_template == "blog_detail") {
            return oemcart_blog["title"];
        }
        if (oemcart_current_template == "page_detail") {
            return oemcart_page["title"];
        }
        return "";
    };

    Collect.prototype.fireBeaconImg = function (url) {
        var img = document.createElement("img");
        img.setAttribute("style", "width:0px; height:0px; display:none; visibility:hidden;");
        (img.width = 0), (img.height = 0);
        img.setAttribute("alt", "");
        img.setAttribute("src", url);
        document.body.appendChild(img);
    };

    /**
     * @description:
     * @param {*} hit_type
     * @param {*} params 统计参数
     * @return {*}
     */

    Collect.prototype.oemcartCollect = function (hit_type, params, requestType) {
        const self = this;
        //浏览器宽带为空过滤
        if (!window.screen.width || !window.innerWidth) {
            return;
        }

        if (params.ec_data) {
            params.ec_data = encodeURIComponent(JSON.stringify(params.ec_data));
        }

        if (params.hit_type_name) {
            params.hit_type_name = encodeURIComponent(params.hit_type_name);
        }

        if (!params.hit_type) {
            params.hit_type = hit_type;
        }

        const collectParams = {
            ...params,
            pv_id: window.oemcart_pv_id || "",
            store_id: window.oemcart_store_id || "",
            document_location_url: encodeURIComponent(window.location.href),
            document_location_title: document.title,
            meta_keywords: self.getMetaContent("keywords"),
            prev_url: document.referrer,
            vid: window.oemcart_global_unique_id || "",
            rnd: Math.random()
        };

        const paramsStr = Object.keys(collectParams)
            .map((key) => `${key}=${collectParams[key]}`)
            .join("&");
        const collectURL = "/homeapi/collect?" + paramsStr;
        //页面卸载请求
        if (requestType && requestType === "beforeunload") {
            console.log("发送页面卸载请求");
            try {
                navigator.sendBeacon ? navigator.sendBeacon(collectURL) : self.fireBeaconImg(collectURL);
            } catch (u) {}
        }
        try {
            fetch("/homeapi/collect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(collectParams)
            });
        } catch (u) {
            self.fireBeaconImg(collectURL);
        }
        //TODO lzm 确认取消page_view_error 统一使用error
        // //如果没有请求过page_view_error代表页面第一次错误
        // if (!this.firstSendError && hit_type === "error") {
        //     const copyCollectParams = JSON.parse(JSON.stringify(collectParams)); //拷贝数据
        //     copyCollectParams.hit_type = "page_view_error";
        //     try {
        //         fetch("/collect", {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify(copyCollectParams)
        //         });
        //     } catch (u) {
        //         const viewRrrorCollectURL =
        //             "/collect?" +
        //             Object.keys(copyCollectParams)
        //                 .map((key) => `${key}=${copyCollectParams[key]}`)
        //                 .join("&");
        //         this.firstSendError = true;
        //         self.fireBeaconImg(viewRrrorCollectURL);
        //     }
        // } else {
        //     const paramsStr = Object.keys(collectParams)
        //         .map((key) => `${key}=${collectParams[key]}`)
        //         .join("&");
        //     const collectURL = "/collect?" + paramsStr;
        //     //页面卸载请求
        //     if (requestType && requestType === "beforeunload") {
        //         console.log("发送页面卸载请求");
        //         try {
        //             navigator.sendBeacon ? navigator.sendBeacon(collectURL) : self.fireBeaconImg(collectURL);
        //         } catch (u) {}
        //     }
        //     try {
        //         fetch("/collect", {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify(collectParams)
        //         });
        //     } catch (u) {
        //         self.fireBeaconImg(collectURL);
        //     }
        // }
    };

    Collect.prototype.isRecordError = function (type, str) {
        window.localStorage.removeItem(type); //清楚缓存
        const list = JSON.parse(window.sessionStorage.getItem(type) || "[]");
        if (!list.includes(str)) {
            list.push(str);
            try {
                window.sessionStorage.setItem(type, JSON.stringify(list));
            } catch (err) {
                window.sessionStorage.removeItem(type);
            }
            return false;
        } else {
            return true;
        }
    };
    //不能大于60，小于等于0
    // var loadTimes = ["ttfl_time", "ttfb_time", "ttdc_time", "ttsr_time","redirect_time", "dns_lookup_time", "tcp_time", "dom_content_load_time", "dom_proccessing_time", "app_cache_time", "load_event_time"]; //加载时间Key

    /**
     * @description: 过滤时间统计
     * @return {*}
     */
    Collect.prototype.filterTiming = function (times) {
        //返回事件
        if (times["navigation_type_enum"] === "BACK_FORWARD") {
            return false;
        }
        var keys = Object.keys(times);

        //不能小于等于0
        var emptyTimes = [
            "ttfl_time",
            "ttfb_time",
            "ttdc_time",
            "ttsr_time",
            "execution_time",
            "request_time",
            "dom_resource_time",
            "dom_content_load_time",
            "dom_proccessing_time",
            "dom_parse_time"
        ];

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (Number(times[key])) {
                if (emptyTimes.includes(key) && Number(times[key]) <= 0) {
                    return false;
                }
                //大于60秒小于0
                if (Number(times[key]) > 600000 || Number(times[key]) < 0) {
                    return false;
                }
            }
        }

        return true;
    };
    /**
     * @description: 获取页面加载时间
     * @param {*} type 获取类型 load页面加载完成  beforeunload 页面卸载
     * @return {*}
     */
    Collect.prototype.getPerformanceTiming = function (type) {
        const self = this;

        //如果提交过数据不在提交
        if (this.isSubmitPerformance) {
            return false;
        }
        var performance = window.performance || window.webkitPerformance;
        if (!performance) {
            // 当前浏览器不支持
            console.log("你的浏览器不支持 performance 接口");
            return;
        }
        //拷贝数据
        var timing = JSON.parse(JSON.stringify(performance.timing));
        var times = {
            hit_type_name: "timing",
            hit_type_action: window.oemcart_page_ca || "",
            hit_type_category: window.oemcart_current_template || "",
            hit_type_label: this.getHitTypeLabel(),
            hit_type_id: window.oemcart_data_id || ""
        };

        //loadEventEnd 第一次为0
        if (timing.loadEventEnd === 0 && type === "load") {
            setTimeout(() => {
                self.getPerformanceTiming(type);
            }, 200);
            return;
        }

        // TODO 网页加速数据上报pre_cache=1
        if (window.moi && moi.getUrlParam && moi.getUrlParam("prefetch_cache") === "1") {
            times["hit_type_value"] = "pre_cache";
            history.replaceState(null, null, funcUrlDel("prefetch_cache"));
        }

        //设置提交
        this.isSubmitPerformance = true;

        //如果为加载完成就关闭页面生成当前时间
        if (type === "beforeunload") {
            const currentDate = new Date().getTime();
            timing = Object.assign(timing, {
                loadEventEnd: timing.loadEventEnd === 0 ? currentDate : timing.loadEventEnd,
                loadEventStart: timing.loadEventStart === 0 ? currentDate : timing.loadEventStart,
                domComplete: timing.domComplete === 0 ? currentDate : timing.domComplete,
                domInteractive: timing.domInteractive === 0 ? currentDate : timing.domInteractive
            });
        }

        //重定向时间
        times.redirect_time = timing.redirectEnd - timing.redirectStart;

        //DNS 查询时间
        times.dns_lookup_time = timing.domainLookupEnd - timing.domainLookupStart;

        // TCP 建立连接完成握手的时间
        times.tcp_time = timing.connectEnd - timing.connectStart;

        //解析 DOM 树结构的时间
        times.dom_parse_time = timing.domInteractive - timing.domLoading;

        //dom  执行DOMContentLoaded事件执行时间
        times.dom_content_load_time = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;

        //dom解析时间
        times.dom_proccessing_time = timing.domComplete - timing.domLoading;

        //dom资源时间
        times.dom_resource_time = timing.domComplete - timing.domInteractive;

        //cache
        times.app_cache_time = timing.domainLookupStart - timing.fetchStart;

        //响应时间 响应第一个字节到最后一个字节
        times.response_time = timing.responseEnd - timing.responseStart;

        //请求时间
        times.request_time = timing.responseStart - timing.requestStart;

        //执行onload函数事件
        times.load_event_time = timing.loadEventEnd - timing.loadEventStart;

        //php执行时间
        const executionTime = window.execution_time;
        times.execution_time = executionTime ? Number(executionTime).mul(1000) : 0;

        //浏览器输入到接受第一个字符时间
        times.ttfb_time = timing.responseStart - timing.navigationStart;

        //浏览器输入到页面浏览内容时间
        times.ttsr_time = this.ttsr_end_time - timing.navigationStart; //fb白屏时间

        //浏览器输入到用户可操作时间
        times.ttdc_time = timing.loadEventStart - timing.navigationStart;

        //浏览器输入到所有执行完成时间
        times.ttfl_time = timing.loadEventEnd - timing.navigationStart;

        //页面卸载时间
        times.unload_time = type === "beforeunload" ? new Date().getTime() - timing.navigationStart : 0;

        //unload 时间
        times.unload_event_time = timing.unloadEventEnd - timing.unloadEventStart;

        //表示网页的加载来源
        const navigation_type_enum = { 0: "NAVIGATENEXT", 1: "RELOAD", 2: "BACK_FORWARD", 255: "UNDEFINED" };
        times.navigation_type = navigation_type_enum[performance.navigation.type];

        //多少次重定向跳转。
        times.navigation_redirect_count = performance.navigation.redirectCount;

        if (this.filterTiming(times)) {
            // console.log("完成时间", timing);
            // console.log("加载时间", times);
            this.oemcartCollect("performance", times, type);
        }
    };

    const collect = new Collect();
    window.oemcartCollect = collect;

    collect.saveCookieClient();

    window.exec_oemcart_collect = function (params) {
        collect.oemcartCollect.apply(collect, params);
    };

    //是否发送页面数据
    let isSendPerformanceTiming = false;

    //页面加载完成监听
    window.addEventListener("load", function () {
        isSendPerformanceTiming = true;
        collect.getPerformanceTiming("load");
    });

    //页面卸载监听
    window.addEventListener("beforeunload", function () {
        if (!isSendPerformanceTiming) {
            collect.getPerformanceTiming("beforeunload");
        }
    });

    document.addEventListener("DOMContentLoaded", (event) => {
        // 监听jq ajax 请求错误
        $(document).ajaxError(function (event, response, settings, thrownError) {
            // 如果是请求的html 不计算
            if (response.getResponseHeader("content-type") && response.getResponseHeader("content-type").indexOf("text/html") > -1) {
                return false;
            }
            const error_label = JSON.stringify({
                themeType: window.oemcartCurrentThemeType, //模版类型
                responseText: response.responseText, //服务器返回数据
                url: settings.url, // 请求地址
                status: response.status // 请求状态
            });
            if (!collect.isRecordError("error_ajax", response.responseText)) {
                collect.oemcartCollect("error", {
                    hit_type_name: "ajax",
                    hit_type_category: "jqajax",
                    hit_type_label: error_label,
                    hit_type_action: window.oemcart_page_ca || "",
                    hit_type_value: "",
                    hit_type_id: window.oemcartCurrentThemeName
                });
            }
        });

        //promise 被 reject 且没有 reject 处理器的时候  fetch 请求错误会触发
        window.addEventListener("unhandledrejection", (event) => {
            const error_label = JSON.stringify({
                themeType: window.oemcartCurrentThemeType, //模版类型
                stack: event.reason.stack && event.reason.stack.toString(), //错误的详细信息
                message: event.reason.toString()
            });
            if (!collect.isRecordError("error_ajax", event.reason && event.reason.toString())) {
                collect.oemcartCollect("error", {
                    hit_type_name: "ajax",
                    hit_type_category: "promise",
                    hit_type_label: error_label,
                    hit_type_action: window.oemcart_page_ca || "",
                    hit_type_value: "",
                    hit_type_id: window.oemcartCurrentThemeName
                });
            }
        });
    });

    //记录错误的host白名单
    const hostWhite = [location.host];
    const appHostWhite = [window.oemcart_app_view_domain || ""];

    //获取字符串中的host
    function getURLHost(url) {
        const reg = /^http(s)?:\/\/(.*?)\//;
        const execArray = reg.exec(url);
        return execArray ? execArray[2] : "";
    }

    window.addEventListener(
        "error",
        (e) => {
            const target = e.target;
            if (target === window) {
                if (e.error) {
                    var hit_type_value = "";
                    const errorHost = getURLHost(e.filename);
                    var domain = "current_domain"; // js 错误域 current_domain 当前域名 outer_domain  外部域名

                    // 错误超过200字符不记录
                    if (e.message.length >= 200) {
                        return false;
                    }

                    // 屏蔽_AutofillCallbackHandler错误；该错误是在ios系统抛出
                    if (e.message.indexOf("_AutofillCallbackHandler") > -1) {
                        return false;
                    }

                    // 记录内部js错误
                    if (errorHost === location.host) {
                        if (e.filename.indexOf("app-assets") !== -1) {
                            domain = "app_domain";
                            const reg = /^http(s)?:\/\/(.*?)\/app-assets\/(.*?)\/.*?\/index.js/;
                            const execArray = e.filename.match(reg);
                            if (execArray && execArray.length > 3) {
                                hit_type_value = execArray[3];
                            }
                        }
                        const error_label = JSON.stringify({
                            themeType: window.oemcartCurrentThemeType, //模版类型
                            message: e.message,
                            source: e.source,
                            filename: e.filename,
                            lineno: e.lineno,
                            error_stack: e.stack || (e.error && e.error.stack),
                            colno: e.colno,
                            isTrusted: e.isTrusted,
                            timeStamp: e.timeStamp
                        });
                        if (!collect.isRecordError("error_js", e.message)) {
                            collect.oemcartCollect("error", {
                                hit_type_name: "js",
                                hit_type_category: domain,
                                hit_type_label: error_label,
                                hit_type_action: window.oemcart_page_ca || "",
                                hit_type_value: hit_type_value,
                                hit_type_id: window.oemcartCurrentThemeName
                            });
                        }
                    }

                    // let domain = "current_domain"; // js 错误域 current_domain 当前域名 outer_domain  外部域名
                    // if (!errorHost || !hostWhite.includes(errorHost)) {
                    //     domain = "outer_domain";
                    // }

                    // //插件内部错误
                    // if (!errorHost || appHostWhite.includes(errorHost)) {
                    //     domain = "app_domain";
                    //     // 如果存在插件错误截取插件名称
                    //     if (e.filename) {
                    //         const reg = /^http(s)?:\/\/(.*?)\/app\/(.*?)\/index.js/;
                    //         const execArray = e.filename.match(reg);
                    //         if (execArray && execArray.length > 3) {
                    //             hit_type_value = execArray[3];
                    //         }
                    //     }
                    // }

                    // const error_label = encodeURIComponent(
                    //     JSON.stringify({
                    //         themeType: window.oemcartCurrentThemeType, //模版类型
                    //         message: e.message,
                    //         source: e.source,
                    //         filename: e.filename,
                    //         lineno: e.lineno,
                    //         error_stack: e.stack || (e.error && e.error.stack),
                    //         colno: e.colno,
                    //         isTrusted: e.isTrusted,
                    //         timeStamp: e.timeStamp
                    //     })
                    // );
                    // if (!collect.isRecordError("error_js", e.message)) {
                    //     collect.oemcartCollect("error", {
                    //         hit_type_name: "js",
                    //         hit_type_category: domain,
                    //         hit_type_label: error_label,
                    //         hit_type_action: window.oemcart_page_ca || "",
                    //         hit_type_value: hit_type_value,
                    //         hit_type_id: window.oemcartCurrentThemeName
                    //     });
                    // }
                }
            } else {
                if (!collect.isRecordError("error_file", target.src || target.href)) {
                    collect.oemcartCollect("error", {
                        hit_type_name: "file",
                        hit_type_category: target.tagName, // 资源错误请求标签 列：IMG SCRIPT
                        hit_type_label: JSON.stringify({
                            themeType: window.oemcartCurrentThemeType, //模版类型
                            tagname: target.tagName, //错误的tag
                            src: target.src || target.href //资源src
                        }),
                        hit_type_action: window.oemcart_page_ca || "",
                        hit_type_value: "",
                        hit_type_id: window.oemcartCurrentThemeName
                    });
                }
            }
        },
        true //网络错误，在捕获阶段获取，第三个参数为true
    );
})();
