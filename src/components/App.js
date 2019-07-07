import React from 'react';

import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Usuarios from './Usuarios'
import Menu from './Menu';
function App() {
  return (
      
      <BrowserRouter>
        <Menu />
        <Switch>
            <Route exact path="/users" component={Usuarios} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
