import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import BuildingDetailContainer from './components/BuildingDetailContainer';

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
  <Router component={App}>
    <Route path="/" component={Home} />
    <Route path="/building/:id" component={BuildingDetailContainer} />
  </Router>,
  app
);
