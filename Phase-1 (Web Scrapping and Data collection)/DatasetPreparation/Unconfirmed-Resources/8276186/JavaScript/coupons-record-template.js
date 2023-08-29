

<div class="coupons-record-box" style="--coupons-color:{{storeConfig.pay_color}}">
    <div class="coupons-record-title">{{lang.coupons.available_num | replace: '{number}',coupons.size}}</div>
    <div class="coupons-record-wrap" {% if coupons.size > 6 %}style='height:220px'{% endif %}>
      {% for coupon in coupons %}
      <div class="coupons-record-item {% if showCouponCode == coupon.coupon_code %}coupons-record-item-active{% endif %}" data-code="{{coupon.coupon_code}}">
        <div class="coupons-record-item-body">
          <div class="coupons-record-item-header">
            <div class="coupons-record-item-riado"></div>
            <div class="coupons-record-item-code">{{coupon.coupon_code}}</div>
          </div>
          <div class="coupons-record-item-label">
            {%- if coupon.rule.discount.type == 1 -%}
            <span>{{ coupon.rule.discount.value }}%</span> OFF
            {%- else -%}
            <span>-{{ coupon.rule.discount.value | money }}</span> 
            {%- endif -%}
            {% if coupon.rule.condition.type == 0 %}
						,&nbsp;{{lang.coupons.discount_rule_extra}}
						{% elsif coupon.rule.condition.type == 1  %}
						,&nbsp;{{lang.coupons.discount_rule_count | replace: '{condition}',coupon.rule.condition.value }}
						{% else %}
						{% assign coupon_value = coupon.rule.condition.value | money %}
						,&nbsp;{{lang.coupons.discount_rule_amount | replace: '{condition}',coupon_value }}
						{% endif %}
          </div>
        </div>
      </div>
      {% endfor %}

    </div>
    {% if coupons.size > 6 %}
      <div class="coupons-record-more">
        <div class="coupons-record-more-btn">{{lang.base.show_more}}</div>
      </div>
    {% endif %}
   
</div>


