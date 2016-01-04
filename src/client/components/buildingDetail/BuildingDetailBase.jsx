import {
  default as React,
  PropTypes as P
} from 'react';
import BuildingOnMap from './BuildingOnMap';

function neighbor(latitude, longitude) {
  return { latitude, longitude };
}

/**
 * 指定された建物の情報を、地図とともに表示するコンポーネント
 */
export default class BuildingDetailBase extends React.Component {
  render() {
    if (! this.props.building) {
      return <div>Loading...</div>;
    }
    const { neighbors, radius } = this.props;
    const b = this.props.building;

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
                <button type="button"
                  className="mdl-button mdl-color--accent mdl-color-text--white">
                  周辺情報を表示
                </button>
              </div>
              <div className="mdl-cell mdl-cell--8-col mdl-cell--4-col-tablet mdl-grid mdl-grid--no-spacing">
                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-phone">10 Km</div>
                <div className="mdl-cell mdl-cell--6-col mdl-cell--3-col-phone">
                </div>
              </div>
              <div className="mdl-layout-spacer"></div>
            </div>
            <div className="mdl-cell mdl-cell--12-col gmd-google-map">
              <BuildingOnMap {...mapProps} neighbors={neighbors} radius={radius} />
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
}

BuildingDetailBase.propTypes = {
  building: P.object,
  neighbors: P.array,
  radius: P.number
};
