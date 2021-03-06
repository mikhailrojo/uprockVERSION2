(function(){
		var clientHeight = document.documentElement.clientHeight;
		var div = document.getElementById("uprock");
		div.style.height = div.style.width = clientHeight/10 +'px';
		div.style.marginTop = clientHeight/10 + 'px';

		// рандомный цвет при создании
		var color = Math.ceil(Math.random()*360);	
		div.style.backgroundColor = "hsl("+color+",100%,50%)";
			
		var top = 0;
		var scrollRate = clientHeight/80;
		var stop = (clientHeight*0.7);
		
		if(document.addEventListener){
			if('onwheel' in document){
				document.addEventListener("wheel",upRock)
			}else if('onmousewheel' in document){
				document.addEventListener("mousewheel", upRock)
			}else{
				document.addEventListener("MozMousePixelScroll", upRock);
			}
		}else{
			document.attachEvent("onmousewheel", upRock);
		}
		
		var touch;
		var upOrDown;
		document.addEventListener('touchstart', function(e){
			touch = e.touches[0].screenY;
		});
		document.addEventListener('touchmove', function(e){
			var move = e.touches[0].screenY- touch;
			if (move > 0){
				upOrDown = -1;
			} else {
				upOrDown = 1;
			}
			upRock();
		});
		
		//изменения при скроле
		function upRock(e){
		
			e = e || window.event;
			var delta = e.deltaY|| e.detail || e.wheelDelta ||e.wheelDelta || upOrDown;

			
			if (top*scrollRate < stop && delta>0){
				div.style.top = (top++)*scrollRate + 'px';
				div.style.borderRadius = top*scrollRate/clientHeight*72 + '%';
				color = Math.ceil(color*0.99);
				div.style.backgroundColor = "hsl("+color+",100%,50%)";
			}
			if (delta <0 && top*scrollRate> top){
				div.style.top = (top--)*scrollRate + 'px';
				div.style.borderRadius = top*scrollRate/clientHeight*72 + '%';
				color = Math.ceil(color*1.01);
				div.style.backgroundColor = "hsl("+color+",100%,50%)";
			}
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}

	})();
