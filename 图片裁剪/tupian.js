window.onload = function () {
    var cut = {
        left : 150,//当前的横坐标
        top : 150,//当前的纵坐标
        size : 150,//当前的宽高（尺寸）
        dom : document.getElementsByClassName("cut")[0],
        // dom : document.getElementById("cut"),//对应的dom元素
        //根据当前的属性，重新设置dom属性
        show: function(){
            this.dom.style.left = this.left + "px";
            this.dom.style.top = this.top + "px";
            this.dom.style.width = this.size + "px";
            this.dom.style.height = this.size + "px";
        },
        /**
         * 
         * @param {*} left 
         * @param {*} top 
         */
        move: function(left, top){
           
            this.left = left;
            this.top = top;
            this.show();
        }
    }
}
/**
 * 用于移动和调整大小以达到剪切目的的对象
 */

