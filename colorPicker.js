(function() {
	function rgbaToHex(rgba) {
		function checkLength(color) {
			return  color.length === 1 ? "0" + color: color;
		}
		rgba = rgba.replace(/rg(ba|b)|\(|\)|\s/gi, "").split(",")
		let hex = '#';
		const redColor = checkLength(Number(rgba[0]).toString(16));
		const greenColor = checkLength(Number(rgba[1]).toString(16));
		const blueColor = checkLength(Number(rgba[2]).toString(16));
		const opacity = rgba[3] !== undefined ? (Math.round((parseFloat(rgba[3])) * 255)).toString(16).substr(0,2) : false;
		if (!opacity){
			hex += redColor + greenColor + blueColor;
		}else{
			hex += redColor + greenColor + blueColor + opacity;
		}
		return hex
	}
	function hextToRgba(hex){
		hex = hex.slice(1,hex.length)
				.match(/.{2}/ig);
		const redHex = parseInt(hex[0],16);
		const greenHex = parseInt(hex[1],16);
		const blueHex = parseInt(hex[2],16);
		const opacity = hex[3] !== undefined ? parseInt(hex[3],16) / 255: false;
		if (opacity === 1 || !opacity) {
			return `rgb(${redHex},${greenHex},${blueHex})`;
		}else if (!!opacity){
			return `rgba(${redHex},${greenHex},${blueHex},${opacity.toFixed(2)})`;
		}
	}
	/* All Element Ranges */
	const redSlider = document.getElementById("redSlider")
	const blueSlider = document.getElementById("blueSlider")
	const greenSlider = document.getElementById("greenSlider")
	const alphaSlider = document.getElementById("alphaSlider")

	/* All Text Input */
	const redText = redSlider.previousElementSibling;
	const blueText = blueSlider.previousElementSibling;
	const greenText = greenSlider.previousElementSibling;
	const alphaText = alphaSlider.previousElementSibling;

	/* Result Value */
	
	const resultValue = document.querySelector(".result .resultValue")
	let red,blue,green,alpha,isHex = false;
	/* All Text Slider functions*/
	function _redSlider() {
		redText.value = this.value
		red = this.value
		resultColor()
	}
	function _greenSlider() {
		greenText.value = this.value
		green = this.value
		resultColor()
	}
	function _blueSlider() {
		blueText.value = this.value
		blue = this.value
		resultColor()
	}
	function _alphaSlider() {
		alphaText.value = this.value
		alpha = this.value;
		resultColor()
	}
	
	function resultColor () {
		const result = document.querySelector(".result")
		const isRGBA = alpha < 100 ? true: false;
		let resultOfColor = null;
		if (isRGBA) {
			resultOfColor = `rgba(${red},${green},${blue},0.${alpha})`;
			if (alpha == 0) {
				resultOfColor = `rgba(${red},${green},${blue},${alpha})`;
			}
		} else {
			resultOfColor = `rgb(${red},${green},${blue})`;
		}
		if (isHex){
			resultOfColor = rgbaToHex(resultOfColor);
		}
		resultValue.innerHTML = resultOfColor;
		result.style.background = resultOfColor;
	}
	// Initialize the Value in refresh//
	_blueSlider.apply(blueSlider);
	_alphaSlider.apply(alphaSlider);
	_redSlider.apply(redSlider);
	_greenSlider.apply(greenSlider);
	resultColor();
	// -------------------------------//
	
	redSlider.addEventListener("input", _redSlider);
	greenSlider.addEventListener("input", _greenSlider);
	blueSlider.addEventListener("input", _blueSlider);
	alphaSlider.addEventListener("input", _alphaSlider);
	
	function changeType() {
		if (!isHex){
			resultValue.innerHTML = rgbaToHex(resultValue.innerHTML)
			this.innerHTML = "RGB";
			isHex = true;
			return;
		}
		resultValue.innerHTML = hextToRgba(resultValue.innerHTML)
		this.innerHTML = "Hex"
		return isHex = false;
	}
	
	const typeChanger = document.getElementById('typeChanger');
	typeChanger.addEventListener("click",changeType);
	
	function copyValue(){
		const range = document.createRange()
		range.selectNode(resultValue)
		window.getSelection().removeAllRanges()
		window.getSelection().addRange(range)
		document.execCommand("copy")
		window.getSelection().removeAllRanges()
	}
	
	const copyBtn = document.getElementById('copyBtn');
	copyBtn.addEventListener("click",copyValue);
	(function() { // Create a transparent table
		const rows = 5;
		const columns = 36;
		let row = '<tr>'
		let cols = ''
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				cols += `<td></td>`;
			}
			row += cols + "</tr>";
			cols = ""
		}
		const transparentTable = document.getElementById('transparent-table')
		transparentTable.innerHTML = row;
	})();
})();