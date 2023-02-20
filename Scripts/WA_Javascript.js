/* html2canvas(document.querySelector("#divContainer"),{scale:2}).then(canvas => {document.body.appendChild(canvas);
	canvas.toBlob(function(blob){
	var url = URL.createObjectURL(blob);
	var a = document.createElement('a');
	a.href = url;
	a.download = 'image.png';
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
	}, 'image/png');
}); */

// Define the function 
// to screenshot the div
var WA_ImageClientWidth;
var WA_ImageClientHeight;
var WA_ImageClientWidth_Scaled;
var WA_ImageClientHeight_Scaled;
function resetContainerDimensions(){
	WA_ImageClientWidth = document.getElementById("WA_Image").clientWidth;
	WA_ImageClientHeight = document.getElementById("WA_Image").clientHeight;
	document.getElementById("pageElement_WA_ImageContainer").style.width = WA_ImageClientWidth;
	document.getElementById("pageElement_WA_ImageContainer").style.height = WA_ImageClientHeight;
}
/* document.addEventListener('DOMContentLoaded', function(){
	WA_ImageClientWidth = document.getElementById("WA_Image").clientWidth;
	document.getElementById("pageElement_WA_MainContainer").style.width = WA_ImageClientWidth;
}); */
function WA_TakeScreenshot() { //OLD - HTML2CANVAS
	// WA_ImageClientWidth_Scaled = WA_ImageClientWidth*2;
	// WA_ImageClientHeight_Scaled = WA_ImageClientHeight*2;
	// document.getElementById("TESTDIV").style.width = WA_ImageClientWidth_Scaled;
	// document.getElementById("TESTDIV").style.height = WA_ImageClientHeight_Scaled;
	// document.getElementById("WA_Watermark").style.width = WA_ImageClientWidth_Scaled;
	trigger_createToast("WA_ProcessingImage");
	// document.getElementById('test').style.marginTop = "-10px";
	let div = document.getElementById('TESTDIV');
	html2canvas(div).then(
		function (canvas) {
			canvas.setAttribute("id", "WA_OutputImage");
			document.getElementById('OUTPUT').appendChild(canvas);
			canvas.onload = trigger_createToast("WA_ProcessingFinished");
			document.getElementById("WA_Image").style.width = WA_ImageClientWidth;
			document.getElementById("WA_Watermark").style.width = WA_ImageClientWidth;
		})
		document.getElementById('test').style.display = "none";
		
		// document.getElementById('WA_Watermark').style.display = "none";
}

/* window.onload = function(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.src = 'Assets/Images/sample2.png';
	
	img.onload = function() {
	ctx.drawImage(img, 0, 0);
	}
	
} */

function WA_ChangeImage(){
	var ImageSource = document.getElementById("form_WA_ImageSource").value;
	document.getElementById("WA_Image").src = "Assets/Images/Watermark_Applier/Images/"+ImageSource;
	// document.getElementById("WA_Image").style.transform = "scale(1.1)";
	WA_ImageClientWidth = document.getElementById("WA_Image").clientWidth;
	document.getElementById("pageElement_WA_FileName").innerHTML = WA_FileName;
	close_Subwindow("ChangeImageFile");
}

function WA_ChangeWatermark(){
	var ImageSource = document.getElementById("form_WA_WatermarkSource").value;
	document.getElementById("WA_Watermark").src = "Assets/Images/Watermark_Applier/Watermarks/"+ImageSource;
	// document.getElementById("WA_Watermark").style.transform = "scale(1.1)";
	WA_ImageClientHeight = document.getElementById("WA_Watermark").clientHeight;
	close_Subwindow("ChangeWatermarkFile");
}

function WA_Reset(){
	
	var OutputElement = document.getElementById("OutputImage");
	if (OutputElement != null){
		OutputElement.remove();
	}
	document.getElementById('pageElement_WA_ImageContainer').style.opacity = "100%";
	var WA_ImageClientWidth = document.getElementById("pageElement_WA_ImageContainer").clientWidth;
	// WA_ImageClientHeight = document.getElementById("WA_Image").clientHeight;
	// document.getElementById("TESTDIV").style.width = WA_ImageClientWidth;
	resetContainerDimensions();
}

function generateImage(){
	trigger_createToast("WA_ProcessingImage");
	var WA_ImageClientWidth = document.getElementById("WA_Image").style.clientWidth;
	var WA_ImageClientHeight = document.getElementById("WA_Image").style.clientHeight;
	document.getElementById("pageElement_WA_ImageContainer").style.width = WA_ImageClientWidth;
	document.getElementById("pageElement_WA_ImageContainer").style.height = WA_ImageClientHeight;
	var scale = 2;
	domtoimage.toPng(document.getElementById('pageElement_WA_ImageContainer'), {
		width: WA_ImageClientWidth,
		height: WA_ImageClientHeight,
		style: {
			'width': WA_ImageClientWidth * scale,
			'height': WA_ImageClientHeight * scale
		}
		}).then(function(data) {
		var img = new Image();
		img.setAttribute('id', 'OutputImage');
		document.getElementById('pageElement_WA_OutputContainer').appendChild(img);
		document.getElementById("pageElement_WA_ImageContainer").style.opacity = "0%";
		img.src = data;
		img.onload = trigger_createToast("WA_ProcessingFinished");
	})
}

