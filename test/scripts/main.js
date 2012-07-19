
(function(){

var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");

var ready = false;

var img = new Image();
img.src = 'images/len_std.jpg';
img.onload = function(){
    context.drawImage(img, 0, 0);
    ready = true;
}

var ul = document.getElementsByTagName('ul')[0];
ul.addEventListener('click', function(e){
    if( !ready ) return;
    var method = e.target.className;
    if( !process[method] && !process.blur[method]) return;
    
    var imageData = context.getImageData(0, 0, img.width, img.height);
    var pixels = imageData.data;
    var width = imageData.width;
    var height = imageData.height;
    imageData.data = (process[method] || process.blur[method])(pixels, width, height, 5, 5);
    
    context.putImageData(imageData, 0, 0);
    console.log('completed.')
}, false);
document.addEventListener("selectstart",function(e){ e.preventDefault(); });
document.addEventListener("mousedown",function(e){ e.preventDefault(); });
document.addEventListener("touchmove",function(e){ e.preventDefault(); });

})();
