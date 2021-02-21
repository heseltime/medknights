$(document).ready(function(){
	
	//xml stuff to get stichwoerter ready
	
	//prez
	
	//$('#bio').animate({
	//	marginLeft: "50px",
	//	
	//}, 1000);
	
	$('#fire').animate({
		marginTop: "-30%",
	}, 1000);
	
	$('#bio').attr("checked", true);

	$('#fire').click(function() {
		
		$('#result').fadeTo(0, 0);

		if ($('#bio').prop('checked') == true || $('#chemie').prop('checked') == true || $('#physik').prop('checked') == true || $('#mathe').prop('checked') == true) {
			
			
			
			//if need to hide
			$('#result').addClass('invisible');
			$('#analysis').addClass('invisible');
			
			
			//canon fn
			
			//animation: image fig exchange to run for one cycle?
			//orf use jquery to simulate?
			//then: "ball drop" below page title and stichwort appearance, 'in ball'
			
			//$('#fire').effect('bounce', { distance: 120 }, 'slow'); jquery ui needed, or plugin
			$('#result').removeClass('invisible');
			
			$('#result').animate({
				marginBottom: "400px",
			}, 200);
									
			//determine random stichwort, per selected fach (see above if statement)
			//xml > words
			$.ajax({
				type: "GET",
				url: "/static/js/bms_canon_words.xml",
				dataType: "xml",
				success: xmlParser
			});
			
			function xmlParser(xml) {	
												
				var w = [];
				
				if ($('#bio').prop('checked') == true) {
					$(xml).find('bio > w').each( function(i) {
						w.push($(this).text());
					});
				} 
				
				
				if ($('#physik').prop('checked') == true) {
					$(xml).find('physik > w').each( function(i) {
						w.push($(this).text());
					});
				} 
				
				
				if ($('#chemie').prop('checked') == true) {
					$(xml).find('chemie > w').each( function(i) {
						w.push($(this).text());
					});
				} 
				
				
				if ($('#mathe').prop('checked') == true) {
					$(xml).find('mathe > w').each( function(i) {
						w.push($(this).text());
					});
				} 
				
				var selector = Math.floor(Math.random() * w.length);
				var random_w = w[selector];
				
				$('#result > h2').text(random_w);
							
			}	
			
			$('#result').fadeTo('fast', 1);
			
			
		} else {
			$('#analysis').removeClass('invisible');
		}
		

	});
	
	
	
});
