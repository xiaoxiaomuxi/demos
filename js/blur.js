var canvaswidth=600;
var canvasheight=450;


var canvas=document.getElementById('canvas');
var context=canvas.getContext("2d");

canvas.width=canvaswidth;
canvas.height=canvasheight;

var image=new Image();
var clippingRegion={x:400,y:200,r:50}
image.src='../images/tara/pic2.jpg'
image.onload=function(){
	initcanvas();
}
function initcanvas(){
	draw(image,clippingRegion)
}
function setclippingRegion(clippingRegion){
	context.beginPath()
	context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false)
	context.clip()
}



function draw(image,clippingRegion){
	context.clearRect(0,0,canvas.width,canvas.height)
	context.save()
	setclippingRegion(clippingRegion)
	context.drawImage(image,0,0)
	context.restore()
}
