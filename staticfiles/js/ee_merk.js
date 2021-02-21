$(document).ready(function() {
	
	$("#ee_button").click(function() {
	    var password = "ZUVERSICHT";
	    if($("#ee").val().toUpperCase() !== password) {
	        $("p.analysis").removeClass("invisible");
	    } else {
		    $("p.analysis").addClass("invisible");
	        window.location.href = "https://medcastle.at/turnier/ee"; 
	    }
	});
	
	$("#merk_button").click(function() {
	    var password = "JACK";
	    if($("#merk").val().toUpperCase() !== password) {
	        $("p.analysis").removeClass("invisible");
	    } else {
		    $("p.analysis").addClass("invisible");
	        window.location.href = "https://medcastle.at/turnier/merk"; 
	    }
	});
	
});
	
