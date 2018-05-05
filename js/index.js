/**
 * 主页
 */
// ————导航栏start————
// var my_swiper = new Swiper('#topNav', {
//     freeMode: true,
//     freeModeMomentumRatio: 0.5,
//     slidesPerView: 'auto',
// });
//
// swiperWidth = my_swiper.container[0].clientWidth;
// maxTranslate = my_swiper.maxTranslate();
// maxWidth = -maxTranslate + swiperWidth / 2;
//
// $(".swiper-container").on('touchstart', function (e) {
//     // e.preventDefault()
// });
//
// my_swiper.on('tap', function (swiper, e) {
//     slide = swiper.slides[swiper.clickedIndex];
//     slideLeft = slide.offsetLeft;
//     slideWidth = slide.clientWidth;
//     slideCenter = slideLeft + slideWidth / 2;
//     // 被点击slide的中心点
//
//     my_swiper.setWrapperTransition(300);
//
//     if (slideCenter < swiperWidth / 2) {
//         my_swiper.setWrapperTranslate(0)
//     } else if (slideCenter > maxWidth) {
//         my_swiper.setWrapperTranslate(maxTranslate)
//     } else {
//         nowTlanslate = slideCenter - swiperWidth / 2;
//         my_swiper.setWrapperTranslate(-nowTlanslate)
//
//     }
//
//     $("#topNav  .active").removeClass('active');
//
//     $("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active')
//
// });



$(function() {
    function setCurrentSlide(ele, index) {
        $(".swiper1 .swiper-slide").removeClass("selected");
        ele.addClass("selected");
        //swiper1.initialSlide=index;
    }

    var swiper1 = new Swiper('.swiper1', {
//					设置slider容器能够同时显示的slides数量(carousel模式)。
//					可以设置为number或者 'auto'则自动根据slides的宽度来设定数量。
//					loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        slidesPerView: 4.5,
        paginationClickable: true,//此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        spaceBetween: 10,//slide之间的距离（单位px）。
        freeMode: true,//默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
        loop: false,//是否可循环
        onTab: function(swiper) {
            var n = swiper1.clickedIndex;
        }
    });
    swiper1.slides.each(function(index, val) {
        var ele = $(this);
        ele.on("click", function() {
            setCurrentSlide(ele, index);
            swiper2.slideTo(index, 500, false);
            //mySwiper.initialSlide=index;
        });
    });

    var swiper2 = new Swiper('.swiper2', {
        //freeModeSticky  设置为true 滑动会自动贴合
        direction: 'horizontal',//Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
        loop: false,
//					effect : 'fade',//淡入
        //effect : 'cube',//方块
        //effect : 'coverflow',//3D流
//					effect : 'flip',//3D翻转
        autoHeight: true,//自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        onSlideChangeEnd: function(swiper) {  //回调函数，swiper从一个slide过渡到另一个slide结束时执行。
            var n = swiper.activeIndex;
            setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
            swiper1.slideTo(n, 500, false);
        }
    });
});
// ————导航栏end————


// ————查找start————
// 显示出查找输入框
function changeFind() {
    var find = document.getElementById("find");
    var tabBG = document.getElementById("tabBG");
    find.style.display = "block";
    tabBG.style.display = "block";
}

// 点击背景隐藏查找输入框
function changeIndexBG() {
    var find = document.getElementById("find");
    var tabBG = document.getElementById("tabBG");
    find.style.display = "none";
    tabBG.style.display = "none";
}
//查找按钮，检查是否有输入内容
function submitIndexInfo() {
    // alert("aaa")
    var groupId = document.getElementById("js-groupId").value;
    if (groupId.length <=0){
        alert("请输入内容后再查找！");
    }else {
        var find = document.getElementById("find");
        var tabBG = document.getElementById("tabBG");
        find.style.display = "none";
        tabBG.style.display = "none";
    }
}


// 查找
jQuery.expr[':'].Contains = function(a, i, m) {
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
function filterList(list) {
    $('#js-groupId').bind('input propertychange', function() {
        var filter = $(this).val();
        if (filter) {
            $matches = $(list).find('a:Contains(' + filter + ')').parent();
            $('li', list).not($matches).slideUp();
            $matches.slideDown();
        } else {
            $(list).find("li").slideDown();
        }
    });
}
var $j = jQuery.noConflict();
$j(function() {
    filterList($("#groupid"));
    $('#js-groupId').bind('focus', function() {
        $('#groupid').slideDown();
    }).bind('blur', function() {
        $('#groupid').slideUp();
    })
    $('#groupid').on('click', 'li', function() {
        $('#js-groupId').val($(this).text())
        $('#groupId').val($(this).data('id'))
        $('#groupid').slideUp()
    });
});
// ————查找end————


// ————导航栏固定start————
// 判断下拉高度，设置导航栏是否固定顶部
$(function () {
    //绑定滚动条事件
    $(window).bind("scroll", function () {
        var sTop = $(window).scrollTop();
        var sTop = parseInt(sTop);
        var topNavs = document.getElementById("topNavs");
        if (sTop >= 90) {
            console.log("11111111");
            topNavs.style.position = "fixed";
            topNavs.style.top = "0";
            topNavs.style.left = "0";
            console.log("111111111aaa"+sTop)
        }
        else {
            console.log("2222222");
            topNavs.style.position = "absolute";
            topNavs.style.top = "90px";
            console.log("22222222aa"+sTop)
        }
    });
})
// ————导航栏固定end————


// ————利用信息流获取后台数据start————

layui.use('flow', function(){
    var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
    var flow = layui.flow;
    flow.load({
        elem: '#listIndex' //指定列表容器
        ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
            var lis = [];
            //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
            $.get('https://www.easy-mock.com/mock/5aea779a9d0dc53dc5af4c22/jiannanxc/JianNanxc', function(res){
                console.log(res.data.con)
                //假设你的列表返回在data集合中
                layui.each(res.data, function(index, item){
                    console.log(res.data.con.length)
                    var length = res.data.con.length;
                    console.log(index)
                    console.log(item[0].content)
                    for (var i = 0; i < length; i++){
                        lis.push('<p style="font-size: 18px;margin-top: 20px">'+item[i].content+'</p>' +
                            '<a  href="content.html">' +
                            '<button style="text-align: left;color: red;border: 1px solid red;float: right;font-size: 10px;padding: 0 4px;margin-right: 10px;background-color: white;border-radius: 4px;">了解一下</button>' +
                            '</a>' +
                            '<p style="color: #6e6e6e;font-size: 10px;padding-top: 8px;margin-right: 60%">物业管理处   '+item[i].time+'</p>');
                    }
                });

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < res.pages);
            });
        }
    });
});
// ————利用信息流获取后台数据end————


// ————选修卡start————
layui.use('element', function() {
    var $ = layui.jquery
        , element = layui.element;
});
// ————选修卡end————