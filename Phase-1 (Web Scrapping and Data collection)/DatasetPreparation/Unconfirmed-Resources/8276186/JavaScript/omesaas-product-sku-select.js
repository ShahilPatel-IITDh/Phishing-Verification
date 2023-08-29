
      {% for sku in skus %}
      {% assign keyIndex = forloop.index %}
      <div class="moi-product-option"  data-sku-name="{{ sku.name }}">

      <div class="sku-item-col">
      <div class="cell-item moi-product-sku-label" data-type="key">
      <span class="product-sku-name">{{ sku.name }}</span>
      </div>
      <div class="cell-item moi-product-sku-value" data-type="values">
      <div class="product-sku-values">
        <label class="product-sku-select" >
        <select class="product-sku-unselect">
            {% for val in sku.value %}

            {%- capture disabled -%}
            {% if val.available == 0 %}disabled{% endif %}
            {% if sku.selected_value == val.value %} selected{% endif %}
            {%- endcapture -%}

            <option value='{{val.value}}' {{disabled}}  data-index="{{ keyIndex }}" data-value='{{ val | json | escape }}'>{{ val.name }}</option>
            {% endfor %}
        </select>
        <div class="mo-edge"></div>
        </label>
      </div>
      </div>
      </div>
      </div>
      {% endfor %}
