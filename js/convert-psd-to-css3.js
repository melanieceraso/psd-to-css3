jQuery(document).ready(function($) {	
		//detect for IE10
		if ($.browser.msie && parseInt($.browser.version) > 9) {
			$("html").addClass("ie gte-ie10");
		}

		function doCSSMaths() {
			var opacity = $('input[name="opacity"]').val();
			var ang = $('input[name="angle"]').val();
			var dist = $('input[name="distance"]').val();
			var spread = $('input[name="spread"]').val();
			var size = $('input[name="size"]').val();
			var r = $('input[name="red"]').val();
			var g = $('input[name="green"]').val();
			var b = $('input[name="blue"]').val();
			var ins = $('select[name="inset"]').val();

			// convert opacity to number
			var cssopacity = opacity / 100;
				$('input[name="css-opacity"]').val(cssopacity);
				$('.output .css-opacity').text(cssopacity);

			// Angle == Θ
			var ang = (180 - ang) * 3.14 / 180; //convert to radians.

			// vertical shadow: offset-y = Sin(Θ) * Hypotenuse
			var offsety = Math.round(Math.sin(ang) * dist); 
			$('input[name="offset-y"]').val(offsety);
			$('.output .offset-y').text(offsety);

			// horizontal shadow: offset-x = Cos(Θ) * Hypotenuse
			var offsetx = Math.round(Math.cos(ang) * dist); 
			$('input[name="offset-x"]').val(offsetx);
			$('.output .offset-x').text(offsetx);

			//spread-radius equals the Photoshop Size multiplied by the Photoshop Spread percentage
			var spreadrad = size * spread/100;
			$('input[name="spreadrad"]').val(spreadrad);
			$('.output .spread-radius').text(spreadrad);

			//blur-radius is equal to the Photoshop Size minus the <spread-radius>
			var blurrad = size - spreadrad;
			$('input[name="blur-radius"]').val(blurrad);
			$('.output .blur-radius').text(blurrad);

			//write color to code
			$('.output .r').text(r);
			$('.output .g').text(g);
			$('.output .b').text(b);

			if ($('input[name="inset"]:checked').val() == 'Yes') {	       
				$('.output .css-inset').text(' inset').css('display','inline');
			} else {
				$('.output .css-inset').css('display','none');
			}
		};

		function doPSMaths() {
			//get css values
			var offsetx = $('input[name="offset-x"]').val(); // horizontal length
			var offsety = $('input[name="offset-y"]').val(); // vertical length
			var blurrad = $('input[name="blur-radius"]').val(); // blur radius
			var spreadrad = $('input[name="spreadrad"]').val(); // spread
			var cssopacity = $('input[name="css-opacity"]').val() // opacity

			// ps opacity = css opacity * 100
			var opacity = cssopacity * 100;
			$('input[name="opacity"]').val(opacity);

			// distance = √ ((offset-x)^2 + (offset-y)^2)
			var dist = Math.sqrt( (Math.pow(offsetx,2)) + (Math.pow(offsety,2)) );
			$('input[name="distance"]').val(dist);
			
			// angle = arctan(y-offset/x-offset)
			var ang = Math.atan(offsety/offsetx);
			$('input[name="angle"]').val(ang);

			// spread = (spread radius/(spread radius + blur radius)) * 100
			var spread = (spreadrad/(spreadrad + blurrad)) * 100;
			$('input[name="spread"]').val(spread);

			// size = spread radius + blur radius
			var size = (spreadrad + blurrad);
			$('input[name="size"]').val(size);
		} 

		function doCodes() {
			var inset = $('select[name="inset"]').val();
			var offsetx = $('input[name="offset-x"]').val();
			var offsety = $('input[name="offset-y"]').val();
			var blurrad = $('input[name="blur-radius"]').val();
			var spreadrad = $('input[name="spread"]').val();
			var r = $('input[name="red"]').val();
			var g = $('input[name="green"]').val();
			var b = $('input[name="blue"]').val();
			var cssopacity = $('input[name="css-opacity"]').val();
			$('.output .offset-x').text(offsetx);
			$('.output .offset-y').text(offsety);
			$('.output .blur-radius').text(blurrad);
			$('.output .spread-radius').text(spreadrad);
			$('.output .r').text(r);
			$('.output .g').text(g);
			$('.output .b').text(b);
			$('.output .css-opacity').text(cssopacity);
			if ($('select[name="inset"]').val() == 'Yes') {	       
				$('.output .css-inset').text(' inset').css('display','inline');
			} else {
				$('.output .css-inset').css('display','none');
			}
		};

		// Convert PS settings to CSS3 and show output
		$('a.generate-css').click(function() {
			doCSSMaths();
			$('.output .syntax').hide();
			$('.output .generated').fadeIn();
		  	return false;
		});

		// Convert CSS settings to PS and show output
		$('a.generate-ps').click(function() {
			doPSMaths();
			//$('.output .syntax').hide();
			//$('.output .generated').fadeIn();
		  	return false;
		}); 

		//Set Default Ps Settings
		$('a.set-ps-default').click(function() {
			$('.output .generated').hide();
			$('.output .syntax').fadeIn();
			$('input[name="red"]').val("0");
			$('input[name="green"]').val("0");
			$('input[name="blue"]').val("0");
			$('input[name="opacity"]').val("75");
			$('input[name="angle"]').val("120");
			$('input[name="distance"]').val("5");
			$('input[name="spread"]').val("0");
			$('input[name="size"]').val("5");
			doCSSMaths();
			$('.output .syntax').hide();
			$('.output .generated').fadeIn();

		}); 

		
		$('a.clear-btn').click(function() {
			$('form.from-ps')[0].reset();
			$('form.css3-box-shadow')[0].reset();
			$('.output .generated').hide();
			$('.output .syntax').fadeIn();
		  	return false;
		});


		//watch for form changes
		/* $('.watch').change(function() {
			$('.updated').fadeIn();
		});*/

		$(".show-syntax").popover({
			placement: "right",
			html: "true",
			trigger: "click",
			content: "box-shadow: offset-x offset-y blur-radius spread-radius rgba(0, 0, 0, opacity) inset;<br><br>text-shadow: offset-x offset-y blur-radius rgba(0,0,0 opacity);"
		});

	});