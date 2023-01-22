let wheel = $('.wheelBody')
let contentCon = $('.contentCon')
let winBar = $('.winBar')
let length, preAngle
let starAngle = 0
let giftBox = []
let data = []
let url = './db.json'
var givecolor = $('.wheelBody .pattern .inner');
var color = ['#578fff', '#8c9ffd', '#ff7ea2', '#ffbf43', '#74dde3'];

let shuffle = function(a, b) {
	let num = Math.random() > 0.5 ? -1 : 1
	return num
}

let showGift = function(r) {
	$('.pattern')
		.eq(r)
		.addClass('picked')
	$('.content')
		.eq(r)
		.addClass('picked')
	$('h2').text(`${data[r].title}!`)
	winBar.fadeIn(300)
}

let showNum = function() {
	$('.content').each(function() {
		let index = $(this).index()
		$(this)
			.find('span')
			.text(data[index].num)
	})
}

let again = function(r) {
	$('.pattern').removeClass('picked')
	$('.content').removeClass('picked')
	winBar.fadeOut(300)
}

let handRotate = function(gift, second) {
	let goAngle = starAngle + 1440 + gift * preAngle - (starAngle % 360)
	starAngle = goAngle
	$('.hand').css({
		transition: `${second}ms`,
		transform: `rotate(${goAngle}deg)`,
	})
	setTimeout(function() {
		showGift(gift)
		showNum()
		$('.hand').on('click', clickHandler)
	}, second)
}

let clickHandler = function() {
	$('.hand').off('click')
	if (giftBox.length == 0) {
		init()
		$('.hand').on('click', clickHandler)
	} else {
		again()
		let gift = giftBox.sort(shuffle).pop()
		data[gift].num--
		handRotate(gift, 3000)
	}
}

let init = function() {
	starAngle = 0
	giftBox = []
	winBar.hide()
	wheel.html('<div class="hand" style="top:0px"><p>PRESS</p><img src="./images/hand.svg" /></div>')
	contentCon.html('')
	$('.hand').css({
		transition: 'unset',
		transform: 'unset',
	})
	$.get(url, function(res) {
		data = res
		data.forEach((item, index) => {
			preAngle = 360 / data.length
			let patternAngle = preAngle / -2 + index * preAngle
			let pattern = $('<div class="pattern"></div>')
			let inner = $('<div class="inner"></div>')
			let content = $(
				`<div class="content"><h3>${item.icon}</h3><p>${item.text}</p></div>`
			)

			pattern.css('transform', `rotate(${patternAngle}deg)`)
			inner.css('transform', `rotate(${preAngle}deg)`)
			content.css('transform', `rotate(${index * preAngle}deg)`)
			pattern.append(inner)
			wheel.append(pattern)
			contentCon.append(content)

			for (let i = 0; i < item.num; i++) {
				giftBox.push(index)
			}
		})
	})
	$('.hand').on('click', clickHandler)
    
}
let render = function(givecolor,color){//参数1为获取的元素组,参数二为获取的颜色组
    var arr2 = [];
	var givecolor1 = $('.wheelBody .pattern .inner');
    for(var i = color.length; i > 0; i--) {
        const num = Math.floor(Math.random() * color.length); //获取随机数
        arr2.push(color[num]);//把随机数添加到数组中
        color.splice(num,1);//删除原有数组的颜色
        for(var j = 0; j < givecolor.length; j++) {
            givecolor[j].style.background = arr2[j]
        }
    };
}

init()



