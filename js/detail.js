// 入口函数
$(function(){
    // 先得到id
    let id = location.search.substring(4);
    // 新的数组的获取指定条件元素的方法
    let target = phoneData.find(function(e){
       return  e.pID == id;
    });
    // 把数据动态渲染到结构里面
    // 修改价格
    $('.summary-price em').text(`¥${target.price}`);
    // 修改名字内容
    $('.sku-name').text(target.name);
    // 修改图片
    $('.preview-img>img').attr('src',target.imgSrc);
})