const addTodo = task => ({
  type: 'ADD_TODO',
  task
})

const removeTodo = id => ({
  type: 'REMOVE_TODO',
  id
})

const initialState = {
  todos: [],
  id: 0
}

function rootReducer(state=initialState, action) {
  switch(action.type){
    case 'ADD_TODO':
      var newState = {...state};
      newState.id++;
      return { ...newState, 
	todos: [...newState.todos, {task: action.task, id: newState.id}]
      };
    case 'REMOVE_TODO':
      var newState = {...state};
      return {
        ...newState,
	todos: newState.todos.filter(todo => todo.id !== +action.id)
      };
      return state;
    default:
      return state;
  }
}

const store = Redux.createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



$('form').submit(evt => {
  evt.preventDefault();

  let newTask = $('#task').val();
  store.dispatch(addTodo(newTask));
  $('ul').on('click','button', event => {
    store.dispatch(removeTodo(event.target.id));
    $(event.target)
      .parent()
      .remove();
  });
  var currentState = store.getState();

  let $newLi = $('<li>', {text: newTask});
  let $newButton = $('<button>', {
    text: 'X',
    id: currentState.id
  });

  $newLi.append($newButton);
  $('ul').append($newLi);
  $('form').trigger('reset');

});
