/**
 * Google Maps API を使用して建物情報を
 * マップに描画するサービス
 */
export default class BuildingMapDrawer {
  constructor(mapElement, configs) {
    if (typeof window.google === 'undefined') {
      throw new Error('Please load Google Maps API script in HTML!');
    }

    const { latitude, longitude, zoom } = configs;
    const center = new google.maps.LatLng(latitude, longitude);
    const map = new google.maps.Map(mapElement, { center, zoom });

    this._mainLatLng = center;
    this._map = map;
    this._markers = [];
    this._circle = undefined;

    this.addMarkers(center);
  }

  displayNeighbors(radius, positions) {
    this.addMarkers(...positions);
    this.drawCircleAroundMainBuilding({ radius });
  }

  removeNeighbors() {
    this.removeMarkers();
    this.removeCircle();
    this.addMarkers(this._mainLatLng);
  }

  /**
   * @param {...(google.maps.LatLng | Object)} positions
   */
  addMarkers(...positions) {
    const map = this._map;
    const markers = positions.map(position => {
      return new google.maps.Marker({ map, position });
    });
    this._markers = this._markers.concat(markers);
  }

  /**
   * @param {...google.maps.Marker} targets
   */
  removeMarkers(...targets) {
    if (targets.length === 0) {
      targets = this._markers;
    }
    targets.forEach(marker => {
      marker.setMap(null);
    });
    this._markers = this._markers.filter(
      m => ! targets.includes(m)
    );
  }

  drawCircleAroundMainBuilding(userOpts) {
    const options = Object.assign(
      {}, this._defaultCircleOpts(), userOpts
    );
    this._circle = new google.maps.Circle(options);
  }

  removeCircle() {
    if (this._circle) {
      this._circle.setMap(null);
      this._circle = undefined;
    }
  }

  _defaultCircleOpts() {
    return {
      map: this._map,
      radius: 1000,
      center: this._mainLatLng,
      fillOpacity: 0.1,
      fillColor: '#555',
      strokeWeight: 1,
      strokeOpacity: 0.5,
      strokeColor: '#D36015'
    };
  }
}
