/*http://robssandbox.com/shapes/php/calculatePolygon.php*/

var toDebug = function(s) {
	document.getElementById("debug").innerHTML += s + "<br/>";
}

var getIsRegular = function() {
	var isRegularEle = document.getElementById("isRegular");
	var isRegular = true; if (isRegularEle != null) isRegular = (isRegularEle.checked);
	return isRegular;
}

var getNumVertices = function() {
	var numVerticesEle = document.getElementById("numVertices");
	var numVertices = 3; if (numVerticesEle != null) numVertices = Number(numVerticesEle.value);
	return numVertices;
}
var getDensity = function() {
	var densityEle = document.getElementById("density");
	var density = 1; if (densityEle != null) density = Number(densityEle.value);
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
/*
toDebug("x0=("+roundToDecimals(xyPairs[0].x,0)+","+roundToDecimals(xyPairs[0].y,0)+")"
+" x1=("+roundToDecimals(xyPairs[1].x,0)+","+roundToDecimals(xyPairs[1].y,0)+")"
+ " el="+edgeLength+" angle="+toDegrees(angRads)
+ " v0=("+roundToDecimals(vertex0.x,0)+","+roundToDecimals(vertex0.y,0)+")");
*/
	rotateCoordinate(xyPairs, vertex0, angRads, numVertices);
}

//////////////////////////////////////


