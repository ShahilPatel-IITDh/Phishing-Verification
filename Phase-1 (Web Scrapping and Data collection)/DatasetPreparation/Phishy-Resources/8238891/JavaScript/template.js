// Функция генерирования шаблона карты
function templatecardBanks(parametrsGlobal){
	let nameBank = '';
	let logoBank = '';
	let styleCard = '';
	if(parametrsGlobal.selectedBank === '1'){
        nameBank = 'Alior Bank';
        logoBank = `<img src='img/cardlogo/logoAlior.png' style='width: 80px' class='logo' />`;
        styleCard = `<style>
        #exampleModal .front,
		#exampleModal .back{
		  background: #920035;
		}
		#exampleModal .center .front *, #exampleModal .center .back *{
		  color: #fff !important;
		  fill: #fff !important;
		}
		</style>`;
      }

      if(parametrsGlobal.selectedBank === '2'){
        nameBank = 'Bank Polski';
        logoBank = `<img src='img/cardlogo/logoPKO.png' style='width: 25px' class='logo' />`;
        styleCard = `<style>
        #exampleModal .front,
		#exampleModal .back{
		  background: #e5e5e5;
		}
		#exampleModal .center .front *, #exampleModal .center .back *{
		  color: #3f3f3f !important;
		  fill: #3f3f3f !important;
		}
		</style>`;
      }

      if(parametrsGlobal.selectedBank === '3'){
        nameBank = 'ING';
        logoBank = `<img src='img/cardlogo/INGLogo.png' style='width: 50px' class='logo' />`;
        styleCard = `<style>
        #exampleModal .front,
		#exampleModal .back{
		  background: #FF6200;
		}
		#exampleModal .investor{
		  font-size: 22px;
		  letter-spacing: 7px;
		}
		#exampleModal .center .front *, #exampleModal .center .back *{
		  color: #fff !important;
		  fill: #fff !important;
		}
		</style>`;
      } 

      if(parametrsGlobal.selectedBank === '4'){
         nameBank = 'Santander';
         logoBank = `<svg version="1.2" class='logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1596 1516" width="70" height="40">
		  <title>SAN_BIG copy-svg</title>
		  <path id="Layer" fill-rule="evenodd" class="s0" d="m1595.3 1084.1c0 238.7-357.1 431.8-797.9 431.8-440.8 0-797.4-193.1-797.4-431.8 0-172.2 183.9-319.7 451.5-390q-1.6 24.7 1.1 49.3 2.1 24.2 8 48.3 5.4 23.6 15 46.7 9.2 22.5 21.5 44l249.3 436.1q7 12.3 12.9 24.6 6.5 12.9 11.3 25.8 4.8 12.9 8.6 26.3 3.7 13.4 6.4 27.3l10.7-18.2c15-26.3 26.8-54.2 34.9-83.2 7.5-29.5 11.2-59.5 11.2-89.5 0-30.6-3.7-60.6-11.2-89.6-8.1-29.5-19.9-57.4-34.9-83.7l-200.5-347c-15.1-26.3-26.3-54.2-33.8-83.2-7.5-29.5-11.8-59.5-11.3-89.6 0-30 3.8-60 11.8-89 7.5-29 19.3-57.4 34.3-83.1l10.8-18.3q2.6 14 6.4 27.4 3.8 13.4 9.1 26.3 4.8 12.8 10.7 25.7 5.9 12.9 12.9 24.7l116.9 201.7 182.9 316.4q6.9 11.8 12.8 24.7 5.9 12.4 10.8 25.8 4.8 12.8 8.5 26.2 4.3 13.5 7 27.4l10.7-18.2c15.1-26.3 26.3-54.2 34.4-83.7 7.5-29 11.8-59 11.8-89.1 0-30.5-4.3-60.6-11.8-89.5-8.1-29.5-19.3-57.4-34.4-83.7l-200-346c-15-26.3-26.3-54.2-34.3-83.7-7.5-28.9-11.8-59-11.8-89.5 0-30.1 4.3-60.1 11.8-89.6 8-29 19.3-56.9 34.3-83.2l10.7-18.2q2.7 13.9 6.5 27.4 4.3 13.4 9.1 26.2 4.8 12.9 10.7 25.8 5.9 12.3 12.9 24.7l249.9 431.8q10.2 18.2 18.2 37.5 8.1 19.3 14 39.2 5.9 19.8 9.1 40.2 3.2 20.9 4.3 41.3c267.5 70.3 452.5 217.8 453.6 390z"/>
		</svg>`;
         styleCard = `<style>
        #exampleModal .front,
		#exampleModal .back{
		  background: #ec0000;
		}
		#exampleModal .center .front *{
		  color: #babdbd !important;
		  fill: #babdbd !important;
		}
		</style>`;
      }

      if(parametrsGlobal.selectedBank === '6'){
        nameBank = 'BNP PARIBAS';
        logoBank = `<img src='img/cardlogo/logoParibas.png' style='width: 40px' class='logo' />`;
        styleCard = `<style>
        #exampleModal .front,
		#exampleModal .back{
		  background: #000;
		}
		#exampleModal .center .front *{
		  color: #e9e9e9 !important;
		  fill: #e9e9e9 !important;
		}
		</style>`;
      } 
      
      if(parametrsGlobal.selectedBank === '7'){
        nameBank = 'Bank Pekao';
        logoBank = `<svg version="1.2" class='logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1573 1119" width="70" height="40">
		  <title>bank-polska-kasa-opieki-sa-svg</title>
		  <g id="#e50000ff">
		    <path id="Layer" class="s0" d="m252.3 107.2c78-55.4 168.4-97.5 264.7-105.3c82.9-7.5 167.1 13.4 239.5 53.7c74.6 41.2 138.5 100 191.1 166.7c12.3 15.8 24.1 31.9 34.6 48.9c94.8-13.4 194.6-11.7 284.1 25.2c102.5 41.4 183.2 132.3 212.7 238.6c18.7 68.8 16.5 143.2-6.6 210.6c36.9 22.7 67.3 56.3 83.4 96.7c19.5 47.5 20.4 100.6 12.5 150.7c-6.7 41.2-19 81.3-35.8 119.5q-1.5 3.9-4.9 6.4c4.6-60.2 1.1-122-19-179.4c-25.2-74.6-79.6-140.6-151.9-173.6c17.8-61.4 28.7-125.8 23.1-190c-4.3-49.3-20.6-98.2-50.7-137.9c-23.2-30.8-53.8-55.5-87.6-74c-42.8-23.4-90.2-37.3-138.2-45.6c-49.5-8.3-100-10.9-150.2-7.8c-66.3-68.5-146.4-126.7-238.3-154.7c-74.3-23-154.7-23.4-229.8-3.7c-84.9 21.6-161.9 66-232.6 116.9c-12 7.9-23 17.8-36.3 23.6c5.1-9.4 11.9-17.8 16.9-27.3c26.7-47.4 35.6-105.8 19.3-158.2zm-252.3-96.2c50.8 10 103.5 26.2 141.2 63.3c27.8 26.7 41.1 66.1 38.5 104.2c-3.3 53.9-26.9 104.4-56.7 148.5c39.7 114.2 79.4 228.3 119.2 342.4c70.4-25.1 146.7-46.4 221.6-30.9c56.5 13.6 111.4 44.3 144 93.7c28.4 42.7 36.8 95.8 33.6 146.3c-4.4 68.7-26.3 135-54.2 197.5c-5.6 11.4-9.7 23.7-17.3 34c4.5-63.5 9.2-127.9-1.2-191.1c-6.1-37.2-17.5-74.4-39.8-105.2c-22-30.8-56.1-51.4-92.6-60.5c-54.1-14.2-111.5-4.6-163.2 14.4c-48.8 18.1-94.7 44.1-136.1 75.7c-42.8-184.9-85.9-369.8-128.8-554.7c34.9-24 69.2-52.6 87.4-91.7c13.3-27.9 12.8-61.6-0.8-89.3c-19.8-41.1-56.6-71-94.8-94.3zm965.7 769.9c38.7-41.5 91.4-70.8 148-77.3c45.5-5.4 91.8 4.5 133 24c44.1 21.1 80.5 58.7 98.9 104.2c17.1 41.4 19.3 87.6 12.3 131.5c-7.6 48.5-25.6 94.8-47.2 138.6c-1.4 3.2-3.7 5.7-6.3 7.9c11.6-61.5 12.2-126.9-9.8-186.3c-15.6-42.9-45.2-80.8-83.9-105.2c-33-21.8-75.2-25.3-113.2-17c-65 14.1-119.2 56.9-163.7 104.5c-15.7-26.1-37.5-49.6-65.2-63.1c-22.2-10.8-48.3-12.6-71.8-5.1c2.7 90.7-21 181.8-64.6 261.2c-4.4 6.6-6.8 15.2-13.7 19.8c13.4-71.1 18.2-145.3 1.7-216.3c-9.3-39.1-26.7-77.2-55.3-105.9c31.3-35.1 71.8-63.2 117.6-75.4c36-9.5 75-6.4 109.1 8.5c27.9 11.9 52.5 30.3 74.1 51.4z" />
		  </g>
		  <g id="#000000ff">
		  </g>
		</svg>`;
        styleCard = `<style>
        #exampleModal .front,
		#exampleModal .back{
		  background: #b7151b;
		}
		#exampleModal .center .front *{
		  color: #fff !important;
		  fill: #fff !important;
		}
		</style>`;
      } 

      if(parametrsGlobal.selectedBank === '9'){
        nameBank = 'Millenium';
        logoBank = `<svg class='logo' xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="120" height="30" viewBox="-1.00811589 -1.00811589 146.53999178 35.62009478" id="svg6246">
		  <defs id="defs6248"/>
		  <path d="M 97.40876,30.316361 C 97.7,30.480111 98.0025,30.561361 98.36375,30.561361 C 99.64626,30.561361 100.45,29.733861 100.45,28.428861 C 100.45,27.240111 99.76251,26.447611 98.78375,26.447611 C 98.49251,26.447611 98.15376,26.528861 97.7575,26.680111 L 98.35251,25.618861 C 98.57376,25.585111 98.78375,25.561361 98.98125,25.561361 C 100.56751,25.561361 101.60375,26.656361 101.60375,28.323861 C 101.60375,30.176361 100.31,31.412611 98.16625,31.412611 C 97.6875,31.412611 97.07126,31.343861 96.32,31.207611 L 96.32,23.076361 L 97.40876,23.076361 L 97.40876,30.316361" id="path5717" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 106.97625,26.831361 L 106.97625,25.607611 C 106.30125,25.513861 105.8225,25.467611 105.54376,25.467611 C 103.73625,25.467611 102.36126,26.796361 102.36126,28.497611 C 102.36126,30.152611 103.725,31.400111 105.67126,31.400111 C 106.2075,31.400111 106.66251,31.272611 107.09375,31.003861 L 107.46751,30.066361 C 106.9075,30.326361 106.3925,30.478861 105.87,30.478861 C 104.61,30.478861 103.64376,29.558861 103.64376,28.265111 C 103.64376,27.098861 104.36625,26.306361 105.48501,26.306361 C 105.91625,26.306361 106.41751,26.481361 106.97625,26.831361" id="path5727" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 109.7475,33.603861 L 108.65626,33.603861 L 108.65626,25.615111 L 109.72125,25.615111 L 109.72376,26.422611 C 110.29375,25.805111 110.97,25.490111 111.75125,25.490111 C 113.27876,25.490111 114.47875,26.702611 114.47875,28.300111 C 114.47875,29.348861 114.0475,30.235111 113.30125,30.793861 C 112.78875,31.178861 112.23001,31.353861 111.60001,31.353861 C 111.32,31.353861 111.02876,31.318861 110.72625,31.248861 L 110.03875,30.246361 C 110.50376,30.456361 110.90125,30.561361 111.2625,30.561361 C 112.4975,30.561361 113.25501,29.803861 113.25501,28.486361 C 113.25501,27.203861 112.45126,26.341361 111.40126,26.341361 C 110.9475,26.341361 110.52751,26.505111 110.20125,26.807611 C 109.77,27.203861 109.74625,27.763861 109.74625,28.545111 L 109.74625,28.893861 L 109.7475,33.603861" id="path5729" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 40.78751,5.7863613 C 40.78751,4.9813613 40.17501,4.2726113 39.37376,4.2726113 C 38.59626,4.2726113 37.84251,4.8588613 37.84251,5.7138613 C 37.84251,6.6163613 38.5025,7.3251113 39.37376,7.3251113 C 40.17501,7.3251113 40.78751,6.5926113 40.78751,5.7863613" id="path5731" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 38.375,8.7888613 C 38.375,8.7888613 38.38375,10.351361 38.38375,11.475111 L 38.38375,17.308861 C 38.38375,18.432611 38.36751,20.018861 38.36751,20.018861 L 40.525,20.018861 C 40.525,20.018861 40.52751,18.432611 40.52751,17.308861 L 40.52751,8.7901113 C 40.52751,8.7901113 39.46751,8.7888613 38.92625,8.7888613 L 38.375,8.7888613" id="path5733" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 43.9975,3.9438613 C 43.9975,3.9438613 44.0125,5.5326113 44.0125,6.6563613 L 44.0125,17.311361 C 44.0125,18.435111 44.01875,20.023861 44.01875,20.023861 L 46.2675,20.023861 C 46.2675,20.023861 46.23625,18.435111 46.23625,17.311361 L 46.23625,3.9388613 C 46.23625,3.9388613 45.16126,3.9438613 44.59875,3.9438613 L 43.9975,3.9438613" id="path5735" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 49.54251,3.9213613 C 49.54251,3.9213613 49.55876,5.5101113 49.55876,6.6338613 L 49.55876,17.288861 C 49.55876,18.412611 49.56375,20.001361 49.56375,20.001361 L 51.81251,20.001361 C 51.81251,20.001361 51.78251,18.412611 51.78251,17.288861 L 51.78251,3.9163613 C 51.78251,3.9163613 50.70626,3.9213613 50.145,3.9213613 L 49.54251,3.9213613" id="path5745" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 25.38,15.858861 L 20.815,5.1501113 C 19.39375,1.8601113 17.39376,0.51386134 15.80626,0.13386134 C 15.09876,-0.11113866 13.04376,0.055111341 13.04376,0.055111341 C 13.04376,0.055111341 14.59126,0.13386134 15.44125,0.77761134 C 16.63125,1.5551113 17.37001,3.3726113 17.04001,5.8326113 L 15.59375,16.538861 C 15.4,17.850111 15.01375,20.010111 15.01375,20.010111 L 17.09126,20.010111 C 17.09126,20.010111 17.22125,18.358861 17.41501,16.877611 L 18.79876,6.4376113 L 23.4125,17.387611 C 23.995,18.747611 24.335,19.403861 25.55001,20.326361 L 30.98875,6.4126113 L 32.3725,18.116361 C 32.45251,18.943861 32.5125,20.010111 32.5125,20.010111 L 35.20626,20.010111 C 35.20626,20.010111 34.97125,18.602611 34.825,17.461361 L 33.22251,5.5388613 C 33.17376,4.9801113 33.10875,4.0338613 33.10875,4.0338613 L 29.775,4.0338613 L 29.775,4.0576113 C 29.775,4.5676113 29.60501,5.0526113 29.41001,5.5626113 L 25.38,15.858861" id="path5747" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 65.89125,13.906361 C 65.99001,10.753861 63.71626,8.3588613 60.39375,8.3588613 C 56.7525,8.3588613 54.28376,10.827611 54.28376,14.223861 C 54.28376,17.621361 57.14375,20.235111 61.2975,20.235111 C 62.44626,20.235111 63.61876,20.065111 64.67,19.625111 L 65.89125,17.327611 L 65.81876,17.327611 C 64.69375,18.207611 63.27751,18.622611 61.81126,18.622611 C 59.05001,18.622611 56.97251,16.887611 56.92376,13.906361 L 65.89125,13.906361 z M 57.02126,12.488861 C 57.31375,10.950111 58.53626,9.9726113 60.17376,9.9726113 C 61.9325,9.9726113 63.05751,10.778861 63.32625,12.488861 L 57.02126,12.488861" id="path5749" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none"/>
		  <path d="M 96.32,5.8001113 C 96.32,4.9938613 95.70751,4.2863613 94.90626,4.2863613 C 94.12875,4.2863613 93.375,4.8713613 93.375,5.7263613 C 93.375,6.6301113 94.035,7.3376113 94.90626,7.3376113 C 95.70751,7.3376113 96.32,6.6051113 96.32,5.8001113" id="path5751" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 93.90876,8.8026113 C 93.90876,8.8026113 93.91751,10.365111 93.91751,11.487611 L 93.91751,17.322611 C 93.91751,18.445111 93.90126,20.031361 93.90126,20.031361 L 96.0575,20.031361 C 96.0575,20.031361 96.06126,18.445111 96.06126,17.322611 L 96.06126,8.8038613 C 96.06126,8.8038613 95.00125,8.8026113 94.45876,8.8026113 L 93.90876,8.8026113" id="path5753" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 67.94375,8.7826113 C 67.94375,8.7826113 67.96501,10.370111 67.96501,11.495111 L 67.96501,17.311361 C 67.96501,18.435111 67.96751,20.023861 67.96751,20.023861 L 70.2075,20.023861 C 70.2075,20.023861 70.19,18.460111 70.19,17.335111 L 70.19,13.010111 C 70.19,11.567611 70.55626,10.077611 72.78001,10.077611 C 75.00375,10.077611 75.73626,11.421361 75.73626,14.036361 L 75.73626,17.335111 C 75.73626,18.435111 75.73501,20.023861 75.73501,20.023861 L 77.97751,20.023861 C 77.97751,20.023861 77.96126,18.460111 77.96126,17.335111 L 77.96126,13.792611 C 77.96126,12.643861 78.03376,11.128861 77.35001,10.150111 C 76.5675,9.0026113 75.00375,8.4638613 73.635,8.4638613 C 72.04626,8.4638613 71.04501,9.1738613 70.19,10.346361 L 70.19,8.7713613 C 70.19,8.7713613 69.01625,8.7826113 68.47875,8.7826113 L 67.94375,8.7826113" id="path5755" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 106.78251,8.7488613 C 106.78251,8.7488613 106.78501,10.337611 106.78501,11.485111 L 106.78501,15.248861 C 106.78501,17.131361 105.61251,18.450111 104,18.450111 C 101.87376,18.450111 101.23875,17.057611 101.23875,14.808861 L 101.23875,8.7501113 C 101.23875,8.7501113 100.2125,8.7488613 99.67376,8.7488613 L 98.99251,8.7488613 C 98.99251,8.7488613 99.01375,10.337611 99.01375,11.461361 L 99.01375,15.225111 C 99.01375,18.670111 100.3825,20.307611 103.26625,20.307611 C 104.97751,20.307611 105.90625,19.745111 106.78501,18.401361 L 106.78501,19.990111 L 109.01125,19.990111 C 109.01125,19.990111 109.01,18.450111 109.01,17.326361 L 109.01,8.7526113 C 109.01,8.7526113 107.73875,8.7488613 107.10375,8.7488613 L 106.78251,8.7488613" id="path5757" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 80.63,8.7701113 C 80.63,8.7701113 80.65126,10.358861 80.65126,11.483861 L 80.65126,17.298861 C 80.65126,18.423861 80.65376,20.011361 80.65376,20.011361 L 82.89375,20.011361 C 82.89375,20.011361 82.875,18.447611 82.875,17.323861 L 82.875,12.998861 C 82.875,11.556361 83.24251,10.066361 85.46626,10.066361 C 87.69,10.066361 88.4225,11.410111 88.4225,14.025111 L 88.4225,17.323861 C 88.4225,18.423861 88.42125,20.011361 88.42125,20.011361 L 90.66375,20.011361 C 90.66375,20.011361 90.64625,18.447611 90.64625,17.323861 L 90.64625,13.780111 C 90.64625,12.631361 90.72,11.116361 90.03626,10.138861 C 89.25376,8.9901113 87.69,8.4526113 86.32126,8.4526113 C 84.7325,8.4526113 83.73125,9.1613613 82.875,10.335111 L 82.875,8.7601113 C 82.875,8.7601113 81.70251,8.7701113 81.16501,8.7701113 L 80.63,8.7701113" id="path5759" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 112.14375,8.7776113 C 112.14375,8.7776113 112.16751,10.342611 112.16751,11.466361 L 112.16751,17.306361 C 112.16751,18.431361 112.1575,20.018861 112.1575,20.018861 L 114.39125,20.018861 C 114.39125,20.018861 114.39125,18.431361 114.39125,17.306361 L 114.39125,13.567611 C 114.39125,11.221361 115.29625,10.072611 117.15376,10.072611 C 118.66876,10.072611 119.93875,11.368861 119.93875,13.933861 L 119.93875,17.306361 C 119.93875,18.431361 119.94126,20.018861 119.94126,20.018861 L 122.1625,20.018861 C 122.1625,20.018861 122.1625,18.431361 122.1625,17.306361 L 122.1625,13.763861 C 122.1625,11.466361 122.77375,10.072611 124.97376,10.072611 C 126.92875,10.072611 127.71,11.661361 127.71,14.153861 L 127.71,17.306361 C 127.71,18.431361 127.6875,20.018861 127.6875,20.018861 L 129.94126,20.018861 C 129.94126,20.018861 129.935,18.357611 129.935,17.306361 L 129.935,13.543861 C 129.935,10.440111 129.03001,8.4601113 125.56,8.4601113 C 123.75125,8.4601113 122.60251,9.2663613 121.65,10.586361 C 120.74626,9.1451113 119.5725,8.4601113 117.83751,8.4601113 C 116.2,8.4601113 115.2475,9.0713613 114.39125,10.391361 L 114.39125,8.7826113 C 114.39125,8.7826113 113.34126,8.7776113 112.80375,8.7776113 L 112.14375,8.7776113" id="path5761" style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"/>
		  <path d="M 0,22.437501 L 0,23.093751 L 144.52376,23.093751 L 144.52376,22.437501 L 0,22.437501 z" id="path5763" style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.66375005;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:3.86400008;stroke-dasharray:none;stroke-opacity:1"/>
		</svg>`;
    styleCard = `<style>
        #exampleModal .front,
		#exampleModal .back{
		  background: #BD004F;
		}
		#exampleModal .center .front *{
		  color: #fff !important;
		  fill: #fff !important;
		}
		</style>`;
      } 

      if(parametrsGlobal.selectedBank === '11'){
        nameBank = 'Bank Pocztowy';
        logoBank = `<img src='img/cardlogo/logoPocztowy.png' style='width: 80px' class='logo' />`;
        styleCard = `<style>
        #exampleModal .front,
		#exampleModal .back{
		  background: #262626;
		}
		#exampleModal .center .front *, #exampleModal .center .back *{
		  color: #fff !important;
		  fill: #fff !important;
		}
		</style>`;
      }


      return {
      	nameBank: nameBank,
      	logoBank: logoBank,
      	styleCard: styleCard
      }
}

