/**
 *  详情页面
 */
// 点赞按钮
function dianzan() {
    var dianzan = document.getElementById("dianzan");
    dianzan.style.color="red";
    dianzan.innerHTML = "已点赞";
}
// 留言
var liuyan =function() {
    var liuyan_Content = document.getElementById("liuyan_Content");
    var tabBG = document.getElementById("tabBG");
    liuyan_Content.style.display = "block";
    tabBG.style.display = "block";
}
function changeBG() {
    var liuyan_Content = document.getElementById("liuyan_Content");
    var tabBG = document.getElementById("tabBG");
    liuyan_Content.style.display = "none";
    tabBG.style.display = "none";
}
//    更多内容按钮
function more() {
    alert("暂无更多内容！");
}
// 判断
function text(obj){
    console.log(obj.id)
    if (obj.id == "liuyan"){
        console.log("aaaaaaaaaa")
        liuyan();
    } else if (obj.id == "dianzan") {
        dianzan();
    } else if (obj.id == "tabBG"){
        changeBG();
    } else if (obj.id == "more"){
        more();
    }
}


//提交表单
function submitInfo() {
    var content = document.getElementById("content").value;
    if (content.length <=0){
        alert("请输入内容后再提交！");
    } else {
        var lyContent = document.getElementById("lyContent");
        lyContent.innerHTML = content;
        var liuyan_Content = document.getElementById("liuyan_Content");
    }
    var tabBG = document.getElementById("tabBG");
    var linshi = document.getElementById("linshi");
    liuyan_Content.style.display = "none";
    tabBG.style.display = "none";
    linshi.style.display = "block";
}


// 获取后台数据
$(document).ready(function() {
    $.ajax({
        url : "https://www.easy-mock.com/mock/5aea779a9d0dc53dc5af4c22/jiannanxc/liuyan",//请求地址
        dataType : "json",//数据格式
        type : "get",//请求方式
        async : true,//是否异步请求
        success : function(data) {   //如何发送成功
            var dataContent = data.data.content;
            var html = "";
            var zmContent = data.data.zwContent;
            var zwhtml = "";
            zwhtml = "<p style='font-size: 22px;'>"+zmContent[0].con_title+"</p>" +
                "<p style='color: #6e6e6e;font-size: 14px'>"+zmContent[0].con_time+"</p>" +
                "<p style='color: #6e6e6e;line-height: 20px'>"+zmContent[0].con_content+"</p>";
            $("#zwContent").html(zwhtml);
            console.log(data.data.content);
            console.log(zmContent);
            for(var i=0;i<dataContent.length;i++){    //遍历data数组
                var ls = dataContent[i];
                html +="<div style='margin-top: 20px'><div class='ly_icon'></div><div style='margin-left: 60px' class='ly_content'>" +
                    "<span>22</span>" +
                    "<img src='image/icon/5.png' style='width: 30px;float: right;'>" +
                    "<p style='color: red'>鹿小葵</p><p>"+ls.liuyan_content+"</p><p style='font-size: 12px'>"+ls.liuyan_time+"</p>" +
                    "<hr><p style='margin-bottom: 15px;margin-top: 15px'>作者回复："+ls.liuyan_r+"</p></div></div>";
            }
            $("#listContent").html(html); //在html页面id=ulul的标签里显示html内容
        },
    })
})