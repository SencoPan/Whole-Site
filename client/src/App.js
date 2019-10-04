import React from 'react';
import AppNavbar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
     <Provider store={store}>
        <div className="App">
            <AppNavbar />
            <ShoppingList />
        </div>
     </Provider>
  );
}

export default App;
