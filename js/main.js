var todo=angular.module('todos',["ngAnimate"]);
   todo.controller('mainCtrl',['$scope','$timeout',
    function($scope,$timeout){
      // $scope.title='welcome here';
      // $scope.cc=function(){
      // 	$scope.title='nihao';
      // }
      // $scope.list=[
      //    {a:1,b:2,c:3},
      //    {a:4,b:5,c:6},
      //    {a:7,b:8,c:9},         
      // ]
      // $scope.del=function(id){
      // 	$scope.list.splice(id,1)
       // }
       $scope.title="";
       setInterval(function(){
            $timeout(function(){
              var data = new Date();
              var h=data.getHours();
              var m=data.getMinutes();
              var s=data.getSeconds();
              var s=(s<10)?("0"+s):s;
              $scope.title=''+h+':'+m+':'+s+'';
           },0)


       },500)


     $scope.name="";
     var $hinput=$('.header input');
      $hinput.val($hinput.val()).focus();
     if(localStorage.__y){
           $scope.todos=JSON.parse(localStorage.__y)
     }else{
           $scope.todos=[];
     }
     // 清除已完成
     $scope.clear=function(){
         var arr=[];
         for(var i= 0; i<$scope.todos.length;i++){
           if(!$scope.todos[i].isDone === true){
            arr.push($scope.todos[i])
           }
         }
         $scope.todos=arr;

     }







     // 在localStorage里面存数据
     $scope.save=function(){
         localStorage.__y = JSON.stringify($scope.todos);
      }
      // 删除
      $scope.del=function(id){
       var index;
        for(var i=0;i<$scope.todos.length;i++){
          if($scope.todos[i].id === id){
             index=i;
              console.table($scope.todos);
          }
        } 
        $scope.todos.splice(index,1)      

      };
      // 当双击的时候聚焦
      $scope.focus=function(e){
        $timeout(function(){
          $(e.currentTarget).find('input').trigger('focus')
        },0)
      }

      $scope.add=function(e){
        if($scope.todos.length === 0){
          var  id=10;
        }else{
            var max=-Infinity;
            for(var i=0;i<$scope.todos.length;i++){
              var val = $scope.todos[i].id;
              if( max < val){ max = val}
            }
            var id = max+1;
        }
        if(e.keyCode === 13){          
          var v=$scope.name.trim();
           if(v === ""){return};
          $scope.todos.push({id:id,name:$scope.name,isDone:false});
          $scope.name="";
        }
      }
     





	    //  if(localStorage.__x){
     //         $scope.todos=JSON.parse(localStorage.__x)
	    //  }else{
     //         $scope.todos=[];
	    //  }

	    //  $scope.save=function(){
	    //  	localStorage.__x = JSON.stringify($scope.todos)
	    //  }
   
     // $scope.add=function(e){
     // 	if(e.keyCode === 13){
     // 		$scope.todos.push({ name:$scope.name,isDone:false})
     // 		$scope.name= " ";
     // 	}
     // }
     // $scope.delete=function(i){
     //    $scope.todos.splice(i,1);
     // }






    }
   	])