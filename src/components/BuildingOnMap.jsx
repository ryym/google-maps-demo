import {
  default as React,
  PropTypes as P
} from 'react';

/**
 * Google Maps API を使用して、指定されたプロパティをもとに
 * 地図を描画するコンポーネント。
 * `react`用の`google-maps-api`ライブラリも既にあったが、
 * 今回はひとまず自力で行う。
 * また`npm`経由でGoogleオブジェクトを取得しようとすると非同期でしかできなさげなので、
 * とりあえずHTMLでライブラリを読み込み、トップレベルに`google`を置く方針でいく。
 */

// 描画するもの:
//  Required:
//    メインとなる住所。中心に表示する。(latitude, longitude, initialZoom)
//  Optional:
//    周辺の住所。latlngの配列と、表示範囲の半径(単位何?)を受け取る。
//    メインの建物とは別の色のマーカーを指定された全座標に設置し、
//    指定された半径で円を描く。

export default class BuildingOnMap extends React.Component {
  constructor(...args) {
    super(...args);

    if (typeof global.google === 'undefined') {
      throw new Error('Please load Google Maps API script in HTML!');
    }
    this._map = undefined;
    this._markers = [];
    this._circle = undefined;
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

    const bldLatlng = new google.maps.LatLng(latitude, longitude);
    const map = new google.maps.Map(mapElement, {
      center: bldLatlng,
      zoom: initialZoom
    });
    this._map = map;

    new google.maps.Marker({
      map,
      position: bldLatlng
    });

    if (this.props.neighbors && this.props.radius) {
      this.displayNeighbors(map);
    }
  }

  displayNeighbors(map) {
    this._circle = new google.maps.Circle({
      map,
      radius: this.props.radius,
      center: map.getCenter(),
      fillOpacity: 0.1,
      fillColor: '#555',
      strokeWeight: 1,
      strokeOpacity: 0.5,
      strokeColor: '#D36015'
    });

    this._markers = this.props.neighbors.map(coord => {
      return new google.maps.Marker({
        map,
        position: new google.maps.LatLng(...coord)
      });
    });
  }

  removeNeighbors() {
    this._markers.forEach(m => {
      m.setMap(null);
    });
    this._circle.setMap(null);
    this._markers = [];
    this._circle = undefined;
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
  height: P.number.isRequired,
  width: P.number.isRequired,

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
