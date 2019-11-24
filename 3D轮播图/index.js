
var oImg = document.getElementsByTagName('img');
// console.log(oImg);
var len = oImg.length;
// console.log(len);
//默认中间大图
var curDispaly = 0;
var timer;
function init(){
    //图片展示
    show();
    //鼠标点击事件
    bindEvent();
    //轮播图
    play();
    
}
init();

//图片展示
function show(){
    var mLen = Math.floor(len / 2);
    // console.log(mLen);
    var lindex, rindex;
    for(i = 0;i < mLen; i++){
        lindex = len + curDispaly - i - 1;
        //lindex=4,3
        if(lindex > len - 1){
            lindex -= len;
        }
        oImg[lindex].style.transform = 'translateX(' + (-150*(i+1))+ 'px) rotateY(30deg)';
        // console.log(lindex);

        rindex = curDispaly + i + 1;
        if(rindex > len - 1){
            rindex -= len;
        }
        oImg[rindex].style.transform = 'translateX(' + (150*(i+1))+ 'px) rotateY(-30deg)';
        console.log(rindex);
        //rindex = 1,2
    }
    oImg[curDispaly].style.transform = 'translateZ(150px)';
}
//鼠标点击事件
function bindEvent(){
    for(i = 0; i < len; i++){
        //立即执行函数,解除闭包
        (function(i){
            oImg[i].onclick = function(){
                console.log(i);
                curDispaly = i;
                show();
            }
            oImg[i].onmouseenter = function(){
                clearInterval(timer);
            }
            oImg[i].onmouseleave = function(){
                play();
            }
        })(i);
    }
}
//轮播图
function play(){
    //setInterval是定时器
    timer = setInterval(function(){
        if(curDispaly == len - 1){
            curDispaly = 0;
        }else{
            curDispaly ++;
        }
         show();
    },1000);
}
