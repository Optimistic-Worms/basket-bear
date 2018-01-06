import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../css/global.css';
import '../css/homepage.css';
import '../css/footer.css';
import Developer from './developer/Developer.jsx';
import Home from './Home.jsx';

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/dev" component={Developer}/>
        <Route path="/" component={Home}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
