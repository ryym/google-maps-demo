import {
  default as React,
  PropTypes as P
} from 'react';
import BuildingMapDrawer from '../../helper/BuildingMapDrawer';

/**
 * Google Maps API を使用して、指定されたプロパティをもとに
 * 地図を描画するコンポーネント。
 * `react`用の`google-maps-api`ライブラリも既にあったが、
 * 今回はひとまず自力で行う。
 * また`npm`経由でGoogleオブジェクトを取得しようとすると非同期でしかできなさげなので、
 * とりあえずHTMLでライブラリを読み込み、トップレベルに`google`を置く方針でいく。
 */
export default class BuildingOnMap extends React.Component {
  constructor(...args) {
    super(...args);
    this.mapDrawer = undefined;
  }

  render() {
    const { height, width } = this.props;
    return (
      <div id="google-map" style={{ height, width }}>Google map here</div>
    );
  }

  componentDidUpdate() {
    if (this.props.neighbors && this.props.radius) {
      this.displayNeighbors(this._map);
    } else {
      this.removeNeighbors();
    }
  }

  componentDidMount() {
    const { latitude, longitude, initialZoom } = this.props;
    const mapElement = document.getElementById('google-map');

    this.mapDrawer = new BuildingMapDrawer(mapElement, {
      latitude, longitude,
      zoom: initialZoom
    });

    if (this.props.neighbors && this.props.radius) {
      this.displayNeighbors();
    }
  }

  displayNeighbors() {
    const neighborPositions = this.props.neighbors.map(n => {
      return {
        lat: n.latitude,
        lng: n.longitude
      };
    });
    this.mapDrawer.displayNeighbors(
      this.props.radius, neighborPositions
    );
  }

  removeNeighbors() {
    this.mapDrawer.removeNeighbors();
  }
}

BuildingOnMap.Zoom = {
  MIN: 0,
  MAX: 21,
  isValid(n) {
    return this.MIN <= n && n <= this.MAX;
  }
};

BuildingOnMap.propTypes = {
  // GoogleMapを表示するためには高さと幅が決まっている必要がある。
  height: P.oneOfType([ P.string, P.number ]).isRequired,
  width: P.oneOfType([ P.string, P.number ]).isRequired,

  latitude: P.number.isRequired,

  longitude: P.number.isRequired,

  initialZoom: (props, name) => {
    const zoom = props[name];
    if (! BuildingOnMap.Zoom.isValid(zoom)) {
      return new Error(`Invalid zoom value: ${zoom}`);
    }
  },

  neighbors: P.array,

  radius: P.number
};