var getOneXYpairFromDom = function(vertex) {
	var xEle = document.getElementById("x" + vertex);
	var x = 100 * (vertex + 1); if (xEle != null) x = Number(xEle.value);
	var yEle = document.getElementById("y" + vertex);
	var y = 100;
	if (yEle == null) yEle = document.getElementById("y0");
	if (yEle != null) y = Number(yEle.value);
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

var getOneVectorFromDom = function(vertex) {
	var angleEle = document.getElementById("angle" + vertex);
	var angle = 0; if (angleEle != null) angle = Number(angleEle.value);
	var lengthEle = document.getElementById("length" + vertex);
	var length = 0; if (lengthEle != null) length = Number(lengthEle.value);
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
	var isRegular = getIsRegular();
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

var updatePolygon = function() {
	var numVertices = getNumVertices();
	var xyPairs = getAllXYpairs(numVertices);
	var innerHtml = "";
	innerHtml += "<svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 400 400\">";
	innerHtml += " <polygon points=\"";
	for (var vertex = 0; vertex < numVertices; vertex++) {
		if (vertex > 0) innerHtml += " ";
		innerHtml += "" + roundToDecimals(xyPairs[vertex].x, 2) + "," + roundToDecimals(xyPairs[vertex].y, 2);
	}
	innerHtml += "\"";
	innerHtml += " class=\"fill-red\"";
	innerHtml += " />";
	
	for (var vertex = 0; vertex < numVertices; vertex++) {
		innerHtml += "<text"
			+ " x=\"" + roundToDecimals(xyPairs[vertex].x, 2) + "\""
			+ " y=\"" + roundToDecimals(xyPairs[vertex].y, 2) + "\""
			+ " text-anchor=\"middle\" fill=\"black\" font-size=\"12\""
			+ " >"
			+ "(" + roundToDecimals(xyPairs[vertex].x, 2) + "," + roundToDecimals(xyPairs[vertex].y, 2) + ")"
			+ " </text>";
	}
	
	
	innerHtml += "</svg>";
	
	var polygonEle = document.getElementById("polygon");
	polygonEle.innerHTML = innerHtml;
}

var updatePointsText = function() {
	var numVertices = getNumVertices();
	var xyPairs = getAllXYpairs(numVertices);
	var innerHtml = "";
	
	for (var vertex = 0; vertex < numVertices; vertex++) {
		if (vertex > 0) innerHtml += " ";
		innerHtml += "" + roundToDecimals(xyPairs[vertex].x, 2) + "," + roundToDecimals(xyPairs[vertex].y, 2);
	}
	
	var pointsTextEle = document.getElementById("pointsText");
	pointsTextEle.innerHTML = innerHtml;
}

var getValidDensities = function(numVertices) {
	var primes = [2,3,5,7,11,13,17,19];
	var validPrimes = "1";
	for (i = 0; i < primes.length && primes[i] < numVertices / 2; i++) {
		if (numVertices / primes[i] != Math.round(numVertices / primes[i])) {
			validPrimes += ", " + primes[i];
		}
	}
	return validPrimes;
}

var inputHasNoErrors = function() {
	var errorMsg = "";
	var numVertices = getNumVertices();
	var isRegular = getIsRegular();
	var density = getDensity();
	
	if (isNaN(numVertices) || numVertices < 3) {
		errorMsg = "Vertices must be >= 3";
	} else if ( isRegular ) {
		if (isNaN(density) || density != Math.round(density)) {
			errorMsg = "Density must be a number and one of: " + getValidDensities(numVertices);
		} else if (density < 1) {
			errorMsg = "Density must be >= 1 and one of: " + getValidDensities(numVertices);
		} else if (density >= numVertices / 2) {
			errorMsg = "Density must be less than half the number of vertices and one of: " + getValidDensities(numVertices);
		} else if ( density != 1 ) {
			var primes = [2,3,5,7,11,13,17,19];
			for (var i = 0; i < primes.length && primes[i] < numVertices / 2 && errorMsg == ""; i++) {
				if (   numVertices / primes[i] == Math.round(numVertices / primes[i])
					&& density / primes[i] == Math.round(density / primes[i])) {
						errorMsg = "Density must be one of: " + getValidDensities(numVertices);
					}
			}
			if (errorMsg == "" && numVertices / density == Math.round(numVertices / density)) {
				errorMsg = "Density must be one of: " + getValidDensities(numVertices);
			}
		}
		if (errorMsg == "") {
			var xy0 = getOneXYpairFromDom(0);
			var xy1 = getOneXYpairFromDom(1);
			if (   isNaN(xy0.x) || isNaN(xy0.y)
				|| isNaN(xy1.x) || isNaN(xy0.y)
				|| xy0.x != Math.round(xy0.x) || xy0.y != Math.round(xy0.y)
				|| xy1.x != Math.round(xy1.x) || xy1.y != Math.round(xy1.y)
				|| xy0.x < 0 || xy0.x >= 400 || xy0.y < 0 || xy0.y >= 400
				|| xy1.x < 0 || xy1.x >= 400 || xy1.y < 0 || xy1.y >= 400 ) {
					errorMsg = "Points must be integers in the range (0,0) to (399,399)";
				}
			if (errorMsg == "" && xy0.x == xy1.x && xy0.y == xy1.y) {
				errorMsg = "(x<sub>0</sub>,y<sub>0</sub>) and (x<sub>1</sub>,y<sub>1</sub>) must be different points";
			}
		}
	} else {
		//not regular
	}
	
	var errorMsgEle = document.getElementById("errorMsg");
	errorMsgEle.innerHTML = errorMsg;
	return errorMsg.length == 0;
}

var updatePolygonAndPointsText = function() {
	if (inputHasNoErrors()) {
		updatePolygon();
		updatePointsText();
	}
	return false;
}

var printRegularXyPairsInput = function() {
	var numVertices = getNumVertices();
	xy0 = getOneXYpairFromDom(0);
	xy1 = getOneXYpairFromDom(1);
	var innerHtml = ""
			+ "<div class=\"oneInputWithLabel\">"
			+ "First edge (x<sub>0</sub>, y<sub>0</sub>) to (x<sub>1</sub>, y<sub>1</sub>):<br/>"
			+ "<input type=\"text\""
			+ " class=\"oneInput\""
			+ " id=\"x0\""
			+ " value=\"" + Math.round(xy0.x) + "\""
			+ ">"
			
			+ "<input type=\"text\""
			+ " class=\"oneInput\""
			+ " id=\"y0\""
			+ " value=\"" + Math.round(xy0.y) + "\""
			+ ">"
			+ "<label for=\"y0\">Point (x<sub>0</sub>, y<sub>0</sub>)</label>"
			+ "</div>"
			
			+ "<div class=\"oneInputWithLabel\">"
			+ "<input type=\"text\""
			+ " class=\"oneInput\""
			+ " id=\"x1\""
			+ " value=\"" + Math.round(xy1.x) + "\""
			+ ">"
			
			+ "<input type=\"text\""
			+ " class=\"oneInput\""
			+ " id=\"y1\""
			+ " value=\"" + Math.round(xy1.y) + "\""
			+ ">"
			+ "<label for=\"y1\">Point (x<sub>1</sub>, y<sub>1</sub>)</label>"
			+ "</div>"
			;
	var xyPairsEle = document.getElementById("xyPairsInput");
	xyPairsEle.innerHTML = innerHtml;
}

var printNonRegularXyPairsInput = function() {
	xy0 = getOneXYpairFromDom(0);
	var innerHtml = ""
			+ "<div class=\"oneInputWithLabel\">"
			+ "<input type=\"text\""
			+ " class=\"oneInput\""
			+ " id=\"x0\""
			+ " value=\"" + Math.round(xy0.x) + "\""
			+ ">"
			+ "<input type=\"text\""
			+ " class=\"oneInput\""
			+ " id=\"y0\""
			+ " value=\"" + Math.round(xy0.y) + "\""
			+ ">"
			+ "<label for=\"y0\">Starting point (x<sub>0</sub>, y<sub>0</sub>)"
			+" <br/><em>Note: In the inputs below, 0&deg; is down, 90&deg; is to the left, angles are relative to prior vector.</em>"
			+ "</label>"
			+ "</div>"
			;
	
	var numVertices = getNumVertices();
	var vectors = getVectorsFromDom(numVertices);
	for (var vertex = 0; vertex < numVertices - 1; vertex++) {
		innerHtml += ""
			+ "<div class=\"oneInputWithLabel\">"
			+ "<input type=\"text\""
			+ " class=\"oneInput\""
			+ " id=\"angle" + vertex + "\""
			+ " value=\"" + Math.round(vectors[vertex].angle) + "\""
			+ ">"
			+ "<input type=\"text\""
			+ " class=\"oneInput\""
			+ " id=\"length" + vertex + "\""
			+ " value=\"" + Math.round(vectors[vertex].length) + "\""
			+ ">"
			+ "<label for=\"y0\">Vector (angle<sub>" + vertex + "</sub>&deg;, length<sub>" + vertex + "</sub>)"
			+ "</label>"
			+ "</div>"
			;
	}
	
	var xyPairsEle = document.getElementById("xyPairsInput");
	xyPairsEle.innerHTML = innerHtml;
}

var printXYPairsInput = function() {
	var isRegular = getIsRegular();
	if (isRegular) {
		printRegularXyPairsInput();
	} else {
		printNonRegularXyPairsInput();
	}
}

var printDensityInput = function() {
	var isRegular = getIsRegular();
	var density = getDensity();
	
	var innerHtml = "";
	if (isRegular) {
		innerHtml += ""
			+ "<div class=\"oneInputWithLabel\">"
			+ "<input type=\"text\" class=\"oneInput\" id=\"density\" name=\"density\" value=\"" + density + "\">"
			+ "<label for=\"density\">Density</label>"
			+ "</div>"
			;
	}
	
	var densityEle = document.getElementById("densityInput");
	densityEle.innerHTML = innerHtml;
}

var handleNumVerticesInput = function() {
	printDensityInput();
	printXYPairsInput();
	updatePolygonAndPointsText();
	return false;
}

var handleIsRegularInput = function() {
	printDensityInput();
	printXYPairsInput();
	updatePolygonAndPointsText();
	return false;
}

var handleOnload = function() {
	printDensityInput();
	printXYPairsInput();
	return false;
}