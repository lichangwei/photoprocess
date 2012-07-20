
(function(){

var canvas = $("#canvas")[0];
var context = canvas.getContext("2d");

var img;

$('ul').delegate('button[class]', 'click', function(e){
    if( !img ) return;
    
    var imageData = context.getImageData(0, 0, img.width, img.height);
    var params = [imageData.data, imageData.width, imageData.width];
    var inputs = $(this).prevAll('input');
    for(var i = 0; i < inputs.length; i++){
        params.push( parseInt(inputs[i].value) );
    }
    
    var strings = $.trim(this.className).split('.');
    var object = process;
    var method = strings.pop();
    
    for(var i = 0; i < strings.length; i++){
        if(strings[i]){
            object = object[strings[i]];
        }
        if(!object) break;
    }
    if(object && object[method]){
        object[method].apply(object[method], params)
    }
    context.putImageData(imageData, 0, 0);
    console.log('completed.')
});

$('#refresh').click(function(){
    img = new Image();
    img.src = 'images/len_std.jpg';
    img.onload = function(){
        context.drawImage(img, 0, 0);
        ready = true;
    }
});
$('#refresh').click();

(function(){
    var details = document.createElement('details');
    if(typeof details.open === 'boolean') return;
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'details>*{display:none;}\ndetails[open]>*{display:block;}\ndetails>summary{display:block;}';
    $('head').append(style);
    $('ul').delegate('summary', 'click', function(e){
        var details = this.parentNode;
        if(details.hasAttribute('open')){
            details.removeAttribute('open');
        }else{
            details.setAttribute('open', 'true');
        }
    });
})();

})();
