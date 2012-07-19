(function(){

var process = window.process = {};

process.gray = function(pixels){
    for(var i = 0; i < pixels.length; i+=4){
        var gray = pixels[i]*0.299 + pixels[i+1]*0.587 + pixels[i+2]*0.114;
        pixels[i] = pixels[i+1] = pixels[i+2] = gray;
    }
}

process.invert = function(pixels){
    for(var i = 0; i < pixels.length; i+=4){
        pixels[i] = 255 - pixels[i];
        pixels[i+1] = 255 - pixels[i+1];
        pixels[i+2] = 255 - pixels[i+2];
    }
}

process.opacity = function(pixels, opacity){
    for(var i = 0; i < pixels.length; i+=4){
        if(i===100)console.log(pixels[i+3])
        pixels[i+3] = opacity;
    }
}

process.dodge = function(pixels, mix){
    for(var i = 0; i < pixels.length; i+=4){
        pixels[i] += pixels[i] * mix[i] / (255-mix[i]);
        pixels[i+1] += pixels[i+1] * mix[i+1] / (255 - mix[i+1]);
        pixels[i+2] += pixels[i+2] * mix[i+2] / (255 - mix[i+2]);
    }
}

process.blur = {};
process.blur.box = function(pixels, width, height, x, y){
    var num = (2*x+1) * (2*y+1);
    var copy = pixels.subarray(0);
    
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            
            var box = [0, 0, 0];
            for(var k = i-y; k < i+y; k++){
                if(k<0 || k>=height) continue;
                
                for(var l = j-x; l < j+x; l++){
                    if(l<0 || l>=width) continue;
                    
                    var index = (k*width + l) *4;
                    box[0] += copy[index];
                    box[1] += copy[index+1];
                    box[2] += copy[index+2];
                }
            }
            index = (i*width + j) *4;
            pixels[index] = parseInt(box[0] / num);
            pixels[index+1] = parseInt(box[1] / num);
            pixels[index+2] = parseInt(box[2] / num);
        }
    }
    console.log(pixels.subarray(240000))
}


})();