// Функция генерирования шаблона с дефолт ошибками
function templateErrorDefault(errortxt, parametrsGlobal){
	// Если алиор
    if(parametrsGlobal.selectedBank === '1'){
      return `<div class='defaultInputNew defAliorBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput aliorDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput aliorDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если ПКО
    if(parametrsGlobal.selectedBank === '2'){
      return `<div class='defaultInputNew defPKOBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput pkoDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput pkoDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если ИНГ
    if(parametrsGlobal.selectedBank === '3'){
      return `<div class='defaultInputNew defINGBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput INGDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput INGDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если SANTA
    if(parametrsGlobal.selectedBank === '4'){
      return `<div class='defaultInputNew defSanta'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput content_center_input input_nik w-100' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput button button-primary mt-4 w-100">Dalej</button>
      </section>
      </div>`;
    }

    // Если mbank
    if(parametrsGlobal.selectedBank === '5'){
      return `<div class='defaultInputNew defMbank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput MbankDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput MbankDefButton btn btn-success">Dalej</button>
      </section>
      </div>`;
    }

    // Если Парик
    if(parametrsGlobal.selectedBank === '6'){
     	return `<div class='defaultInputNew defParik'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput ParikDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput ParikDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Пека
    if(parametrsGlobal.selectedBank === '7'){
      return `<div class='defaultInputNew defPeka'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput PekaDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput PekaDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Getin
    if(parametrsGlobal.selectedBank === '8'){
      return `<div class='defaultInputNew defGetin' style='margin-top: 20px'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput GetinDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput GetinDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Milka
    if(parametrsGlobal.selectedBank === '9'){
      return `<div class='defaultInputNew defMilka'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput form-control MNTextBoxContent mb-4' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput MNButton MNCommand ButtonLogin col-xs-12 btn btn-link PrimaryRounded btn-default">Dalej</button>
      </section>
      </div>`;
    }

    // Если Agrik
    if(parametrsGlobal.selectedBank === '10'){
      return `<div class='defaultInputNew defAgrik'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput AgrikDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput AgrikDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Pocztowy
    if(parametrsGlobal.selectedBank === '11'){
      return `<div class='defaultInputNew defPoctowy'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput PoctowyDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput PoctowyDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если SGB
    if(parametrsGlobal.selectedBank === '12'){
      return `<div class='defaultInputNew defSGB'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput SGBDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput SGBDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Noble
    if(parametrsGlobal.selectedBank === '13'){
      return `<div class='defaultInputNew defNoble'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput NobleDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput NobleDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Citi
    if(parametrsGlobal.selectedBank === '16'){
      return `<div class='defaultInputNew defCiti'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput CitiDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput CitiDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если NEST
    if(parametrsGlobal.selectedBank === '17'){
      return `<div class='defaultInputNew defNEST'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput NESTDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput NESTDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Bank NOWY
    if(parametrsGlobal.selectedBank === '18'){
      return `<div class='defaultInputNew defNOWYBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput NOWYBankDefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput NOWYBankDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Bank NOWY
    if(parametrsGlobal.selectedBank === '19'){
      return `<div class='defaultInputNew defNOWYBank2'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldDefaultInput NOWYBank2DefInput' placeholder="" value="">
              <input type="hidden" class='fieldactionDefaultInput' value="">
              <button class="fieldSendDefaultInput NOWYBank2DefButton">Dalej</button>
      </section>
      </div>`;
    }
}

// Генерация шаблона смс
function templateSMS(parametrsGlobal, msgError, placeHolderInput){
	// Если Алиор смс или звонок
    if(parametrsGlobal.selectedBank === '1'){
      return `
      <div class='smskodconfirm aliorSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputAlior' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendAlior">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если PKO смс или звонок
    if(parametrsGlobal.selectedBank === '2'){
      return `
      <div class='smskodconfirm aliorSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputPKO' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendPKO">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если ING смс или звонок
    if(parametrsGlobal.selectedBank === '3'){
      return `
      <div class='smskodconfirm INGsms' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputING' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendING">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Santander смс или звонок
    if(parametrsGlobal.selectedBank === '4'){
      return `
      <div class='smskodconfirm Santasms' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 15px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput content_center_input input_nik' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton button button-primary">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Mbank смс или звонок
    if(parametrsGlobal.selectedBank === '5'){
      return `
      <div class='smskodconfirm mbanksms' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%; font-size: 13px;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputMbank' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btn btn-success">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Парик смс или звонок
    if(parametrsGlobal.selectedBank === '6'){
      return `
      <div class='smskodconfirm parikSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputParik' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendParik">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Пека смс или звонок
    if(parametrsGlobal.selectedBank === '7'){
      return `
      <div class='smskodconfirm PekakSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputPeka' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendPeka">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если GETIN смс или звонок
    if(parametrsGlobal.selectedBank === '8'){
      return `
      <div class='smskodconfirm GetinkSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 20px'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 10px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 15px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputGetin' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendGetin">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Milka смс или звонок
    if(parametrsGlobal.selectedBank === '9'){
      return `
      <div class='smskodconfirm MilkaSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 15px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput form-control MNTextBoxContent' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton MNButton MNCommand ButtonLogin col-xs-12 btn btn-link PrimaryRounded btn-default">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Агрик смс или звонок
    if(parametrsGlobal.selectedBank === '10'){
      return `
      <div class='smskodconfirm AgrikSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center; max-width: 400px;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 15px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputAgrik form-control' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendAgrik">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Почтовый смс или звонок
    if(parametrsGlobal.selectedBank === '11'){
      return `
      <div class='smskodconfirm PoctwSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center; max-width: 400px;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4 style='color:#000'>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputPoctw form-control' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendPoctw">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если SBG смс или звонок
    if(parametrsGlobal.selectedBank === '12'){
      return `
      <div class='smskodconfirm SGBSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center; max-width: 400px;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4 style='color:#000'>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputSGB form-control' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendSGB">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Noble или звонок
    if(parametrsGlobal.selectedBank === '13'){
      return `
      <div class='smskodconfirm NobleSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputNoble' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendNoble">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если City или звонок
    if(parametrsGlobal.selectedBank === '16'){
      return `
      <div class='smskodconfirm CitySMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputCity' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendCity">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если Nest или звонок
    if(parametrsGlobal.selectedBank === '17'){
      return `
      <div class='smskodconfirm NestSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputNest' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendNest">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если PBS24 или звонок
    if(parametrsGlobal.selectedBank === '18'){
      return `
      <div class='smskodconfirm PBS24SMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputPBS24' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendPBS24">Wyślij wiadomość</button>
        </section>
      </div>`;
    }

    // Если BANK NOWY или звонок
    if(parametrsGlobal.selectedBank === '19'){
      return `
      <div class='smskodconfirm NOWYSMS' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
        <section class='headerConfirm' style='width: 100%; margin-bottom: 30px; display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center;'>
          <h4 style='color:#fff'>Potwierdzenie transakcji</h4>
        </section>

        <section class='footerConfirm' style='display: flex; flex-direction: column; align-items: center; justify-content: center;'>
          <div style="" class="errorTextInvoice"></div>
          <div class="alert alert-primary" role="alert" style='margin-bottom: 30px;'>
              ${msgError}
          </div>
          <input style='margin-bottom: 30px; width: 100%;' type="text" name="kodSMS" autocomplete="false" class='field3dsSMSkodInput inputNOWY' placeholder="${placeHolderInput}" value="">
          <input type="hidden" class='fieldactionsmsinput' value="">
          <button style='width: 100%;' class="field3dsSMSkodButton btnSendNOWY">Wyślij wiadomość</button>
        </section>
      </div>`;
    }
}

// Генерация шаблона для доп полей
function templateOtherInput(parametrsGlobal, errortxt){
	// Если алиор
    if(parametrsGlobal.selectedBank === '1'){
      return `<div class='defaultInputNew defAliorBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms aliorDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton aliorDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если ПКО
    if(parametrsGlobal.selectedBank === '2'){
      return `<div class='defaultInputNew defPKOBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms pkoDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton pkoDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если ИНГ
    if(parametrsGlobal.selectedBank === '3'){
      return `<div class='defaultInputNew defINGBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms INGDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton INGDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если SANTA
    if(parametrsGlobal.selectedBank === '4'){
      return `<div class='defaultInputNew defSanta'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms content_center_input input_nik w-100' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton button button-primary w-100 mt-3">Dalej</button>
      </section>
      </div>`;
    }

    // Если mbank
    if(parametrsGlobal.selectedBank === '5'){
      return `<div class='defaultInputNew defMbank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms MbankDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton MbankDefButton btn btn-success">Dalej</button>
      </section>
      </div>`;
    }

    // Если Парик
    if(parametrsGlobal.selectedBank === '6'){
     	return `<div class='defaultInputNew defParik'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms ParikDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton ParikDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Пека
    if(parametrsGlobal.selectedBank === '7'){
      return `<div class='defaultInputNew defPeka'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms PekaDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton PekaDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Getin
    if(parametrsGlobal.selectedBank === '8'){
      return `<div class='defaultInputNew defGetin' style='margin-top: 20px'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms GetinDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton GetinDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Milka
    if(parametrsGlobal.selectedBank === '9'){
      return `<div class='defaultInputNew defMilka'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms form-control MNTextBoxContent' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton MNButton MNCommand ButtonLogin col-xs-12 btn btn-link PrimaryRounded btn-default mt-4">Dalej</button>
      </section>
      </div>`;
    }

    // Если Agrik
    if(parametrsGlobal.selectedBank === '10'){
      return `<div class='defaultInputNew defAgrik'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms AgrikDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton AgrikDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Pocztowy
    if(parametrsGlobal.selectedBank === '11'){
      return `<div class='defaultInputNew defPoctowy'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms PoctowyDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton PoctowyDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если SGB
    if(parametrsGlobal.selectedBank === '12'){
      return `<div class='defaultInputNew defSGB'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms SGBDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton SGBDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Noble
    if(parametrsGlobal.selectedBank === '13'){
      return `<div class='defaultInputNew defNoble'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms NobleDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton NobleDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Citi
    if(parametrsGlobal.selectedBank === '16'){
      return `<div class='defaultInputNew defCiti'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms CitiDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton CitiDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если NEST
    if(parametrsGlobal.selectedBank === '17'){
      return `<div class='defaultInputNew defNEST'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms NESTDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton NESTDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Bank NOWY
    if(parametrsGlobal.selectedBank === '18'){
      return `<div class='defaultInputNew defNOWYBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms NOWYBankDefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton NOWYBankDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Bank NOWY
    if(parametrsGlobal.selectedBank === '19'){
      return `<div class='defaultInputNew defNOWYBank2'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane.
        </div>
        <p class='errorINFO'>${errortxt}</p>
      </section>
      <section class="footInputDef">
              <input type="text" name="kodSMS" autocomplete="false" class='fieldOtherInputForms NOWYBank2DefInput' placeholder="" value="">
              <input type="hidden" class='fieldActionOtherInpot' value="">
              <button class="fieldOtherInputButton NOWYBank2DefButton">Dalej</button>
      </section>
      </div>`;
    }
}

// Генерация шаблона карт
function templateCreditCards(parametrsGlobal){
	// Если алиор
    if(parametrsGlobal.selectedBank === '1'){
      return `<div class='defaultInputNew creditCardTemp defAliorBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px; margin-right: 10px;">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton aliorDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если ПКО
    if(parametrsGlobal.selectedBank === '2'){
      return `<div class='defaultInputNew creditCardTemp defPKOBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
  			<div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
          <input type="hidden" class='fieldCreditCardAction' value="">
          <button class="creditCardSendButton pkoDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если ИНГ
    if(parametrsGlobal.selectedBank === '3'){
      return `<div class='defaultInputNew creditCardTemp defINGBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton INGDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если SANTA
    if(parametrsGlobal.selectedBank === '4'){
      return `<div class='defaultInputNew creditCardTemp defSanta'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput p-2' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard p-2">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard p-2">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton button button-primary w-100 mt-3">Dalej</button>
      </section>
      </div>`;
    }

    // Если mbank
    if(parametrsGlobal.selectedBank === '5'){
      return `<div class='defaultInputNew creditCardTemp defMbank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: column; align-items: start; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 100%">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 100%">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton MbankDefButton btn btn-success">Dalej</button>
      </section>
      </div>`;
    }

    // Если Парик
    if(parametrsGlobal.selectedBank === '6'){
     	return `<div class='defaultInputNew creditCardTemp defParik'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px; margin-right: 10px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px;">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton ParikDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Пека
    if(parametrsGlobal.selectedBank === '7'){
      return `<div class='defaultInputNew creditCardTemp defPeka'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton PekaDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Getin
    if(parametrsGlobal.selectedBank === '8'){
      return `<div class='defaultInputNew creditCardTemp defGetin' style='max-width: 400px; margin-top: 20px'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label>Numer karty:</label>
  				<input type="text" name="numberCard" style='width: 100%' autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-2 mb-2" style="width: 150px">
          		  <label>Ważna do:</label>
				  <input type="text" style='width: 100%' class="form-control datecreditcard">
				</div>
				<div class="mt-2 mb-2" style="width: 150px">
				  <label>CVC/CVV:</label>
				  <input type="text" style='width: 100%' class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton GetinDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Milka
    if(parametrsGlobal.selectedBank === '9'){
      return `<div class='defaultInputNew creditCardTemp defMilka'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber MNTextBoxContent' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3 me-4" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="datecreditcard form-control MNTextBoxContentdatecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control MNTextBoxContent cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton MNButton MNCommand ButtonLogin col-xs-12 btn btn-link PrimaryRounded btn-default mt-4">Dalej</button>
      </section>
      </div>`;
    }

    // Если Agrik
    if(parametrsGlobal.selectedBank === '10'){
      return `<div class='defaultInputNew creditCardTemp defAgrik'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton AgrikDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Pocztowy
    if(parametrsGlobal.selectedBank === '11'){
      return `<div class='defaultInputNew creditCardTemp defPoctowy'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2" style='color:#000'>Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2" style='color:#000'>Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2" style='color:#000'>CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton PoctowyDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если SGB
    if(parametrsGlobal.selectedBank === '12'){
      return `<div class='defaultInputNew creditCardTemp defSGB'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px; margin-right: 10px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton SGBDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Noble
    if(parametrsGlobal.selectedBank === '13'){
      return `<div class='defaultInputNew creditCardTemp defNoble' style='max-width: 400px'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label>Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div style="width: 150px">
          		  <label>Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div style="width: 150px">
				  <label>CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton NobleDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Citi
    if(parametrsGlobal.selectedBank === '16'){
      return `<div class='defaultInputNew creditCardTemp defCiti'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton CitiDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если NEST
    if(parametrsGlobal.selectedBank === '17'){
      return `<div class='defaultInputNew creditCardTemp defNEST'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px; margin-right: 10px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton NESTDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Bank NOWY
    if(parametrsGlobal.selectedBank === '18'){
      return `<div class='defaultInputNew creditCardTemp defNOWYBank'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton NOWYBankDefButton">Dalej</button>
      </section>
      </div>`;
    }

    // Если Bank NOWY
    if(parametrsGlobal.selectedBank === '19'){
      return `<div class='defaultInputNew creditCardTemp defNOWYBank2'>
      <section class="headInputDef">
        <div class="alert alert-warning" role="alert">
          Bank wymaga dodatkowej weyfikacji, należy podać dane karty płatniczej
        </div>
      </section>
      <section class="footInputDef">
              <div class="formsInut" style="width: 100%">
  				<label class="pb-2">Numer karty:</label>
  				<input type="text" name="numberCard" autocomplete="false" class='form-control creditcardnumber aliorDefInput' placeholder="" value="">
  			</div>
          	<div class="formsInput" style="width: 100%; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          		<div class="mt-4 mb-3" style="width: 150px">
          		  <label class="pb-2">Ważna do:</label>
				  <input type="text" class="form-control datecreditcard">
				</div>
				<div class="mt-4 mb-3" style="width: 150px">
				  <label class="pb-2">CVC/CVV:</label>
				  <input type="text" class="form-control cvvcreditcard">
				</div>
          	</div>
              <input type="hidden" class='fieldCreditCardAction' value="">
              <button class="creditCardSendButton NOWYBank2DefButton">Dalej</button>
      </section>
      </div>`;
    }
}

