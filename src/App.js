import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppRouter from './components/AppRouter/AppRouter';
import rootReducer from './redux/reducers/rootReducer';

const styles = {
  mainParent : {
    height: '100vh',
    width: '100vw'
  }
}

const store =  createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
    <div style={styles.mainParent}>
      <AppRouter/>
    </div>
    </Provider>
  );
}

export default App;
