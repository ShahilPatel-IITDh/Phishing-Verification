
{% for comment in comments %}
{% assign commentIndex = forloop.index %}
<div class="comment_warp">
        <div class="comment_warp-header mo-flex mo-j-space-between">
          <div class="mo-flex">
            <img class="comment_warp-header-nation" style="height: auto;" src="{{comment.country_id | current_countrys }}?x-oss-process=image/resize,m_lfit,w_200" />
            <span>{{comment.customer_name}} <span style="color:#888888;margin-left:4px">{% if storeConfig.hide_time == '0' %}{% if comment.created_at !=0 %} {{comment.created_at_str}} {% endif %}{% endif %}</span></span>
          </div>
        </div>
        <div class="comment_warp-score">
          
          {% for index in (1..5) %}
          {%- capture fill_color -%}
            {%- if index <= comment.star -%}
              {{theme_config.global.product_score_selected_color | default:'#F8AD6B'}}
              {%- else -%}
              {{theme_config.global.product_score_uncheck_color | default:'#bbbbbb'}} 
            {%- endif -%}
          {%- endcapture -%}
          <svg t="1632626527998" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7121" width="16" height="16">
            <path d="M512 0l122.88 352.96 389.12 2.752-300.8 238.08 118.272 380.032L512 747.392l-329.6 226.496L293.312 588.8 0.32 355.776l389.12-2.752z" fill="{{fill_color}}" p-id="7122"></path>
          </svg>
          {% endfor %}

        </div>
        <div class="comment_warp-content">
          <p class="comment_warp-content-lable">{{comment.content}}</p>
          <!-- <div class="comment_warp-content-review">{{lang.comments.show_fill_review}}</div> -->
          <div class="comment_warp-images">
            {% if  comment.images.src %}
            {% for image in comment.images.src %}
            {% assign keyIndex = forloop.index %}
            <img src="{{ 'empty_loading.png' | public_asset_abs_url }}" data-src="{{image}}" data-parent="{{comment.currentIndex}}"  data-index="{{keyIndex}}" />
            {% endfor %}
            {% endif %}
          </div>

          {% if comment.reply_content != "" %}
          <div class="comment-reply-warp">
            <div class="comment-reply-warp-title">
              <span class="comment-reply-warp-name">{{lang.comments.reply}}:</span>
              {% if comment.replied_at != 0 %}
              <span class="comment-reply-warp-date">{{comment.replied_at_str}}</span>
              {% endif %}
            </div>
            <div class="comment-reply-warp-content">{{comment.reply_content}}</div>
          </div>
          {% endif %}
        </div>
        {% if is_product %}
        <div class="comment_warp-product">
          <div class="comment_warp-content-item mo-flex">
            <a class="comment_warp-content-item-images" href="/products/{{comment.handle}}?data_from={{data_from}}">
              <img src="{{ 'empty_loading.png' | public_asset_abs_url }}" alt="{{comment.alt | default:comment.title }}" data-src="{{comment.src}}" />
            </a>
            <div class="comment_warp-content-item-cell">
              <a class="comment_warp-content-item-cell-text" href="/products/{{comment.handle}}?data_from={{data_from}}">{{comment.title}}</a>
              <div class="comment_warp-content-item-cell-text">{{comment.price}}</div>
              <a href="{{comment.url}}" class="comment_warp-content-item-cell-reviews">{{lang.comments_detail.reviews}} {% if comment.count > 1 %}({{comment.count}}){% endif %}</a>
            </div>
          </div>

        </div>
        {% endif %}
</div>
{% endfor %}
