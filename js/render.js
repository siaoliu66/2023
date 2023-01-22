var givecolor = $('.wheelBody .pattern .inner');
var color = ['#578fff', '#8c9ffd', '#ff7ea2', '#ffbf43', '#74dde3'];
function randomcoloron(givecolor,color){//参数1为获取的元素组,参数二为获取的颜色组
    var arr2 = [];
    for(var i = color.length; i > 0; i--) {
        const num = Math.floor(Math.random() * color.length); //获取随机数
        arr2.push(color[num]);//把随机数添加到数组中
        color.splice(num,1);//删除原有数组的颜色
        for(var j = 0; j < givecolor.length; j++) {
            givecolor[j].style.background = arr2[j]
        }
    };
}

randomcoloron(givecolor,color);