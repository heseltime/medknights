$('form.box').ready(function(){
	
	var total_qs;
	
	//initial creation of ul for words
	function next_qs(q) {
		for (i = 0; i < q; i++) {
			$('form.box > ul > li:first').clone().appendTo($('form.box > ul'));
		}
		
		total_qs = q + 1;
		
	}
	
	next_qs(14);
			
	//xml > words
	$.ajax({
		type: "GET",
		url: "/static/js/quiz_wf_words.xml",
		dataType: "xml",
		success: xmlParser
	});
	
	var words = [];
	var anagrams = [];
	
	var ltr_options = [];
	
	function xmlParser(xml) {		
		$(xml).find("problem").each(function (i) {
			words.push($(this).find("word").text());
			
			anagrams[i] = [];
			$(this).find("anagram").each(function (j) {
				anagrams[i].push($(this).text());
			});
			
		});
		
		//all > random selection
		var selector;
		var selector_used = [];
		
		var random_an = [];
		var random_w = [];
		
		for (i = 0; i < total_qs; i++) {
			selector = Math.floor((Math.random() * words.length));
			
			while (selector_used.includes(selector)) {
				selector = Math.floor((Math.random() * words.length));
			}
			
			selector_used.push(selector);
			
			//populate random_an and _w arrays
			random_an.push(anagrams[selector][Math.floor((Math.random() * anagrams[selector].length))]); //double randomization
			random_w.push(words[selector]);
			
			//create letter options from random_w
			ltr_options[i] = [];
			for (j = 0; j < random_w[i].length; j++) {
				if (!ltr_options[i].includes(random_w[i][j])) { //chk for duplicates
					ltr_options[i].push(random_w[i][j]);
				}
			}
		}
		
		for (i = 0; i < $('form.box > ul > li').length; i++) {
			//gesucht
			$('form.box > ul > li:nth-child(' + (i + 1) + ') > h2').text(random_an[i]);
			
			//sol
			$('form.box > ul > li:nth-child(' + (i + 1) + ') > p.analysis').text(random_w[i]);
			
			//options
			var random_placement = Math.floor(Math.random() * 4); //random placement 0 thru 3		
			var used_letters = [] //in letters, for this word
			
			for (j = 0; j < 4; j++) { //cycle thry li options == 5
				
				if (j == random_placement) {
					$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(ltr_options[i][0]); //correct one
					$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > input').val(1); //set val
					
					
				} else {
					var k = Math.floor(Math.random() * (ltr_options[i].length - 1)) + 1; //random letters remaining, from 1 (2nd letter)
					
					if (ltr_options[i].length > 3) {
						while (used_letters.includes(ltr_options[i][k])) {
							k = Math.floor(Math.random() * (ltr_options[i].length - 1)) + 1;
						}
					} 
					
					used_letters[j] = ltr_options[i][k];
				
					$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(ltr_options[i][k]);
					
				}
				
			}
			
		}
	}

	
	//result math
	var questions = []
	$('form.box > ul > li').each(function( i ) {
		questions.push(0);
	});
	
	var question = 0;
	var questions_left = questions.length;
		
	//fns
	function questionsLeft() {
		//var left = $(thisObj).parents('li').parents('li').nextAll('li').length;
		//var left = questions.length - question;
		
		//alert(questions_left);
		questions_left--;
		
		if (questions_left > 1) {
			$('#questionsLeft').html('Noch ' + questions_left  + ' Fragen nach dieser.');
		} else if (questions_left == 1) {
			$('#questionsLeft').html('Noch eine Frage nach dieser.');
		} else {
			$('#questionsLeft').html('Letzte Frage!');
		}
		
		
		
	}
	
	function feedback(thisObj, answer) { //answer display and 'next' button
		questions[question] = answer;
		question++;
					
		var correct = false;
		var analysis_text = $(thisObj).parents('li').parents('li').find('p.analysis').text();
		
		if (answer == '1') { //str to bool
			correct = true;
		}
		
		
		if (correct) { //correct! display >> button for next question or submit
			$('#analysis-note').addClass('invisible'); //keeps space abover form.box
			
			$('#analysis > p').addClass('labelo_blu');
			$('#analysis > p').text(analysis_text);
			
			$('#analysis').removeClass('invisible'); //work with this rather than show/hide for this <p>
			
			//$('#result').append($('#analysis > p')); //result feedback prep
			
			//$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
			
			$(thisObj).next().addClass('no-hover');
			
			$(thisObj).parent('li').addClass('labelo_blu');

			$(thisObj).next().next().html('Nächste Frage');
			$(thisObj).next().next().click( function() {
				
				$('#result').append($(thisObj).parents('li').parents('li').find('h2')).addClass('space-top');
				$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
				
				$('#analysis > p').removeClass('labelo_blu');
				$('#analysis').addClass('invisible');
				
				$(this).parents('li').parents('li').hide(0, function() {
					
					//$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
					
					if ($(this).next().length > 0) {
												
					   $(this).next().show();
					   					   
					   questionsLeft();
					   
					} else {
												
						//$('form.box').submit();
						
						js_submission();
						
					}
					
				});
			});
			
		} else { //wrong! display >> button for next question or submit
			$('#analysis-note').addClass('invisible');
			
			$('#analysis > p').addClass('labelo_red');
			$('#analysis > p').text(analysis_text);
			
			$('#analysis').removeClass('invisible'); //silent fail?
			
			//$('#result').append($('#analysis > p')); //result feedback prep
			//$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
			
			$(thisObj).next().addClass('no-hover');
			
			$(thisObj).parent('li').addClass('labelo_red');
			
			$(thisObj).next().next().html('Nächste Frage');
			$(thisObj).next().next().click( function() {
				
				$('#result').append($(thisObj).parents('li').parents('li').find('h2')).addClass('space_top');
				$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
				
				$('#analysis > p').removeClass('labelo_red');
				$('#analysis').addClass('invisible');

				$(this).parents('li').parents('li').hide(0, function() {
					
					//$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
					
					if ($(this).next().length > 0) {
						
					   $(this).next().show();
					   
					   questionsLeft();
					   
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
		
		$('#result').removeClass('no_display');
		
		$('#result > h5.labelo').html('<i class="fas fa-arrow-right"></i> ' + percentage + '% richtig</h5></div>');
		
		if (win) {
			$('#result > h1').html('MedAT Untertest Statistisch Geschafft!');
			$('#result div').removeClass('no_display');
			$('#result img').removeClass('invisible'); 
			//$('#result p').addClass('no_display'); //don't need this note if good
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
	
	$('input[value="1"]').next().append('<i class="fas fa-arrow-left invisible"></i>'); //made visibel when question_done
	
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
				//questionsLeft($(this).prev().prev());
				
				$('#analysis').removeClass('invisible');	
			});
			
			
		} else if (!$(this).next().hasClass('selected') && !$(this).next().hasClass('finished') && $(this).parents('ol').find('li > label.selected').length > 0 && $('#analysis').hasClass('invisible')) { //something else already selected, this one is not solected and has not been prev. selected //need to check no feedback yet too
			
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
				//questionsLeft($(this).prev().prev());
				
				$('#analysis').removeClass('invisible');	
					
			});
		
		} else { //2nd click on label not prev. selected --> feedback
			
			if ($('#analysis').hasClass('invisible')) { //need to check no feedback yet too
				feedback($(this), answer);
				//questionsLeft($(this));
			}
			
	
		}	
		
				
	});
	
	
	
});
