import React, { Component } from 'react';
import AppNavbar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import ItemModal from "./components/ItemModal"
import { Container } from "reactstrap";
import RefreshButton from "./components/RefreshButton";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
     <Provider store={store}>
        <div className="App">
            <AppNavbar />
            <Container>
                <ItemModal />
                <RefreshButton />
                <ShoppingList />
            </Container>

        </div>
     </Provider>
  );
}

export default App;