let WA_FileNameList = [];
function WA_ImportFileList(){
	var WA_FileNameList_Raw = document.getElementById("form_WA_FileNameList").value;
	WA_FileNameList = WA_FileNameList_Raw.split(" ");
	console.log(WA_FileNameList);
	WA_GenerateFileList();
}
let WA_WatermarkFileNameList = [];
function WA_ImportWatermarkList(){
	var WA_WatermarkFileNameList_Raw = document.getElementById("form_WA_WatermarkFileNameList").value;
	WA_WatermarkFileNameList = WA_WatermarkFileNameList_Raw.split(" ");
	close_Subwindow("ImportWatermarkNames");
	WA_GenerateWatermarkFileList();
}
function WA_GenerateFileList(){
	for (a = 0; a < WA_FileNameList.length; a++){
		var WA_FileList_Item = document.createElement('p');
		WA_FileList_Item.classList.add("WA_Sidebar_ImageName");
		WA_FileList_Item.innerHTML = WA_FileNameList[a];
		WA_FileList_Item.setAttribute("id", a);
		WA_FileList_Item.setAttribute("onclick", "WA_Sidebar_ChangeImage(this.id)");
		document.getElementById("WA_Sidebar_List_ImageNames").appendChild(WA_FileList_Item);
	}
}

function WA_GenerateWatermarkFileList(){
	for (a = 0; a < WA_WatermarkFileNameList.length; a++){
		var WA_FileList_Item = document.createElement('p');
		WA_FileList_Item.classList.add("WA_Sidebar_ImageName");
		WA_FileList_Item.innerHTML = WA_WatermarkFileNameList[a];
		WA_FileList_Item.setAttribute("id", a);
		WA_FileList_Item.setAttribute("onclick", "WA_Sidebar_ChangeWatermarkImage(this.id)");
		document.getElementById("WA_Sidebar_List_WatermarkNames").appendChild(WA_FileList_Item);
	}
}

function WA_Sidebar_ChangeWatermarkImage(id){
	var WA_FileName = WA_WatermarkFileNameList[id];
	document.getElementById("WA_Watermark").src = "Assets/Images/Watermark_Applier/Watermarks/"+WA_FileName;
	close_Subwindow("ChangeWatermarkFile");
}

var WA_FileNameList_CurrentAccessedItem;
function WA_Next_Image(){
	WA_FileNameList_CurrentAccessedItem++;
	WA_Reset();
	WA_Sidebar_ChangeImage(WA_FileNameList_CurrentAccessedItem);
}

function WA_Previous_Image(){
	WA_FileNameList_CurrentAccessedItem--;
	WA_Reset();
	WA_Sidebar_ChangeImage(WA_FileNameList_CurrentAccessedItem);
}

function WA_Sidebar_ChangeImage(id){
	WA_Reset();
	var WA_FileName = WA_FileNameList[id];
	WA_FileNameList_CurrentAccessedItem = id;
	document.getElementById("WA_Image").src = "Assets/Images/Watermark_Applier/Images/"+WA_FileName;
	document.getElementById("pageElement_WA_FileName").innerHTML = WA_FileName;
	resetContainerDimensions();
}

function WA_Sidebar_ChangeTab(page){
	if (page == "1"){
		document.getElementById("WA_Sidebar_List_ImageNames").style.display = "block";
		document.getElementById("WA_Sidebar_List_WatermarkNames").style.display = "none";
		} else {
		document.getElementById("WA_Sidebar_List_ImageNames").style.display = "none";
		document.getElementById("WA_Sidebar_List_WatermarkNames").style.display = "block";
	}
}

var node = document.getElementById('TESTDIV');

function WA_SetWatermarkToTop(){
	document.getElementById("WA_Watermark").style.bottom = null;
}

function WA_SetWatermarkToBottom(){
	document.getElementById("WA_Watermark").style.bottom = "0px";
}

/* domtoimage.toPng(node)
    .then(function (dataUrl) {
	var img = new Image();
	img.src = dataUrl;
	document.body.appendChild(img);
    })
    .catch(function (error) {
	console.error('oops, something went wrong!', error);
}); */

let keysPressed_WA = {}; 
document.addEventListener('keydown', (event) => {
	keysPressed_WA[event.key] = true;

	if (keysPressed_WA['Control'] && event.key == '/') {
		WA_Next_Image();
	}
	if (keysPressed_WA['Control'] && event.key == '.') {
		WA_Previous_Image();
	}
	if (keysPressed_WA['Control'] && event.key == 'ArrowUp') {
		WA_SetWatermarkToTop();
	}
	if (keysPressed_WA['Control'] && event.key == 'ArrowDown') {
		WA_SetWatermarkToBottom();
	}
	

	

	

});

document.addEventListener('keyup', (event) => {
	delete keysPressed[event.key];
});