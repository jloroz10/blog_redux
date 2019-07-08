import React from 'react';

import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Usuarios from './Usuarios'
import Tasks from './Tasks'
import Publications from './Publications'
import Menu from './Menu';
function App() {
  return (
      
      <BrowserRouter>
        <Menu />
        <Switch>
            <Route exact path="/users" component={Usuarios} />
            <Route exact path="/tasks" component={Tasks} />
            <Route exact path="/publications/:index" component={Publications} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
