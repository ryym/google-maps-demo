import React from 'react';
import buildingService from '../service/buildingService';

export default class BuildingList extends React.Component {
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
      <section className="gmd-bld-list mdl-grid">
        { buildings.map(this.renderBuilding.bind(this)) }
      </section>
    );
  }

  renderBuilding({ id, name, address }) {
    return (
      <div
        key={id}
        id={id}
        className="
          gmd-bld-list__item mdl-cell mdl-cell--12-col
          mdl-grid mdl-color--white mdl-shadow--2dp"
        onClick={() => this.handleBuildingClick(id)}
        onMouseEnter={() => this.handleMouseEnter(id)}
        onMouseLeave={() => this.handleMouseLeave(id)}
      >
        <header
          className="mdl-cell mdl-cell--3-col-desktop mdk-cell--3-col-tablet"
        >
          <div className="gmd-bld-thumb" style={{backgroundColor: '#ddd'}}>
            {/* TODO: 建物のサムネイル */}
          </div>
        </header>
        <div
          className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--5-tablet"
        >
          <div className="mdl-card__title">{name}</div>
          <div className="mdl-card__supporting-text mdl-grid">
            <div className="mdl-cell mdl-cell--2-col">
              住所
            </div>
            <div className="mdl-cell mdl-cell--10-col">
              {address}
            </div>
            <div className="mdl-cell mdl-cell--2-col">
              所有者
            </div>
            <div className="mdl-cell mdl-cell--10-col">
              -
            </div>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a
              href={`/#/detail/${id}`}
              className="
              mdl-button mdl-js-button mdl-js-ripple-effect
              mdl-color--accent mdl-color-text--white"
              onClick={e => e.stopPropagation()}
            >
              詳細を見る
            </a>
          </div>
        </div>
      </div>
    );
  }

  handleBuildingClick(id) {
    location.assign(`/#/detail/${id}`);
  }

  handleMouseEnter(id) {
    const item = document.getElementById(id);
    item.classList.add('mdl-shadow--4dp');
  }

  handleMouseLeave(id) {
    const item = document.getElementById(id);
    item.classList.remove('mdl-shadow--4dp');
  }

  fetchBuildings() {
    buildingService.listAll()
      .then(buildings => {
        this.setState({ buildings });
      });
  }
}
