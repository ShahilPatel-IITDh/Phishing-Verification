
    <form action="/cart" class="cart_form layer-add-cart-success" method="post" novalidate="">
      <div class="cart-header">
        <svg class="icon" height="24" p-id="2883" t="1634190661535" version="1.1" viewbox="0 0 1024 1024" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 512H0A512 512 0 1 0 512 0 512 512 0 0 0 0 512z" fill="#29BB9D" p-id="2884"></path>
          <path d="M779.221333 341.333333l31.445334 31.274667-377.258667 375.466667L213.333333 529.024l55.04-54.741333 180.736 117.290666z" fill="#FFFFFF" p-id="2885"></path>
        </svg>
        <span>{{lang.product.add_cart_succeed}}</span>
        <svg class="cart-header-claer popup-claer" class="icon" height="24" p-id="3072" t="1634191042040" version="1.1" viewbox="0 0 1024 1024" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M571.008 511.936l313.088-311.04a42.688 42.688 0 0 0 0-58.816l-2.496-2.496a40.384 40.384 0 0 0-56.704 0l-313.088 313.6-313.088-311.04a40.384 40.384 0 0 0-56.704 0l-2.496 2.496a42.688 42.688 0 0 0 0 58.816l313.088 308.608-313.088 311.04a42.688 42.688 0 0 0 0 58.816l2.496 2.496a40.384 40.384 0 0 0 56.704 0l313.088-313.6 313.088 311.04a40.384 40.384 0 0 0 56.704 0l2.496-2.496a42.688 42.688 0 0 0 0-58.816z" fill="#1D1F21" p-id="3073"></path>
        </svg>
      </div>
      <div class="cart-product">
        <a href="javascript:;" style="position: relative;">
          <img  data-src="{{option.src}}"  src="/theme/default/assets/empty_loading.png"  class="cart-product-img">
          {% if isProperty %}
            <svg class="icon" height="16" p-id="4311" style="position: absolute;bottom: 0;right: 0;background-color: #e8e8e8;padding: 3px;border-radius: 50%;" version="1.1" viewbox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M789.49999971 512l138.75000029-138.75000029c37.50000029-37.50000029 37.50000029-97.49999971 0-131.24999971L782 95.75c-33.75-33.75-97.49999971-33.75-131.24999971 0L512 234.50000029 373.24999971 95.75C339.49999971 62 275.75 62 242 95.75L95.75 242c-37.50000029 37.50000029-37.50000029 97.49999971 0 131.24999971L234.50000029 512 174.5 568.25c-11.25 11.25-18.74999971 22.5-22.5 37.50000029L69.49999971 834.49999971c-11.25 29.99999971-3.75000029 60.00000029 11.25 82.50000029 18.74999971 22.5 45 37.50000029 75.00000058 37.50000029 11.25 0 18.74999971 0 29.99999971-3.75000029l228.75000029-82.50000029c15.00000029-3.75000029 26.25000029-11.25 37.49999942-22.5l56.25-56.25 138.75000029 138.75000029c18.74999971 18.74999971 41.24999971 26.25000029 67.5 26.25000029s48.75000029-11.25 67.5-26.25000029l146.25-146.25c37.50000029-37.50000029 37.50000029-97.49999971 0-131.24999971L789.49999971 512z m-71.24999942-371.25c3.75000029 0 11.25 3.75000029 14.99999942 3.75000029l146.25 146.25c7.49999971 7.49999971 7.49999971 18.74999971 0 26.24999942l-52.49999971 52.50000058-172.50000029-172.50000029 52.50000058-52.49999971s3.75000029-3.75000029 11.25-3.75000029zM238.24999971 410.75l67.5-67.5c11.25-11.25 11.25-29.99999971 0-41.24999971s-29.99999971-11.25-41.24999971 0L197 369.50000029 148.24999971 320.75c-7.49999971-7.49999971-7.49999971-18.74999971 0-26.25000029l146.25-146.25c3.75000029-3.75000029 7.49999971-3.75000029 15.00000029-3.74999942s11.25 3.75000029 15.00000029 3.74999942L459.50000029 287 287 459.50000029 238.24999971 410.75z m165.00000058 386.25000029s-3.75000029 3.75000029-7.50000058 3.74999942l-228.74999942 82.50000029c-7.49999971 3.75000029-15.00000029 0-18.75000058-7.49999971-3.75000029-3.75000029-3.75000029-7.49999971-3.74999942-15.00000029l82.49999942-228.75000029c0-3.75000029 3.75000029-3.75000029 3.75000029-7.49999971l82.50000029-82.50000029 225-225 74.99999971-74.99999971 172.50000029 172.50000029-75.00000058 74.99999971-225 225-82.49999942 82.50000029z m472.5-67.5l-146.25 146.25c-7.49999971 7.49999971-18.74999971 7.49999971-26.25000029 0l-48.75000029-48.75000029 67.5-67.5c11.25-11.25 11.25-29.99999971 0-41.24999971s-29.99999971-11.25-41.24999971 0l-67.5 67.5-48.75000029-48.75000029 172.50000029-172.50000029 138.75000029 138.75000029c7.49999971 7.49999971 7.49999971 18.74999971 0 26.25000029z" p-id="4312"></path>
            </svg>
          {% endif %}
        </a>
        <div class="cart-product-info">
          <div class="cart-product-name">
            <span class="line-clamp2" style="text-align: left;">{{option.productTitle}}</span>
          </div>
          {% if storeConfig.sku_spu_set == "4" %}
          {% elsif storeConfig.sku_spu_set == "2" %}
            <div class="cart-product-skuName" >{{lang.account.orders_detail.spu}}:&nbsp;{{option.spu | default:"-" }}</div>
          {% elsif storeConfig.sku_spu_set == "3" %}
            <div class="cart-product-skuName" >{{lang.account.orders_detail.sku}}:&nbsp;{{option.sku | default:"-" }}</div>
          {% elsif storeConfig.sku_spu_set == "1" %}
            <div class="cart-product-skuName" >{{lang.account.orders_detail.spu}}:&nbsp;{{option.spu | default:"-" }},&nbsp;{{lang.account.orders_detail.sku}}:&nbsp;{{option.sku | default:"-" }}</div>
          {% else %}
          {% endif %}
  
          {% if option.sku_value %}
            <div class="cart-product-skuName">{{option.sku_value | replace : "<br/>", ";" }}</div>
          {% endif %}
        </div>
      </div>
      <div class="cart-price">
        <span class="cart-content-label">{{lang.product.subtotal}}:</span>
        <span class="cart-content-value">{{subtotalPrice}}</span>
      </div>
      <div class="cart-operate">
        <a class="cart-button main_btn cart-buyNow" href="javascript:;" id="submit">
          <span>{{ lang.cart.list.checkout }}</span>
          <svg class="icon" fill="#fff" height="24" p-id="2600" style="margin-left:6px" t="1642570805735" version="1.1" viewbox="0 0 1024 1024" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M938.666667 511.957333l-320 256 0-213.333333L0 554.624l0-85.333333L618.666667 469.290667l0-213.333334z" p-id="2601"></path>
          </svg>
        </a>
        <a class="cart-button cart-button-plan" href="/cart">{{lang.product.view_cart}}</a>
      </div>
    </form>
  