$('form.box').ready(function(){
	
	//result math
	var questions = []
	//$('form.box > ul > li').each(function( i ) {
	//	questions.push(0);
	//});
	
	$('form.box > ul > li').each(function( i ) {
		questions.push(0);
	});
	
	var question = 0;
	
	//MORE result math
	var sub_question = [0, 0, 0, 0, 0]; //arr of individual answer selectiosn for feedback fn, reset at end of feedback
		
	//fns
	//function questionsLeft() {
	//	var left = questions.length - question - 1;
	//	
	//	if (left > 1) {
	//		$('#questionsLeft').html('Noch ' + left + ' Fragen nach dieser.');
	//	} else if (left > 0) {
	//		$('#questionsLeft').html('Noch eine Frage nach dieser.');
	//	} else {
	//		$('#questionsLeft').html('Letzte Frage!');
	//	}
	//	
	//	return left;
	//}
	
	//fns
	var questions_left = questions.length;
	function questionsLeft() {
		//var left = $(thisObj).parents('li').parents('li').nextAll('li').length;
		//var left = questions.length - question;
		
		//alert(questions_left);
		questions_left--;
		
		//alert(questions_left );
		
		if (questions_left > 1) {
			$('#questionsLeft').html('Noch ' + questions_left  + ' Fragen nach dieser.');
		} else if (questions_left == 1) {
			$('#questionsLeft').html('Noch eine Frage nach dieser.');
		} else {
			$('#questionsLeft').html('Letzte Frage!');
		}
		
		
		
	}
	
	function feedback(thisObj, sub_answer) { //from sub_question, array of 5 answer ids
		$('label').off('click', next_fn); //!
		
		var answers_givn = [];
		var answers_corr = [];
		var answers_eval = [];
		
		for (i = 0; i < sub_answer.length; i++) {
			answers_givn.push(sub_answer[i][0]);
			answers_corr.push(sub_answer[i][1]);
			answers_eval.push(sub_answer[i][2]);
		}
		
		var answer_pnts = 0;
		
		for (i = 0; i < answers_eval.length; i++) {
			answer_pnts = answer_pnts + answers_eval[i];
		}
		
		answer_pnts = (answer_pnts * 0.2).toFixed(2); //current math
				
		questions.push(answer_pnts); //sum for total points ///////////////// questions[question] = answer_pnts?????????????????????????????
		question++;
		
		//alert(questions);
				
		//prsentation
		for (i = 0; i < answers_eval.length; i++) {
			if (answers_eval[i]) {
				//$('#' + answers_corr[i] + ' + label').parent('li').css('color', '#00a5e8');
				//alert(i);
				//$('#' + answers_corr[i]).parent('li').addClass('labelo_blu');
				$(thisObj).parents('ol').find('li:nth-child(' + (i + 1) + ')').addClass('labelo_blu');
			} else {
				//alert(i);
				//$('#' + answers_corr[i]).parent('li').addClass('labelo_red');
				$(thisObj).parents('ol').find('li:nth-child(' + (i + 1) + ')').addClass('labelo_red');
				var x = parseInt($(thisObj).parents('ol').find('li:nth-child(' + (i + 1) + ')').find('input').val());
				x++;
				$(thisObj).parents('ol').find('li:nth-child(' + (i + 1) + ') > label:nth-child(' + x + ')').append(' <i class="fas fa-arrow-left"></i>');
				//$('#' + answers_corr[i] + ' + label').parent('li').find('label:nth-child(' + (i + 2) + ')').prepend('<i class="fas fa-arrow-right"> </i>');
			}
		}
		
		//$('#analysis-note').addClass('invisible');
		
		if (answer_pnts == 1.00) {
			$('.analysis').addClass('labelo_blu');
		} else {
			$('.analysis').addClass('labelo_red');
		}
					
		$('.analysis').removeClass('invisible');	
		
		
		
		$(thisObj).html('Nächste Frage');
		$(thisObj).off(); //!
		$(thisObj).on('click', function() {
				
				$('.analysis').removeClass('labelo_blu');
				$('.analysis').addClass('invisible');
				
				questionsLeft();
				
				$(this).parents('li').hide(0, function() {
										
					if ($(this).next().length > 0) {					
					   
					   $('label').on('click', next_fn); //!?
					   $('form.box > ul > li > h4 > ol > li:not(.selected) > label').parent('li').find('input').attr('disabled',false);
					   $(this).next().show();
					   
					   //alert(questions[question - 1]);
					   
					   $(thisObj).off(); //!
					   					   					   
					} else {
												
						//$('form.box').submit();
						
						//alert(questions[question - 1]);
						js_submission();
						
					}
					
				});
			});
		
		//$(thisObj).parents('li').addClass('question_done'); 

		$('form.box > ul > li > h4 > ol > li:not(.selected) > label').parent('li').find('input').attr('disabled',true);
		
		sub_question = [0,0,0,0,0]; //reset for click fn
		
		return answer_pnts;
	}
	
	function js_submission() {
		//math
		var win = false;

		var count_correct = 0;
		
		for (i = 0; i < questions.length; i++) {
			questions[i] = parseFloat(questions[i]); 
			count_correct += questions[i];
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
	  	  
	  $(this).find('h4 > ol > li').each(function( j ) { 
		  $(this).children('input').attr('id', 'q' + i + 'a' + (j + 1));
		  $(this).children('label').attr('for', 'q' + i + 'a' + (j + 1));
	  });
	});
	
	
	//presentation
	$('form.box > ul > li').not(':first').hide();
	
	questionsLeft();
	
	//$('input[value="1"]').next().append('<i class="fas fa-arrow-left invisible"></i>'); //made visibel when question_done
	
		
	$('#result img').addClass('invisible'); //only shows if success
	
	
	
	function next_fn() {
		//logic
		var answer_corr_pre = $(this).parent('li').find('input').val(); 
		var answer_corr = $(this).parent('li').find('input').attr('name') + 'a' + $(this).parent('li').find('input').val(); 
		
		var answer_givn_pre = parseInt($(this).text());
		//answer_slct--;
		var answer_givn = $(this).parent('li').find('input').attr('name') + 'a' + answer_givn_pre; //html corr.
		
		var correct = 0;
		
		if (answer_givn == answer_corr) {
			correct = 1;
			//alert('correct');
		}
		
		sub_question[$(this).parent('li').index()] = [answer_givn, answer_corr, correct]; //do all the checking here --> sub_q arr 5 > 3
		
		var new_button = false;
		
		if ($(this).parent('li').parent('ol').children('a.button'). length > 0) {
			
			new_button = true;
		}
				
		//next step
		if (!$(this).hasClass('selected') && $(this).parent('li').find('label.selected').length == 0) { //nothing selected yet (cannot have prev. been selected)
			//1st selection
			$(this).addClass('selected');
			$(this).css('border', '2px solid #fff');
			
			//button display
			if (!new_button && $(this).parent('li').parent('ol').find('li > input:checked').size() >= 4) {
				$(this).parent('li').parent('ol').append('<a class="button space_top">Einreichen</a>');
			}
			
			//button functionality
			$('form.box > ul > li > h4 > ol > a.button').click(function() {
				
				feedback($(this), sub_question);
				
				//questionsLeft($(this));
				
				//$('.analysis').removeClass('invisible');
			});
			
			
		} else if (!$(this).hasClass('selected') && !$(this).hasClass('finished') && $(this).parent('li').find('label.selected').length > 0 && $('#analysis').hasClass('invisible')) { //something else already selected, this one is not solected and has not been prev. selected //need to check no feedback yet too
			
			//clear other selection (will only be one)
			$(this).parent('li').find('label.selected').addClass('finished');
			$(this).parent('li').find('label.selected').addClass('no-hover');
			$(this).parent('li').find('label.selected').css('border', 'none');
			$(this).parent('li').find('input').prop('checked', false); //? needed
			
			$(this).parent('li').find('label.selected').removeClass('selected');
			
			//$(this).parents('ol').find('li > a.button').remove();
			
			//new selection
			$(this).addClass('selected');	
			$(this).css('border', '2px solid #fff');
			
			//alert($(this).parent('li').parent('ol').find('li > input:checked').size());
			
			//button display
			if (!new_button && $(this).parent('li').parent('ol').find('li > input:checked').size() >= 4) {
				$(this).parent('li').parent('ol').append('<a class="button space_top">Einreichen</a>');
			}
			
			//button functionality
			$('form.box > ul > li > h4 > ol > a.button').click(function() {
				
				//feedback($(this), sub_question); /// ISSUE WHERE TWO FEEDBACKS GET TRIGGERED >> TWO ARROWS <--- this button nec.? -> 5 selctions => button ...
				// come from above if?
				
				//questionsLeft($(this));
				
				//$('.analysis').removeClass('invisible');	
				
			});
		
		} else { //2nd click on label not prev. selected --> feedback
			
			$(this).parent('li').find('input').prop('checked', false); //? needed
			
			if ($('#analysis').hasClass('invisible')) { //need to check no feedback yet too
				//feedback($(this), answer);
				//questionsLeft($(this));
			}
			
	
		}

				
	}
	
	//RE-label
	$('label').on('click', next_fn);
	
	
	
});
