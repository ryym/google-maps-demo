import {
  default as React,
  PropTypes as P
} from 'react';
import BuildingOnMap from './BuildingOnMap';
import buildingService from '../../service/buildingService';

/**
 * 指定されたIDの建物情報を取得し、地図とともに表示するコンポーネント
 */
export default class BuildingDetailBase extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      neighbors: [],
      radius: 1000,
      finalRadius: 1000,
      neighborsDisplayed: false,
      building: undefined
    };
    this.fetchBuilding(this.props.params.id);
  }

  render() {
    if (! this.state.building) {
      return <div>Loading...</div>;
    }

    const { neighbors, radius, finalRadius } = this.state;
    const b = this.state.building;

    const mapProps = {
      height: '100%',
      width: '100%',
      latitude: b.latitude,
      longitude: b.longitude,
      initialZoom: 15
    };

    return (
      <div>
        <div className="gmd-detail mdl-grid">

          <header className="mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
            <div className="mdl-cell mdl-cell--4-col
              mdl-color--grey-200" style={{height: 250}}>
            </div>
            <div className="mdl-cell mdl-cell--6-col-desktop mdl-cell--4-col-tablet mdl-grid mdl-grid--no-spacing">
              <div className="mdl-cell mdl-cell--12-col">
                <span className="mdl-layout-title">{b.name} - B-012345</span>
              </div>
              <div className="mdl-cell mdl-cell--12-col mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--2-col">住所</div>
                <div className="mdl-cell mdl-cell--10-col">{b.address}</div>
                <div className="mdl-cell mdl-cell--2-col">所有者</div>
                <div className="mdl-cell mdl-cell--10-col">-</div>
                <div className="mdl-cell mdl-cell--2-col">状態</div>
                <div className="mdl-cell mdl-cell--10-col">-</div>
                <div className="mdl-cell mdl-cell--2-col">担当者</div>
                <div className="mdl-cell mdl-cell--10-col">-</div>
              </div>
            </div>
          </header>

          <div className="gmd-map-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--9-col mdl-grid">
            <div
              className="mdl-cell mdl-cell--12-col mdl-grid"
              style={{ alignItems: 'center', 'justifyContent': 'flex-start' }}
            >
              <div className="mdl-cell mdl-cell--12-col">
                {b.address}
              </div>
              <div className="mdl-cell mdl-cell--4-col-desktop mdl-cell--4-col-tablet mdl-cell--8-col-phone">
                {this.renderButton()}
              </div>
              <div className="mdl-cell mdl-cell--8-col mdl-cell--4-col-tablet mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">{radius} m</div>
                <div className="mdl-cell mdl-cell--6-col mdl-cell--3-col-phone">
                  <input type="range" min="0" max="5000" value={radius}
                    className="mdl-slider mdl-js-slider"
                    onChange={e => this.handleRadiusChange(e)}
                  />
                </div>
              </div>
              <div className="mdl-layout-spacer"></div>
            </div>
            <div className="mdl-cell mdl-cell--12-col gmd-google-map">
              <BuildingOnMap {...mapProps} neighbors={neighbors} radius={finalRadius} />
            </div>
          </div>

          <div
            className="
              mdl-card mdl-shadow--2dp
              mdl-cell mdl-cell--3-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone
              mdl-grid mdl-grid--no-spacing"
          >
          </div>
        </div>

      </div>
    );
  }

  fetchBuilding(id) {
    buildingService.findById(id)
      .then(building => {
        this.setState({ building });
      });
  }

  renderButton() {
    let handleClick, text;
    if (this.state.neighborsDisplayed) {
      handleClick = () => this.hideNeighbors();
      text = '周辺情報を隠す';
    }
    else {
      handleClick = () => this.displayNeighbors();
      text = '周辺情報を表示';
    }
    return (
      <button
        className="
          mdl-button mdl-js-button mdl-js-ripple-effect
          mdl-color--accent mdl-color-text--white"
        onClick={handleClick}
      >
        {text}
      </button>
    );
  }

  displayNeighbors() {
    const id = this.props.params.id;
    const radius = this.state.radius;

    buildingService.listNeighborsOf(id, radius)
      .then(res => {
        this.setState({
          finalRadius: radius,
          neighbors: res.neighbors,
          neighborsDisplayed: true
        });
      });
  }

  hideNeighbors() {
    this.setState({
      neighbors: [],
      neighborsDisplayed: false
    });
  }

  handleRadiusChange(e) {
    const radius = parseInt(e.target.value, 10) || 1000;
    this.setState({ radius });
  }

  componentDidUpdate() {
    componentHandler.upgradeAllRegistered();
  }
}

BuildingDetailBase.propTypes = {
  building: P.object,
  neighbors: P.array,
  radius: P.number
};
