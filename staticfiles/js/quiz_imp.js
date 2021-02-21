$('form.box').ready(function(){
	
	var total_qs;
	
	//initial creation of ul for words
	function next_qs(q) {
		for (i = 0; i < q; i++) {
			$('form.box > ul > li:first').clone().appendTo($('form.box > ul'));
		}
		
		total_qs = q + 1;
		
	}
	
	next_qs(9);
	
	//GLOBALS
	var SYSTEMS_TOTAL = 3;//work from book and compl.
	var E_PROBABILITY = 0.2;
	
	//txt > statement words in touples
	var statement_words = [];
	
	$.get("/static/js/quiz_imp_statements.txt", function(data) {
		
		var str = data.split('\n');
		
		var ran_no_used = [];
		
		
		
		for (i = 0; i < total_qs; i++) {
			var ran_no, ran_no_2, ran_no_3;
			
			ran_no = Math.floor((Math.random() * str.length));
		
			while (ran_no_used.includes(ran_no)) {
				ran_no = Math.floor((Math.random() * str.length));
			}
			
			ran_no_used.push(ran_no);
			
			
			ran_no_2 = Math.floor((Math.random() * str.length));
			
			while (ran_no_used.includes(ran_no_2)) {
				ran_no_2 = Math.floor((Math.random() * str.length));
			}
			
			ran_no_used.push(ran_no_2);
			
			ran_no_3 = Math.floor((Math.random() * str.length));
			
			while (ran_no_used.includes(ran_no_3)) {
				ran_no_3 = Math.floor((Math.random() * str.length));
			}
			
			ran_no_used.push(ran_no_3);
						
			statement_words[i] = [str[ran_no], str[ran_no_2], str[ran_no_3]];
			
			
		}
		
		selector_fn();
				
	});
	
	
	
	//random impl systems selection
	var systems = [];
	
	var selector;
	
	for (i = 0; i < total_qs; i++) {
		
		selector = Math.floor(Math.random() * SYSTEMS_TOTAL);
		
		//while (systems.includes(selector)) {
		//	selector = Math.floor((Math.random() * SYSTEMS_TOTAL));
		//}
		
		systems.push(selector);
		
	}
	
	function populator(imp_objs) {
		
		//li element >> obj.algo etc
		for (i = 0; i < imp_objs.length; i++) {
			
			//gesucht			
			$('form.box > ul > li:nth-child(' + (i + 1) + ') > h2').html(imp_objs[i].p1 + '<br />' + imp_objs[i].p2);
			
			//sol
			$('form.box > ul > li:nth-child(' + (i + 1) + ') > p.analysis').text(imp_objs[i].analysis);
			
			//options
			var random_placement = Math.floor(Math.random() * 4); //random placement 0 thru 3	
			//var possible_placements = [];
			var ran_false_1 = false;
			var ran_false_2 = false;
			var close_false = false;
			
			for (j = 0; j < 4; j++) { //cycle thry li options == 5
				
				if (j == random_placement) {
					$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(imp_objs[i].q); //correct one
					
					if (!imp_objs[i].e) {
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > input').val(1); //set val
						
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > input').next().append('<i class="fas fa-arrow-left invisible"></i>'); //needed?!
						
					} else {
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + 5 + ') > input').val(1); //set e
						
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + 5 + ') > input').next().append('<i class="fas fa-arrow-left invisible"></i>'); //needed?!
						
					}
					
					
					//possible_placements.push(j);
				} else {
					
					if (!ran_false_1 && !ran_false_2 && !close_false) { //no others set
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(imp_objs[i].q_f1);
						
						ran_false_1 = true;
					} else if (!ran_false_2 && !close_false) { //try get close false near corr.
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(imp_objs[i].q_f2);
						
						close_false = true;
					} else { //last option
						$('form.box > ul > li:nth-child(' + (i + 1) + ') > h4 > ol > li:nth-child(' + (j + 1) + ') > label > b').text(imp_objs[i].q_f3);
						
						ran_false_2 = true;
					}
						
					
					//possible_placements.push(j);
					
				}
				
			}
			
		}
		
		
	}
	
	//selector, callback from ajax --> populator
	function selector_fn() {
		var imp_objs = [];
		
		for (i = 0; i < total_qs; i++) {
			
			switch (systems[i]) {
				
				case 0:
					var imp_obj = {'q': 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][0]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][1] + ' sind ' + statement_words[i][2];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					
					imp_obj['q_f2'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					
					imp_obj['q_f3'] = 'Einige ' + statement_words[i][0] + ' sind ' + statement_words[i][2];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Einige ' + statement_words[i][1] + ' sind ' + statement_words[i][2];
					}
					
					
					break;
					
					
				case 1:
					var imp_obj = {'q': 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][1]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					
					imp_obj['q_f2'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][2];
					
					imp_obj['q_f3'] = 'Einige ' + statement_words[i][1] + ' sind ' + statement_words[i][2];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Alle ' + statement_words[i][1] + ' sind ' + statement_words[i][2];
					}
					
					
					break;
					
					
				case 2:
					var imp_obj = {'q': 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][0]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					
					imp_obj['q_f2'] = 'Alle ' + statement_words[i][1] + ' sind keine ' + statement_words[i][2];
					
					imp_obj['q_f3'] = 'Einige ' + statement_words[i][1] + ' sind keine ' + statement_words[i][0];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					}
					
					
					break;
					
				case 3:
					var imp_obj = {'q': 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Einige ' + statement_words[i][0] + ' sind keine ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][2];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					
					imp_obj['q_f2'] = 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					imp_obj['q_f3'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					}
					
					
					break;
					
				case 4:
					var imp_obj = {'q': 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][0]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][1] + ' sind keine ' + statement_words[i][2];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					
					imp_obj['q_f2'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][0];
					
					imp_obj['q_f3'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					}
					
					
					break;
					
				case 5:
					var imp_obj = {'q': 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][0]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					
					imp_obj['q_f2'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][0];
					
					imp_obj['q_f3'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					}
					
					
					break;
					
				case 6:
					var imp_obj = {'q': 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind keine ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					
					imp_obj['q_f2'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					imp_obj['q_f3'] = 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][0];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					}
					
					
					break;
					
				case 7:
					var imp_obj = {'q': 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][0]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind keine ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					
					imp_obj['q_f2'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					imp_obj['q_f3'] = 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][0];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					}
					
					
					break;
					
				case 8:
					var imp_obj = {'q': 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][1]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][2];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					
					imp_obj['q_f2'] = 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					imp_obj['q_f3'] = 'Alle ' + statement_words[i][1] + ' sind keine ' + statement_words[i][2];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					}
					
					
					break;
					
					
				case 9:
					var imp_obj = {'q': 'Einige ' + statement_words[i][2] + ' sind ' + statement_words[i][1]};
					
					imp_obj['analysis'] = imp_obj['q']; //!
					
					imp_obj['p1'] = 'Alle ' + statement_words[i][0] + ' sind ' + statement_words[i][1];
					imp_obj['p2'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][0];
					
					
					//(E_PROBABILITY * 100)% chance it's e --> no correct solution --> pass to populator
					var e_conting = false;
					imp_obj['e'] = false;
					
					if (Math.random() < E_PROBABILITY) {
						e_conting = true;
						imp_obj['e'] = true;
					}
					
					//complexify: would be to mnake f[] of 6 or so wrong statements --> ranomize false selections
					imp_obj['q_f1'] = 'Alle ' + statement_words[i][2] + ' sind ' + statement_words[i][1];
					
					imp_obj['q_f2'] = 'Alle ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					
					imp_obj['q_f3'] = 'Alle ' + statement_words[i][1] + ' sind keine ' + statement_words[i][2];
					
					
					if (e_conting) { //no q correct: q reset to false
						imp_obj['q'] = 'Einige ' + statement_words[i][2] + ' sind keine ' + statement_words[i][1];
					}
					
					
					break;
					
			}
			
			imp_objs.push(imp_obj);
		}
		
		populator(imp_objs);
	}
		
	
	
	
	//**----------------------**//
	
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
