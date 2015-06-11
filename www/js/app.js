// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
.controller('TodoListCtrl', function($scope,$ionicPopup,$ionicActionSheet,$timeout){
  
  $scope.data = {};

  $scope.data.todos = [
    {text : 'Write Test cases'}, 
    {text: 'Implement WSFs'}
  ];

  $scope.addTodo = function(){
    var addPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.newTodo">',
      title: 'What do you want to do today?',
      subTitle: 'create a new todo',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.newTodo) {
              //don't allow the user to close unless he enters new todo 
              e.preventDefault();
            } else {
              return $scope.data.newTodo;
            }
          }
        
        }
      ]
    });
    addPopup.then(function(newTodo) {
      if(!newTodo) return;
      $scope.data.todos.push({
        text: newTodo
      });
    });
  } 

  $scope.showActions = function(todoIndex){

    var todos = $scope.data.todos;
    // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
    buttons: [
      { text: '<b>Edit</b> This '},
    ],

    destructiveText: 'Delete',
    titleText: 'Modify your task',
    cancelText: 'Cancel',
    cancel: function() {
    // add cancel code..
    },

    destructiveButtonClicked: function(){

      hideSheet();
      if(confirm('do you really want to delete this?')){
        todos.splice(todoIndex,1);
      }
    }, 
    buttonClicked: function(index) {
    if(index === 0){
    // edit buton clicked
      hideSheet();
      //alert('Edit '+$scope.data.todos[todoIndex].text );
      $scope.data.editTodo = todos[todoIndex].text;
      var editPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.editTodo">',
        title: 'Edit',
        subTitle: 'edit your task',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.editTodo) {
                //don't allow the user to close unless he enters new todo 
                e.preventDefault();
              } else {
                return $scope.data.editTodo;
              }
            }
          
          }
        ]
      });
      editPopup.then(function(editTodo) {
        if(!editTodo) return;
        $scope.data.todos[todoIndex].text = editTodo;
      });


      return true;
    }

    if(index === 1){


    }
    return true;

    }
    });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 10000);

  }

});
