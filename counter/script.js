const increment = () => ({
  type: 'INCREMENT'
})

const decrement = () => ({
  type: 'DECREMENT' 
})

window.onload = () => {

  function rootReducer(state={count: 0}, action) {
    switch(action.type) {

      case 'INCREMENT': 
	var newState = { ...state };
	newState.count++;
	return newState;

      case 'DECREMENT':
	var newState = { ...state };
	newState.count--;
	return newState;

      default :
        return state;
    }
  }

  function updateDisplay(text) {
    header.textContent = text;
  }

  const store = Redux.createStore(rootReducer);

  const header = document.getElementById('counter');
  const butInc = document.getElementById('increment');
  const butDec = document.getElementById('decrement');

  updateDisplay(store.getState().count);

  butInc.addEventListener('click', () => {
    store.dispatch(increment());
    updateDisplay(store.getState().count);
  });

  butDec.addEventListener('click', () => {
    store.dispatch(decrement());
    updateDisplay(store.getState().count);
  });
}

