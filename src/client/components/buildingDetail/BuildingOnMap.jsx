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

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.building.id !== nextProps.building.id) {
      this.initializeMap(nextProps);
    }
  }

  componentDidUpdate() {
    if (this._shouldDisplayNeighbors()) {
      this.displayNeighbors();
    } else {
      this.removeNeighbors();
    }
  }

  componentDidMount() {
    this.initializeMap(this.props);
    if (this._shouldDisplayNeighbors()) {
      this.displayNeighbors();
    }
  }

  initializeMap({ building, initialZoom }) {
    const mapElement = document.getElementById('google-map');
    this.mapDrawer = new BuildingMapDrawer(mapElement, {
      building,
      zoom: initialZoom
    });
  }

  displayNeighbors() {
    const { radius, neighbors } = this.props;
    this.mapDrawer.displayNeighbors(radius, neighbors);
  }

  removeNeighbors() {
    this.mapDrawer.removeNeighbors();
  }

  _shouldDisplayNeighbors() {
    const { neighbors, radius } = this.props;
    return 0 < neighbors.length && radius;
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
  /**
   * 無駄に何度もGoogle Maps をレンダリングしてしまわないよう、
   * このコンポーネントがアップデートされるべきタイミングを
   * 親コンポーネントが指定できるようにする。
   */
  shouldUpdate: P.bool.isRequired,

  // GoogleMapを表示するためには高さと幅が決まっている必要がある。
  height: P.oneOfType([ P.string, P.number ]).isRequired,
  width: P.oneOfType([ P.string, P.number ]).isRequired,

  building: P.object.isRequired,

  initialZoom: (props, name) => {
    const zoom = props[name];
    if (! BuildingOnMap.Zoom.isValid(zoom)) {
      return new Error(`Invalid zoom value: ${zoom}`);
    }
  },

  neighbors: P.array.isRequired,

  radius: P.number
};
