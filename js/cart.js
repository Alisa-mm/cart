$(function(){
    // 第一个功能： 先读取本地数据中的数据，然后动态的生成列表结构
   let arr = kits.localData('cartlistdata');
   //遍历数组 动态生成结构
   let html = '';
   arr.forEach(e=> {
    html += `<div class="item" data-id="${e.pID}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck" ${e.isChecked ? "checked" : ''}>
        </div>
        <div class="cell col-4">
          <img src="${e.imgSrc}" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name">${e.name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${e.price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count">
          <a href="javascript:void(0);" class="reduce fl ">-</a>
          <input autocomplete="off" type="text" class="number fl" value="${e.number}">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${e.number * e.price}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`
   });  
    // 手动添加到父元素中
    $('.item-list').append(html);
    // 如果arr中数据不是全部勾选的，就需要把全选的勾勾去掉
/*     let noChooseAll = arr.find(e=>{
       if(noChooseAll){
        $('.pick-all').prop('checked',false);
       }
    }); */
    let noChooseAll = arr.find(e=>{
        return !e.isChecked;
    });
    $('.pick-all').prop('checked',!noChooseAll);
   
    if(arr.length != 0){
        $('.empty-tip').hide(); // 隐藏购物车为空的提示
        $('.cart-header').show(); // 显示表头
        $('.total-of').show(); // 显示用于结算的div
    }
    //  第二个功能 全选和点选
        // 实现全选
     $('.pick-all').on('click',function(){
        let status = $(this).prop('checked');
        $('.item-ck').prop('checked',status);
        $('.pick-all').prop('checked', status);
        arr.forEach(e=>{
            e.isChecked = status;
          })
          // 重新存进本地数据
          kits.saveData('cartListData',arr);
        //  全选的时候 要更新数据
        calcTotal();
     })
    //  实现点选 因为checkbox是动态生成的 用委托来注册
    $('.item-list').on('click','.item-ck',function(){
        // 如果勾选的个数和总个数一致 就是全选了
        let ckAll = $('.item-ck').length === $('.item-ck:checked').length;
        // 设置全选的状态和ckAll 一致
        $('.pick-all').prop('checked',ckAll);
        // 把当前的数据的是否勾选记住
        let isChecked = $(this).prop('checked');
        let id = $(this).parents('.item').attr('data-id');
        arr.forEach(e=>{
            if(e.pID == id){
                e.isChecked = isChecked;
            }
        })
        kits.saveData('cartlistdata',arr);
        calcTotal();
    })

     // 封装一个计算总价格和总件数的函数，方便每次使用就调用
    function calcTotal(){
        // 第三个功能实现总数和总价的计算
        // 计算总价和总件数 是要从本地数据中获取 isChecked 为true的加起来
        let totalCount = 0;
        let totalMoney = 0;
        arr.forEach(e=>{
            if(e.isChecked){
                totalCount+= e.number;
                totalMoney+= e.number*e.price;
            }
        })
        // 把总价和件数更新到页面中去
        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney);
    }
    //一开始就要计算一次
    calcTotal();
    // 第四个功能 实现数量的加减
    // 
})
    
