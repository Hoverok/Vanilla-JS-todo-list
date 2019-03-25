//the goal of this plunk is to make a drop down togglable todo list
//using basic JS and HTML

var todoList = {
  todos: [], //array that will hold objects(each todo in the todolist)
  
  //if not all todos are completed this function completes them
  //if all todos are completed this function uncompletes them all
  toggleAll: function(){
    var completedTodos = 0;
    var totalTodos = this.todos.length;
    for (var i = 0; i < totalTodos; i++){
    if(this.todos[i].completed===true){
    completedTodos++;
      }
    }
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i ++){
        this.todos[i].completed = false;
      }
    }
    else {
      for (var i = 0; i < totalTodos; i ++){
      this.todos[i].completed = true;
      }
    }
 view.displayTodos();
  },
  
  //this function adds a todo(object) to the todolist(todos array)
  addTodo: function (val){
    this.todos.push({ //pushing object into todos[]
      todoText:val,  //each object has todoText and completed
      completed:false  //status of a todo
    });   // this = working in THIS object
 view.displayTodos();
  },
  
  //this function changes every induvidual todo
  changeTodo: function(i,val){
  this.todos[i-1].todoText=val;  // changes objects attribute
 view.displayTodos();
  },
  
  //this function toggles status of completed/incompleted todos
  toggleComplete: function(i) {
   this.todos[i-1].completed=!(this.todos[i].completed); // change bool value of completed
 view.displayTodos();
  },
  
  //this function deletes a selected todo from the todos
  delTodo: function (i){
    this.todos.splice(i,1);
 view.displayTodos();
  }
}; // end of todoList object

/*
//more universal way to give thing functionality in JS
//requires  <button id = "displayTodosButton">Display Todos</button> in HTML
//connecting a variable to a "Display Todos" button from HTML
var displayTodosButton = document.getElementById('displayTodosButton');
//adding a function to the button
displayTodosButton.addEventListener('click', function (){
  todoList.displayTodos();
});
*/

//more applicable to what I need
//this object holds all the functions for onlick buttons from HTML
//holds all the user interactions
var handlers ={
  
  toggleAll: function(){
    todoList.toggleAll();
     view.displayTodos();
  },
  addTodo: function(){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
     view.displayTodos();
  },
  changeTodo: function(){
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber,changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
     view.displayTodos();
  },
  delTodo: function(position){
    
    todoList.delTodo(position); // position = clicked delete button's id (it's li's id)
     view.displayTodos();
  },
  toggleComplete: function (){
    var toggleCompletePositionInput = document.getElementById('toggleCompletePositionInput');
    todoList.toggleComplete(toggleCompletePositionInput.valueAsNumber);
    toggleCompletePositionInput.value = '';
     view.displayTodos();
  }
};

//view's purpose is to display each todo's text and complete status on the web page
//for that I created an untitled list in html <ul></ul> and attached it to a variable in JS
//created a create li command, attached it to a var and embedded it in the ul

var view ={

  displayTodos: function () {
   var todosUl = document.querySelector('ul'); //assigning our ONLY ul from HTML to a var
   todosUl.innerHTML = ''; // resets list  
   
   for (var i = 0; i < todoList.todos.length; i++){
     var todoLi = document.createElement('li'); //assings creating a new list item to a variable
     todoLi.id = i;   //every new list item gets it's own id 
     //id is stored as a string, I later convert it using parseInt function
      if (todoList.todos[i].completed === false){
      todoLi.textContent = "( ) " + todoList.todos[i].todoText; //textContent of the list item becomes the todoText
     }
     else {
      todoLi.textContent = "(x) " + todoList.todos[i].todoText; //textContent of the list item becomes the todoText
     }
     todoLi.appendChild(this.createDeleteButton()); //creates a delete button in every list item
     todosUl.appendChild (todoLi);   // embedds creation of new list item in the list
   
   }
  },
  //this function creates a Delete button 
  createDeleteButton: function (){
    var deleteButton = document.createElement('button');//creation of a button
    deleteButton.textContent = "Delete";//names the button Delete
    deleteButton.className = "deleteButtonClass";//Gives button a class
    return deleteButton; 
  },
  
  setUpDeleteEventListener: function (){
    var todosUl = document.querySelector('ul'); //assigning our ONLY ul from HTML to a var

    todosUl.addEventListener('click', function (event) { //when something in the ul is clicked, this starts
    var elementClicked = event.target; // to specify what in the ul was clicked (in this case Delete button)

    if(elementClicked.className === "deleteButtonClass"){ //if the clicked button is a Delete button
     handlers.delTodo( parseInt(elementClicked.parentNode.id)); //passes the parentNode.id of the clicked delete button into delTodo function
        //parentNode.id = id of the li that the delete button is the child of
       }
      });
  }
};

view.setUpDeleteEventListener(); //calls the function for delete Button





