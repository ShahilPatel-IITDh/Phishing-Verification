
      {% for sku in skus %}
      {% assign keyIndex = forloop.index %}
      <div class="moi-product-option"  data-sku-name="{{ sku.name }}">
      <div class="cell-item moi-product-sku-label" data-type="key">
      <span class="product-sku-name">{{ sku.name }}
        {%- if sku.isImg -%}
            {%- if productSkuStyle == "image" or productSkuStyle == "color" -%}
            :<span style="font-weight: bold;color:#333;">{{sku.selected_value_label}}</span>
            {%- endif -%}
        {%- endif -%}
     
      </span>
      </div>
      <div class="cell-item moi-product-sku-value" data-type="values">
      <div class="product-sku-values">

        {% for val in sku.value %}
        {%- capture className -%}
        {%- if val.available == 0 -%}product-sku-values-item-disable{%- endif -%}
        {%- if sku.selected_value == val.value -%} product-sku-values-item-active{%- endif -%}
        {%- endcapture -%}
        
        {%- capture imageClassName -%}
        {%- if val.image != "" and sku.isImg -%}
        product-sku-values-item-image
        {%- endif -%}
        {%- endcapture -%}

        {%- capture imageSizeClassName -%}
        {%- if val.image != "" and sku.isImg -%}
        {%- if productSkuStyle == "image" or productSkuStyle == "image_text" -%}
        {{productSkuSize}}
        {%- endif -%}
        {%- endif -%}
        {%- endcapture -%}


        {%- capture colorClassName -%}
        {%- if productSkuStyle == "color" and sku.isImg -%}product-sku-value-color{%- endif -%}
        {%- endcapture -%}


        <div class="product-sku-values-item {{imageSizeClassName}} {{imageClassName}} {{className}}  {{colorClassName}}" data-index="{{ keyIndex }}" data-idx="{{ forloop.index }}" data-value='{{ val | json | escape }}'>
         {%- if productSkuStyle == "color" and sku.isImg  -%}
            <div class="product-sku-value-color-item" style='background-color:{{val.colorValue}}'></div>
         {%- elsif  val.image != "" and sku.isImg -%}
          <img data-src="{{val.image.src}}"  src="/theme/default/assets/empty_loading.png"  />
          <!-- <img data-crop-type="height" src="{{val.image.src}}?x-oss-process=image/resize,m_lfit,h_135"  /> -->
            {%- if productSkuStyle == "image_text" -%}
              <span>{{ val.name }}</span>
            {%- endif -%}
          {%- else -%}
            {{ val.name }}
          {%- endif -%}
        </div>
        {% endfor %}

        
          
      </div>
      </div>
      </div>
      {% endfor %}
