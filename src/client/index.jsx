import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import BuildingDetailContainer from './components/BuildingDetailContainer';

// Load stylesheets.
require('./styles/main.scss');
require('$mdl/material.css');

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
  <Router>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="/building/:id" component={BuildingDetailContainer} />
    </Route>
  </Router>,
  app
);
