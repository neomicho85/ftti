import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Import from './components/import/Import';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          {/* <Route exact path='/' component={Dashboard} /> */}
          <Route path='/import' component={Import} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
