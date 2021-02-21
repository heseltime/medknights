$('form.box').ready(function(){
	
	//result math
	var questions = []
	$('form.box > ul > li').each(function( i ) {
		questions.push(0);
	});
	
	var question = 0;
		
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
				
				$('#analysis > p').removeClass('labelo_blu');
				$('#analysis').addClass('invisible');
				
				$(this).parents('li').parents('li').hide(0, function() {
					
					$('#result').append('<h4 class="labelo_blu">' + analysis_text + '</h4>');
					
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
			$('#analysis > p').text(analysis_text);
			
			$('#analysis').removeClass('invisible'); //silent fail?
			
			//$('#result').append($('#analysis > p')); //result feedback prep
			//$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
			
			$(thisObj).next().addClass('no-hover');
			
			$(thisObj).parent('li').addClass('labelo_red');
			
			$(thisObj).next().next().html('Nächste Frage');
			$(thisObj).next().next().click( function() {
				
				$('#analysis > p').removeClass('labelo_red');
				$('#analysis').addClass('invisible');

				$(this).parents('li').parents('li').hide(0, function() {
					
					$('#result').append('<h4 class="labelo_red">' + analysis_text + '</h4>');
					
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
				questionsLeft($(this).prev().prev());
				
				$('#analysis').removeClass('invisible');	
			});
			
			
		} else if (!$(this).next().hasClass('selected') && !$(this).next().hasClass('finished') && $(this).parents('ol').find('li > label.selected').length > 0) { //something else already selected, this one is not solected and has not been prev. selected //need to check no feedback yet too
			
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
	
	
	
});
