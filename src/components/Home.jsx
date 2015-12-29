import React from 'react';
import buildingService from '../buildingService';

export default class Home extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      buildings: []
    };
    this.fetchBuildings();
  }

  render() {
    const { buildings } = this.state;
    return (
      <div>
        <h1>Sample buildings</h1>
        <ul className="buildings">
          { buildings.map(this.renderBuilding) }
        </ul>
      </div>
    );
  }

  renderBuilding({ id, name }) {
    return (
      <li key={id}>
        <a href={`/#/building/${id}`}>{name}</a>
      </li>
    )
  }

  fetchBuildings() {
    buildingService.listAll()
      .then(buildings => {
        this.setState({ buildings });
      });
  }
}
