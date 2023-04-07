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
	WA_RefreshEditor();
}
let WA_WatermarkFileNameList = [];
function WA_ImportWatermarkList(){
	var WA_WatermarkFileNameList_Raw = document.getElementById("form_WA_WatermarkFileNameList").value;
	WA_WatermarkFileNameList = WA_WatermarkFileNameList_Raw.split(" ");
	close_Subwindow("ImportWatermarkNames");
	
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
	if (keysPressed_WA['Shift'] && event.key == 'ArrowLeft') {
		WA_FI_ChangeImagePreviewSource_Shortcut('Left');
	}
	if (keysPressed_WA['Shift'] && event.key == 'ArrowRight') {
		WA_FI_ChangeImagePreviewSource_Shortcut('Right');
	}
	if (keysPressed_WA['Control'] && event.key == 'Shift') {
		WA_FI_AddToFilteredList();
	}
	
	
	
	
	
});

document.addEventListener('keyup', (event) => {
	delete keysPressed[event.key];
});

function WA_RefreshEditor(){
	var WA_Sidebar_List_ImageNames = document.getElementById("WA_Sidebar_List_ImageNames");
	while (WA_Sidebar_List_ImageNames.firstChild){
		WA_Sidebar_List_ImageNames.removeChild(WA_Sidebar_List_ImageNames.lastChild);
	}
	WA_GenerateFileList();
	
	var WA_FI_ImageGrid = document.getElementById("pageElement_WA_FI_ImageGrid");
	while (WA_FI_ImageGrid.firstChild){
		WA_FI_ImageGrid.removeChild(WA_FI_ImageGrid.lastChild);
	}
	WA_FI_Generator_Render_Grid();
}


function WA_FI_Generator_Render_Grid(){
	for (a = 0; a < WA_FileNameList.length; a++){
	var WA_FI_ImageGrid_Item = document.createElement('div');
	WA_FI_ImageGrid_Item.setAttribute("id", WA_FileNameList[a]);
	WA_FI_ImageGrid_Item.classList.add("WA_FI_ImageGrid_Item");
	WA_FI_ImageGrid_Item.setAttribute("onclick", "WA_FI_ChangeImagePreviewSource(this.id)");
	document.getElementById("pageElement_WA_FI_ImageGrid").appendChild(WA_FI_ImageGrid_Item);
	
	var WA_FI_ImageGrid_Item_Image = document.createElement('img');
	WA_FI_ImageGrid_Item_Image.setAttribute("src", "Assets/Images/Watermark_Applier/Images/"+WA_FileNameList[a]);
	WA_FI_ImageGrid_Item_Image.setAttribute("loading", "lazy");
	WA_FI_ImageGrid_Item_Image.classList.add("WA_FI_ImageGrid_Item_Image");
	document.getElementById(WA_FileNameList[a]).appendChild(WA_FI_ImageGrid_Item_Image);
	}
}

var WA_FI_CurrentlySelectedItem_Index;

function WA_FI_ChangeImagePreviewSource(FileName){
	document.getElementById("pageElement_WA_FI_ImagePreview").src = "Assets/Images/Watermark_Applier/Images/"+FileName;
	for (a = 0; a < document.querySelectorAll(".WA_FI_ImageGrid_Item").length; a++){
		if (document.querySelectorAll(".WA_FI_ImageGrid_Item")[a].style.backgroundColor != "green"){
			document.querySelectorAll(".WA_FI_ImageGrid_Item")[a].style.backgroundColor = "var(--BGColor-Menus)";
		}
	}
	if (document.getElementById(FileName).style.backgroundColor != "green"){
		document.getElementById(FileName).style.backgroundColor = "var(--Accent-Color)";
	}
	WA_FI_CurrentlySelectedItem_Index = WA_FileNameList.indexOf(FileName);
}

function WA_FI_ChangeImagePreviewSource_Shortcut(Direction){
	if (Direction == 'Left'){
		if (WA_FileNameList[WA_FI_CurrentlySelectedItem_Index - 1] != null || WA_FileNameList[WA_FI_CurrentlySelectedItem_Index - 1] != undefined){
			WA_FI_ChangeImagePreviewSource(WA_FileNameList[WA_FI_CurrentlySelectedItem_Index - 1]);
		}
		} else if (Direction == 'Right'){
		if (WA_FileNameList[WA_FI_CurrentlySelectedItem_Index + 1] != null || WA_FileNameList[WA_FI_CurrentlySelectedItem_Index + 1] != undefined){
			WA_FI_ChangeImagePreviewSource(WA_FileNameList[WA_FI_CurrentlySelectedItem_Index + 1]);
		}
	}
}

