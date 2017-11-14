$(function(){



  // localStorage的两种存取函数
  $.saveL=function(key,data){
  	 localStorage[key]=JSON.stringify(data);
  }
  $.getL=function(data){
  	return JSON.parse(localStorage[data]);
  }

 var database=[];
 var $hinput=$('.header input');
  $hinput.val($hinput.val()).focus();
  var $ul=$('.card .todos')
 // 渲染  localStorage的内容取出来
  var render=function(){
  	$('.todos').empty();
    database=$.getL("data");
    for(var i=0; i<database.length;i++){
       var v=database[i];
      var xin=$('<li data-id="'+v.id+'"  class="heng   '+(v.isdone?'wancheng':' ')+'"><div class="check"></div><p>'+v.name+'</p><input type="text" value="'+v.name+'"><div class="delete"></div></li>')
       xin.appendTo($ul);

    }
  }

    if(localStorage['data']){
    	render();
    }



// 添加 
  $hinput.on("keydown",function(e){  	
  	if(e.keyCode === 13){
  	//判断是否为空
  	var v=$(this).val().trim();
  	if(v === ""){return};

  	if(database.length === 0){
  	   var  id=1;
  	}else{
  		var id= database[database.length-1].id +1;
  	}
  	
       // 把数组的内容加到localStorage
       database.push(
        {id:id,name:v,isdone:0}
       	)
       $.saveL("data",database);
       render();
       $(this).val(" ").focus();
  	}
  })

  // 点击完成成为完成状态
    $ul.on('click','.check',function(){
       var lis=$(this).closest('li')
       lis.toggleClass('wancheng');
       var id=parseInt($(lis).attr('data-id'));
       if(lis.hasClass('wancheng')){
            var isdone=1;
       }else{
            var isdone=0;
       }
       for(var i=0;i<database.length;i++){
            if(parseInt(database[i].id) === id){
              database[i].isdone = isdone;
            }
       }
       $.saveL('data',database);



    })
  // 点击删除
     $ul.on('click','.delete',function(){
     	$(this).closest('li').remove();
       var id=parseInt($(this).closest('li').attr('data-id'));
       var newarr=[];
       for (var j=0; j< database.length; j++){       
       	   if(parseInt(database[j].id) !== id){             
              newarr.push(database[j]);
       	   }
       };
       database = newarr;
       $.saveL("data",database);
    })


    // 双击编辑
    $ul.on('dblclick','.heng p',function(){
      if($(this).closest('li').hasClass('wancheng')){
        return;
      }
        $(this).closest('li').addClass('shuangji');
        var inp=$(this).closest('li').find('input');
        inp.val($(this).text()).focus();
    })
    // 当input失去焦点的时
    $ul.on('blur','.heng input',function(){
      var lis=$(this).closest('li');
      var id=parseInt(lis.attr('data-id'));
        lis.find('p').text($(this).val());
        lis.removeClass('shuangji');
         for(var i=0;i<database.length;i++){
            if(parseInt(database[i].id)=== id){
              database[i].name=$(this).val();
            }
         }
         $.saveL('data',database);



    })


})