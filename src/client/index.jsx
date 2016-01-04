import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, Router } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import BuildingList from './components/BuildingList';
import BuildingDetailLayout from './components/buildingDetail/BuildingDetailLayout';
import BuildingDetailContainer from './components/buildingDetail/BuildingDetailContainer';

// Load stylesheets.
require('./styles/main.scss');
require('$mdl/material.css');

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
  <Router>
    <Route component={App}>
      <Route path="/" component={Home}>
        <IndexRoute component={BuildingList} />
      </Route>
      <Route path="/detail/:id" component={BuildingDetailLayout}>
        <IndexRoute component={BuildingDetailContainer} />
      </Route>
    </Route>
  </Router>,
  app
);
