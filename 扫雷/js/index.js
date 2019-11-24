// 构造函数
function Mine(tr, td, mineNum){
    this.tr = tr;//行数
    this.td = td; //列数
    this.mineNum = mineNum;//雷的数量

    this.squares = [];//二维数组，存储方块信息，按行与列排序
    this.tds = [];//存储所有单元格的dom对象,二维数组
    this.surplusMine = mineNum;//剩余雷的数量
    this.allRight = false;//标记的小红旗是否全是雷,用来判断用户是否游戏成功

    this.parent = document.querySelector('.gameBox');

}
//生成随机数
Mine.prototype.randomNum = function(){
    var square = new Array(this.tr*this.td);//生成一个空数组，但是有长度，长度为格子的总数
    for(var i = 0; i<square.length; i++){
        square[i] = i;
    }
    square.sort(function(){
        return 0.5-Math.random()
    })
   
    return square.splice(0, this.mineNum);
}
//初始化
Mine.prototype.init = function(){
    // this.randomNum();
    var rn = this.randomNum();//雷在格子里的位置
    var n = 0;//用来找到格子对应的索引
    for(var i = 0;i < this.tr; i++){
        this.squares[i] = [];//所有格子对应的信息
        for(var j = 0; j< this.td; j++){
            n++;
            //取一个方块，在数组的数据要使用行与列的形式去取，找方块周围的方块的时候要用坐标的形式去取，行与列的形式和坐标的（x，y）相反
            if(rn.indexOf(n) != -1){
                //如果条件成立，说明循环的这个索引在雷的数组里找到了，这就说明这个索引就是雷
                this.squares[i][j] = {type:'mine',x:j,y:i} ;
            }else{
                this.squares[i][j] ={type:'number',x:j,y:i,value:0}
            }
        }
    }
    this.parent.oncontextmenu = function(){
        return false;//右击鼠标不出现提示框
    }
    this.updateNum();
    this.createDom();
}
//创建表格
Mine.prototype.createDom = function(){
    var This = this;
    var table = document.createElement('table');

    for(var i = 0; i < this.tr; i ++){//行
        var domTr = document.createElement('tr');
        this.tds[i] = [];
        
        for(var j = 0; j < this.td; j ++){
            var domTd = document.createElement('td');
            // domTd.innerHTML = 0;
            domTd.pos = [i,j];//把格子对应的行与列存在格子身上，为了下面通过这个值去数组里取到
            domTd.onmousedown = function(){
                this.play(event,this);//This是实例对象，this点击的td
            };

            this.tds[i][j] = domTd; //这里是把所有创建的td添加到数组中
            // if(this.squares[i][j].type == 'mine'){
            //     domTd.className = 'mine';
            // }
            // if(this.squares[i][j].type == 'number'){
            //     domTd.innerHTML = this.squares[i][j].value;
            // }
           
            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    this.parent.appendChild(table);
};

//找格子周围的8个格子，显示数字
Mine.prototype.getAround = function(square){
    var x = square.x;
    var y = square.y;
    var result = [];//吧找到的格子坐标返回出去，二维数组
    /**x-1,y-1    x,y-1
     * x-1,y       x,y   x+1,y
     */
    //通过坐标循环九宫格
    for(var i = x-1; i<=x+1; i++){
        for(var j = y-1; j<=y+1;j++){
            if(
                i<0 ||//左边超出左边范围
                j<0 ||//格子超出上边范围
                i>this.td-1 ||//格子超出右边范围
                j>this.tr-1 ||//格子超出下边范围
                (i == x && j == y) ||//当前循坏到的格子是自己
                this.squares[j][i].type == 'mine'
            ){
                continue;//跳出
            }
            result.push([j,i]);
        }
    }
    return result;
};
//更新所有数字
Mine.prototype.updateNum = function(){
    for(var i = 0; i<this.tr;i++){
        for(var j = 0;j<this.td;j++){
            //只更新雷周围的数字
            if(this.squares[i][j].type == 'number'){
                continue;
            }
            var num = this.getAround(this.squares[i][j]);//获取到每个雷周围的数字
            for(var k = 0;k<num.length;k++){

                this.squares[num[k][0]][num[k][1]].value += 1
            }
        }
    }
}
Mine.prototype.play = function(ev,obj){
    if(ev.which == 1){//1为左键
        var cursquare = this.squares[obj.pos[0]][obj.pos[1]];
    }
}

var mine = new Mine(28,28,99);
mine.init();
