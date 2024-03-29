import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import Home from './views/home';
import Hand from './views/hand';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/hand" component={Hand} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