var WA_FI_FilteredImages = [];
function WA_FI_AddToFilteredList(){
	console.log(WA_FI_FilteredImages);
	if (document.getElementById(WA_FileNameList[WA_FI_CurrentlySelectedItem_Index]).style.backgroundColor != "green"){
		WA_FI_FilteredImages.push(WA_FileNameList[WA_FI_CurrentlySelectedItem_Index]);
		document.getElementById(WA_FileNameList[WA_FI_CurrentlySelectedItem_Index]).style.backgroundColor = "green";
		console.log(WA_FI_FilteredImages);
		} else {
		WA_FI_FilteredImages.splice(WA_FI_FilteredImages.indexOf(WA_FileNameList[WA_FI_CurrentlySelectedItem_Index]), 1);
		document.getElementById(WA_FileNameList[WA_FI_CurrentlySelectedItem_Index]).style.backgroundColor = "var(--Accent-Color)";
		console.log(WA_FI_FilteredImages);
	}
	WA_FI_RefreshFilteredList();
}

function WA_FI_RefreshFilteredList(){
	var WA_FI_FilteredList = document.getElementById("pageElement_WA_FI_FilteredList");
	while (WA_FI_FilteredList.firstChild){
		WA_FI_FilteredList.removeChild(WA_FI_FilteredList.lastChild);
	}
	
	for (a = 0; a < WA_FI_FilteredImages.length; a++){
		var WA_FI_FilteredList_Item = document.createElement('div');
		WA_FI_FilteredList_Item.innerHTML = WA_FI_FilteredImages[a];
		WA_FI_FilteredList_Item.classList.add("WA_FI_Container_FilteredList_Item");
		document.getElementById("pageElement_WA_FI_FilteredList").appendChild(WA_FI_FilteredList_Item);
	}
}

function WA_FI_CommitFilterChanges(){
	close_Subwindow('ConfirmFilterCommit');
	if (WA_FI_FilteredImages.length >= 1){
		var WA_FI_FilteredList_Concatenated = WA_FI_FilteredImages.join(" ");
		document.getElementById("form_WA_FileNameList").value = WA_FI_FilteredList_Concatenated;
		WA_ImportFileList();
		WA_FI_FilteredImages = [];
		WA_FI_RefreshFilteredList();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const fileInput = document.getElementById("file-input");
	const uploadedImage = document.getElementById("pageElement_WA_FI_ImagePreview");
	WA_FileNameList = []; // Create an array to store the URLs of the selected files
	fileInput.addEventListener("change", (event) => {
		WA_FileNameList.length = 0; // Clear the existing file contents
		
		for (const file of event.target.files) {
			const reader = new FileReader();
			
			reader.addEventListener("load", () => {
				const fileURL = reader.result;
				WA_FileNameList.push(fileURL);
			});
			
			reader.readAsDataURL(file);
		}
	});
});

/* function WA_FI_Generator_Render_Grid() {
	for (const fileName of WA_FileNameList) {
        const imageGridItem = document.createElement('div');
        imageGridItem.setAttribute("id", fileName);
        imageGridItem.classList.add("WA_FI_ImageGrid_Item");
        imageGridItem.setAttribute("onclick", "WA_FI_ChangeImagePreviewSource(this.id)");
        document.getElementById("pageElement_WA_FI_ImageGrid").appendChild(imageGridItem);

        const imageGridItem_Image = document.createElement('img');
        imageGridItem_Image.setAttribute("src", fileName);
        imageGridItem_Image.setAttribute("loading", "lazy");
        imageGridItem_Image.classList.add("WA_FI_ImageGrid_Item_Image");
        imageGridItem.appendChild(imageGridItem_Image);
    }
} */

/* function WA_FI_ChangeImagePreviewSource(FileName){
    document.getElementById("pageElement_WA_FI_ImagePreview").src = encodeURIComponent(FileName);
    for (a = 0; a < document.querySelectorAll(".WA_FI_ImageGrid_Item").length; a++){
        if (document.querySelectorAll(".WA_FI_ImageGrid_Item")[a].style.backgroundColor != "green"){
            document.querySelectorAll(".WA_FI_ImageGrid_Item")[a].style.backgroundColor = "var(--BGColor-Menus)";
        }
    }
    if (document.getElementById(FileName).style.backgroundColor != "green"){
        document.getElementById(FileName).style.backgroundColor = "var(--Accent-Color)";
    }
    WA_FI_CurrentlySelectedItem_Index = WA_FileNameList.indexOf(FileName);
} */
/* document.addEventListener("DOMContentLoaded", () => {
	const fileInput = document.getElementById("file-input");
	const uploadedImage = document.getElementById("pageElement_WA_FI_ImagePreview");
	var fileNames = WA_FileNameList;
	fileInput.addEventListener("change", (event) => {
	fileNames.length = 0; // Clear the existing file contents
	
	for (const file of event.target.files) {
	const reader = new FileReader();
	
	reader.addEventListener("load", () => {
	fileNames.push(reader.result);
	});
	
	reader.readAsDataURL(file);
	}
	});
}); */

/* function WA_OpenNewTab(){
	var url = document.getElementById("pageElement_WA_OutputContainer").getAttribute('src');
	window.open(url, 'Image', 'width=auto, height=auto, resizable=1');
} */
