$('form.box').ready(function(){
	
	var POLYGON_CANVAS_SIZE = 120;
	var POLYGON_PROB = .5; //.5
	var POLYGON_PROB_SETS = 0; //gets updated in populator
	var CIRCLE_PROB_SETS = 0; //gets updated in populator
	
	var STATIC_LINK = 'https://www.medcastle.at/static/'; //'https://www.medcastle.at/static/' 'http://127.0.0.1:8000/static/'
	
	//--------------------------------------------------------//
	//--------------------------------------polygon script //CURRENTLY ONLY FOR SOLUTIONS: PROBLEM SETS IN IMG FILES//
	//--------------------------------------------------------//
	
	
	var getDensity = function() {
		var density = 1; //can hardcode options to play
		return density;
	}
	
	var squareOf = function(x) {
		var xSquared = x * x;
		return xSquared;
	}
	
	var toRadians = function(degrees) {
		return degrees * (Math.PI / 180);
	}
	
	var toDegrees = function(radians) {
		return radians / (Math.PI / 180);
	}
	
	var roundToDecimals = function(value, decimals) {
		var powersOf10 = [1, 10, 100, 1000, 10000];
		var newValue = Math.round(value * powersOf10[decimals]) / powersOf10[decimals];
		return newValue;
	}
	
	//////////////////////////////////////
	
	var rotateCoordinate = function(xyPairs, initial, angRads, numVertices) {
		// base case: number of transformations < 0
		if (numVertices < 0) return;
		else if (numVertices == 0) return;
		else {
			var x = Math.cos(angRads) * initial.x
					- Math.sin(angRads) * initial.y
					;
			var y = Math.sin(angRads) * initial.x
					+ Math.cos(angRads) * initial.y
					;
			// store the result
			var newVertex = { "x" : x, "y" : y };
			xyPairs[numVertices - 1] = newVertex;
			rotateCoordinate(xyPairs, newVertex, angRads, --numVertices);
		}
	}
	
	var computeVertex0 = function(edgeLength, angRads, rotationRads) {
		var halfEdgeLength = edgeLength / 2;
		var radiusLength = halfEdgeLength / Math.sin(angRads / 2);
		var vertex0 = { "x" : 0 - Math.sin(angRads / 2 - rotationRads) * radiusLength,
						"y" : 0 - Math.cos(angRads / 2 - rotationRads) * radiusLength };
		return vertex0;
	}
	
	var generateRegularPolygon = function(xyPairs, numVertices, density) {
		var deltaX = xyPairs[1].x - xyPairs[0].x;
		var deltaY = xyPairs[1].y - xyPairs[0].y;
		var edgeLength = Math.sqrt(squareOf(deltaX) + squareOf(deltaY));
		if (Math.sign(deltaX) < 0) edgeLength = 0 - edgeLength;
		else if (Math.sign(deltaX) == 0 && Math.sign(deltaY) < 0) edgeLength = 0 - edgeLength;
		var rotationRads = 0; if (xyPairs[1].x != xyPairs[0].x) rotationRads = Math.atan(deltaY / deltaX);
		var angRads = 2 * Math.PI / numVertices * density;
		var vertex0 = computeVertex0(edgeLength, angRads, rotationRads);
		rotateCoordinate(xyPairs, vertex0, angRads, numVertices);
	}
	
	//////////////////////////////////////
	//DOM --> hardcode/params to updatePolygon()
	
	var getOneXYpairFromDom = function(vertex) {
		//var xEle = document.getElementById("x" + vertex);
		//var x = 100 * (vertex + 1); if (xEle != null) x = 20; //x = Number(xEle.value)
		var x = 100 * (vertex + 1);
		//var yEle = document.getElementById("y" + vertex);
		//var yEle = 100;
		var y = 100; //sic
		//if (yEle == null) yEle = document.getElementById("y0");
		//if (yEle != null) y = Number(yEle.value);
		return { "x" : x, "y" : y };
	}
	
	var applyOffsets = function(xyPairs) {
		var domXY0 = getOneXYpairFromDom(0);
		var calculatedXY0 = xyPairs[0];
		var offsetX = domXY0.x - calculatedXY0.x;
		var offsetY = domXY0.y - calculatedXY0.y;
		for (vertex = 0; vertex < xyPairs.length; vertex++) {
			xyPairs[vertex].x += offsetX;
			xyPairs[vertex].y += offsetY;
		}
	}
	
	var getOneVectorFromDom = function(vertex) { //no Dom, old struct
		//var angleEle = document.getElementById("angle" + vertex);
		//var angle = 0; if (angleEle != null) angle = Number(angleEle.value);
		var angle = 60;
		//var lengthEle = document.getElementById("length" + vertex);
		//var length = 0; if (lengthEle != null) length = Number(lengthEle.value);
		var length = 50;
		return { "angle" : angle, "length" : length };
	}
	
	var getVectorsFromDom = function(numVertices) {
		var vectors = [];
		for (vertex = 0; vertex < numVertices - 1; vertex++) {
			var vector = getOneVectorFromDom(vertex);
			vectors[vertex] = vector;
		}
		return vectors;
	}
	
	var generatePolygonFromVector = function(xyPairs, numVertices) {
		var accumulatedAngle = 0;
		for (vertex = 0; vertex < numVertices - 1; vertex++) {
			var vector = getOneVectorFromDom(vertex);
			accumulatedAngle += vector.angle;
			var x = xyPairs[vertex].x + 0 - Math.sin(toRadians(accumulatedAngle)) * vector.length;
			var y = xyPairs[vertex].y + Math.cos(toRadians(accumulatedAngle)) * vector.length;
			xyPairs[vertex+1] = { "x" : x, "y" : y };
		}
	}
	
	var getAllXYpairs = function(numVertices) {
		var isRegular = true; //always reg.
		var xyPairs = [];
	
		if (isRegular) {
			var density = getDensity();
			xyPairs[0] = getOneXYpairFromDom(0);
			xyPairs[1] = getOneXYpairFromDom(1);
			generateRegularPolygon(xyPairs, numVertices, density);
			applyOffsets(xyPairs);
		} else {
			xyPairs[0] = getOneXYpairFromDom(0);
			generatePolygonFromVector(xyPairs, numVertices);
		}
	
		return xyPairs;
	}
	
	//////////////////////////////////////
	
	var updatePolygon = function(numVertices, size) {
		var xyPairs = getAllXYpairs(numVertices);
		var innerHtml = "";
		var sizeView = 400;
		innerHtml += "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"polygon\" height=\"" + size + "\" width=\"" + size + "\"  viewBox=\"0 0 " + sizeView + " " + sizeView + "\">"; //style=\"background: red;\"
		innerHtml += " <polygon points=\"";
		for (var vertex = 0; vertex < numVertices; vertex++) {
			if (vertex > 0) innerHtml += " ";
			innerHtml += "" + roundToDecimals(xyPairs[vertex].x, 2) + "," + roundToDecimals(xyPairs[vertex].y, 2);
		}
		innerHtml += "\"";
		innerHtml += ' stroke="white" stroke-width="4" fill="orange" transform="rotate(180 180 180)"'; //kk: 180^3 works best
		innerHtml += " />";
		
		//for (var vertex = 0; vertex < numVertices; vertex++) { //optional coords. code
		//	innerHtml += "<text"
		//		+ " x=\"" + roundToDecimals(xyPairs[vertex].x, 2) + "\""
		//		+ " y=\"" + roundToDecimals(xyPairs[vertex].y, 2) + "\""
		//		+ " text-anchor=\"middle\" fill=\"black\" font-size=\"12\""
		//		+ " >"
		//		+ "(" + roundToDecimals(xyPairs[vertex].x, 2) + "," + roundToDecimals(xyPairs[vertex].y, 2) + ")"
		//		+ " </text>";
		//}
		
		
		innerHtml += "</svg>";
		
		return innerHtml;
		//var polygonEle = document.getElementById("polygon");
		//polygonEle.innerHTML = innerHtml;
	}
	
	//--------------------------------------------------------//
	//--------------------------------------circle script //CURRENTLY ONLY FOR SOLUTIONS: PROBLEM SETS IN IMG FILES//
	//--------------------------------------------------------//
	
	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
		var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
	
		return {
			x: centerX + (radius * Math.cos(angleInRadians)),
			y: centerY + (radius * Math.sin(angleInRadians))
		};
	}
	
	
	///////////////////////////////////////////////////////
	
	var updateCircle = function(end_angle) { //sector_angle fn?
		/*
		opts = {
			cx              <-- center x
			cy              <-- center y
			radius          <-- circle radius
			start_angle     <-- start angle in degrees
			end_angle       <-- end angle in degrees
		};
		*/
		
		var size = POLYGON_CANVAS_SIZE;
		var sizeView = 400;
		
		// sector
		var opts = {
			cx: 200,
			cy: 200,
			radius: 200,
			start_angle: 0,
			end_angle: end_angle,
		};
		
		var start = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.end_angle),
			end = polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle),
			largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";
		
		var d = [
			"M", start.x, start.y,
			"A", opts.radius, opts.radius, 0, largeArcFlag, 0, end.x, end.y,
			"L", opts.cx, opts.cy,
			"Z"
		].join(" ");
		
		var innerHtml = "";
		
		if (end_angle != 360) {
			innerHtml += "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"circle\" height=\"" + size + "\" width=\"" + size + "\"  viewBox=\"0 0 " + sizeView + " " + sizeView + "\">"; //style=\"background: red;\"
			innerHtml += '<path fill="orange" stroke="white" stroke-width="4" fill="none" d="' + d + '" />';
			innerHtml += "</svg>";
		} else {
			innerHtml += "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"circle\" height=\"" + size + "\" width=\"" + size + "\"  viewBox=\"0 0 " + sizeView + " " + sizeView + "\">"; //style=\"background: red;\"
			innerHtml += '<circle cx="' + opts.cx + '" cy="' + opts.cy + '" r="' + opts.radius + '" fill="orange" stroke="white" stroke-width="4" fill="none" />';
			innerHtml += "</svg>";
		}
		
		
		
		
		return innerHtml;
		
	}
		
	//--------------------------------------------------------//
	//--------------------------------------load polygons (and circles)
	//--------------------------------------------------------//
	
	//format: updatePolygon(5, 200); //parms for edgeNum and size
	
	var total_qs;
	
	function next_qs(q) {
		for (i = 0; i < q; i++) {
			$('form.box > ul > li:first').clone().appendTo($('form.box > ul'));
		}
		
		total_qs = q + 1;
		
	}
	
	next_qs(14); //((MAX POLYGON_PROB_SETS - 1! --> make more than 15))
	
	//tracking
	var problemsets_angular = [];
	var problemsets_circular = [];
	
	function populator(problemset_file) { //--------------------------------------determine if polygon problem and load answers as svg, problemset and solution FROM IMAGES (APPROACH JUNE 2020)
		
		//work out file names
		var problemsets_from_file = problemset_file.split("\n");
				
		POLYGON_PROB_SETS = problemsets_from_file.length / 4; //half of half the files
		
		CIRCLE_PROB_SETS = POLYGON_PROB_SETS; //!! <--> index txt file
	
		for (i = 0; i < total_qs; i++) {
			
			if (Math.random() < POLYGON_PROB) { //polygon prob(lem) acc to POLYGON_PROB(ability)

				var r_problemset = Math.floor(Math.random() * POLYGON_PROB_SETS); 
				while (problemsets_angular.includes(r_problemset)) { 
					var r_problemset = Math.floor(Math.random() * POLYGON_PROB_SETS);
				}
								
				problemsets_angular.push(r_problemset);
								
				var file_r_problemset = problemsets_from_file[r_problemset * 2 + 1]; //see file struct/indext .txt file
				var file_r_problemset_sol = problemsets_from_file[r_problemset * 2];
				
				//gesucht	
				var img_file_link = STATIC_LINK + 'img/schmiede-fz/ANGULAR/2x/' + file_r_problemset;	
				$('form.box > ul > li:nth-child(' + (i + 1) + ') > h2 > img').attr("src", img_file_link); //get right image
				//alert(file_r_problemset);
				
				//sol
				var img_file_link_sol = STATIC_LINK + 'img/schmiede-fz/ANGULAR/2x/' + file_r_problemset_sol;	
				$('form.box > ul > li:nth-child(' + (i + 1) + ') > p.analysis > img').attr("src", img_file_link_sol);
				
				for (j = 0; j <= 4; j++) { //cycle thry li options == 5
					
					$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').html(updatePolygon(j + 5, POLYGON_CANVAS_SIZE));
					
					//alert(img_file_link.slice(-5,-4) + ' ' + String.fromCharCode(97 + j));
					
					if (img_file_link.slice(-8,-7) == String.fromCharCode(97 + j)) {
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > input').val(1);
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > input').next().append('<i class="fas fa-arrow-left invisible" style="margin-left: -50px;"></i>');
					}

				}
				
			} else { // circle problem (1 - POLYGON_PROB(ability))
			
				
				var r_problemset = Math.floor(Math.random() * CIRCLE_PROB_SETS); 
				
				while (problemsets_circular.includes(r_problemset)) {
					var r_problemset = Math.floor(Math.random() * CIRCLE_PROB_SETS);
				}
				
				problemsets_circular.push(r_problemset);
								
				var file_r_problemset = problemsets_from_file[(POLYGON_PROB_SETS * 2) + r_problemset * 2 + 1];
				var file_r_problemset_sol = problemsets_from_file[(POLYGON_PROB_SETS * 2) + r_problemset * 2];
				
				//gesucht	
				var img_file_link = STATIC_LINK + 'img/schmiede-fz/CIRCULAR/2x/' + file_r_problemset;	
				$('form.box > ul > li:nth-child(' + (i + 1) + ') > h2 > img').attr("src", img_file_link); //get right image
				//alert(file_r_problemset);
				
				//sol
				var img_file_link_sol = STATIC_LINK + 'img/schmiede-fz/CIRCULAR/2x/' + file_r_problemset_sol;	
				$('form.box > ul > li:nth-child(' + (i + 1) + ') > p.analysis > img').attr("src", img_file_link_sol);
			
				for (j = 0; j <= 4; j++) { 
					
					var angle_calc = (j + 1) * 90;
	
					$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').html(updateCircle(angle_calc));
					
					if (img_file_link.slice(-8,-7) == String.fromCharCode(97 + j)) {
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > input').val(1);
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > input').next().append('<i class="fas fa-arrow-left invisible" style="margin-left: -50px;"></i>');
					}
					
				}		
				
			}
			
		}

				
			
		
	}
	
	$.ajax({
		type: "GET",
		url: "/static/js/quiz_fz_problemsets_index.txt",
		dataType: "text",
		success: populator
	});
	
	//result math
	var questions = []
	$('form.box > ul > li').each(function( i ) {
		questions.push(0);
	});
	
	var question = 0;
	
	$('#questionsLeft').html('Noch ' + questions.length + ' Fragen nach dieser.');
		
	//fns
	function questionsLeft(thisObj) {
		var left = $(thisObj).parents('li').parents('li').nextAll('li').length - 1;
		
		if (left > 1) {
			$('#questionsLeft').html('Noch ' + left + ' Fragen nach dieser.');
		} else if (left > 0) {
			$('#questionsLeft').html('Noch eine Frage nach dieser.');
		} else {
			$('#questionsLeft').html('Letzte Frage!');
		}
		
		return left;
	}
	
	function feedback(thisObj, answer) { //answer display and 'next' button
		questions[question] = answer;
		question++;
					
		var correct = false;
		var analysis_text = $(thisObj).parents('li').parents('li').find('p.analysis').html();
				
		
		if (answer == '1') { //str to bool
			correct = true;
		}
		
		
		if (correct) { //correct! display >> button for next question or submit
			$('#analysis-note').addClass('invisible'); //keeps space abover form.box
			
			$('#analysis > p').addClass('labelo_blu');
			$('#analysis > p > img').replaceWith(analysis_text);
			
			$('#analysis').removeClass('no_display'); //work with this rather than show/hide for this <p>
			
			//$('#result').append($('#analysis > p')); //result feedback prep
			
			//$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
			
			$(thisObj).next().addClass('no-hover');
			
			$(thisObj).parent('li').addClass('labelo_blu');

			$(thisObj).next().next().html('Nächste Frage');
			$(thisObj).next().next().click( function() {
				
				$('#analysis > p').removeClass('labelo_blu');
				$('#analysis').addClass('no_display');
				
				$(this).parents('li').parents('li').hide(0, function() {
					
					//$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
					
					if ($(this).next().length > 0) {
												
					   $(this).next().show();
					   					   
					   //questionsLeft($(this));
					   
					} else {
												
						//$('form.box').submit();
						
						js_submission();
						
					}
					
				});
			});
			
		} else { //wrong! display >> button for next question or submit
			$('#analysis-note').addClass('invisible');
			
			$('#analysis > p').addClass('labelo_red');
			$('#analysis > p > img').replaceWith(analysis_text);
			
			$('#analysis').removeClass('no_display'); //silent fail?
			
			//$('#result').append($('#analysis > p')); //result feedback prep
			//$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
			
			$(thisObj).next().addClass('no-hover');
			
			$(thisObj).parent('li').addClass('labelo_red');
			
			$(thisObj).next().next().html('Nächste Frage');
			$(thisObj).next().next().click( function() {
				
				$('#analysis > p').removeClass('labelo_red');
				$('#analysis').addClass('no_display');

				$(this).parents('li').parents('li').hide(0, function() {
					
					//$('#result').append('<h4 class="labelo_red"></h4>').append(analysis_text);
					
					if ($(this).next().length > 0) {
						
					   $(this).next().show();
					   
					   //questionsLeft($(this));
					   
					} else {
						
						//$('form.box').submit();
						//$('form.box').html('<h3><i class="fas fa-thumbs-up"></i><b> Done.</b></h3>');
						
						js_submission();
						
					}
					
				});
				
				
				
			});
		}
		
		//addendum: presentation items, once feedback given
		$(thisObj).parents('li').addClass('question_done'); 
		$('li.question_done > h4 > ol > li:not(.selected) > input').attr('disabled',true);
		
		//$('form.box > ul > li > h4 > ol > li:not(.selected) > label').addClass('no-hover');
		//$('form.box > ul > li > h4 > ol > li:not(.selected) > label').prev().attr('disabled',true);
		
		return answer;
	}
	
	function js_submission() {
		//math
		var win = false;
		
		var count_correct = 0;
		
		for (i = 0; i < questions.length; i++) {
			if (questions[i] == 1) {
				count_correct++;
			}
		}
		
		var percentage = ((count_correct / questions.length) * 100).toFixed(2);
		
		if (percentage >= 80) {
			win = true;
		}
		
		//display
		$('form.box > ul').hide();
		$('#questionsLeft').hide();
		$('#analysis').hide();	
		
		$('#result').removeClass('no_display');
		
		$('#result > h5.labelo').html('<i class="fas fa-arrow-right"></i> ' + percentage + '% richtig</h5></div>');
		
		if (win) {
			$('#result > h1').html('MedAT Untertest Statistisch Geschafft!');
			$('#result div').removeClass('no_display');
			$('#result img').removeClass('invisible'); 
			$('#result p').addClass('no_display'); //don't need this note if good
		} else {
			$('#result > h1').html('Für diesen MedAT Untertest brauchst du noch etwas Vorbereitung.');
			$('#result div ').addClass('no_display'); //box for fb share for card, which person is not getting
		}
		
	}
	
	
	//int. logic
	$('form.box > ul > li').each(function( i ) {
	  $(this).find('input').attr('name', 'q' + i);
	  	  
	  $(this).find('label').each(function( j ) {
		  $(this).attr('for', 'q' + i + 'a' + j);
		  
		  $(this).prev().attr('id', 'q' + i + 'a' + j);
	  });
	});
	
	
	//presentation
	$('form.box > ul > li').not(':first').hide();
	
	questionsLeft($('form.box > ul > li:first > h4 > ol > li > input')); //rel. to input, not li
	
	//$('input[value="1"]').next().append('<i class="fas fa-arrow-left invisible"></i>'); //HAS TO TRIGGER LATER
	
	$('#result img').addClass('invisible'); //only shows if success
	
	//question functionality
	$('input').click(function() {
		var answer = $(this).val();
		
		
		if (!$(this).next().hasClass('selected') && $(this).parents('ol').find('li > label.selected').length == 0) { //nothing selected yet (cannot have prev. been selected)
			//1st selection
			$(this).next().addClass('selected');
			
			$(this).parent('li').append('<a class="button">Einreichen</a>');
			
			//button functionality
			$('form.box > ul > li > h4 > ol > li > a.button').click(function() {
				feedback($(this).prev().prev(), answer);
				questionsLeft($(this).prev().prev());
				
				$('#analysis').removeClass('invisible');	
			});
			
			
		} else if (!$(this).next().hasClass('selected') && !$(this).next().hasClass('finished') && $(this).parents('ol').find('li > label.selected').length > 0 && $('#analysis').hasClass('no_display')) { //something else already selected, this one is not solected and has not been prev. selected //need to check no feedback yet too
			
			//clear other selection (will only be one)
			$(this).parents('ol').find('li > label.selected').addClass('finished');
			$(this).parents('ol').find('li > label.selected').addClass('no-hover');
			$(this).parents('ol').find('li > label.selected').prev().attr("disabled", true); //!
			
			$(this).parents('ol').find('li > label.selected').removeClass('selected');
			
			$(this).parents('ol').find('li > a.button').remove();
			
			//new selection
			$(this).next().addClass('selected');
			$(this).parent('li').append('<a class="button">Einreichen</a>');
			
			//button functionality
			$('form.box > ul > li > h4 > ol > li > a.button').click(function() {
				feedback($(this).prev().prev(), answer);
				questionsLeft($(this).prev().prev());
				
				$('#analysis').removeClass('invisible');	
					
			});
		
		} else { //2nd click on label not prev. selected --> feedback
			
			if ($('#analysis').hasClass('invisible')) { //need to check no feedback yet too
				feedback($(this), answer);
				questionsLeft($(this));
			}
			
	
		}	
		
				
	});
	
	$('#questionsLeft').html('Noch ' + (questions.length - 1) + ' Fragen nach dieser.'); //NEEDED
	
});
