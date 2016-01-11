/**
 * Google Maps API を使用して建物情報を
 * マップに描画するサービス
 */
export default class BuildingMapDrawer {
  constructor(mapElement, configs) {
    if (typeof window.google === 'undefined') {
      throw new Error('Please load Google Maps API script in HTML!');
    }

    const { building, zoom } = configs;
    const center = new google.maps.LatLng(
      building.latitude,
      building.longitude
    );
    const map = new google.maps.Map(mapElement, { center, zoom });

    this._centerBld = building;
    this._map = map;
    this._markers = [];
    this._circle = undefined;

    this.markBuildings([building]);
  }

  displayNeighbors(radius, neighbors) {
    this.markBuildings(neighbors, { opacity: 0.6 });
    this.drawCircleAroundMainBuilding({ radius });
  }

  removeNeighbors() {
    if (1 < this._markers.length) {
      this.removeMarkers();
      this.removeCircle();
      this.markBuildings([this._centerBld]);
    }
  }

  /**
   * @param {Object[]} buildings
   */
  markBuildings(buildings, userOpts) {
    const map = this._map;
    const markers = buildings.map(b => {
      const options = Object.assign(
        {
          map,
          position: { lat: b.latitude, lng: b.longitude }
        }, userOpts
      );
      return this.addBuildingMarker(b, options);
    });
    this._markers = this._markers.concat(markers);
  }

  addBuildingMarker(building, options) {
    const marker  = new google.maps.Marker(options);
    const infoWin = new google.maps.InfoWindow({
      content: this._makeInfoWindowContent(building),
      position: options.position,
      pixelOffset: new google.maps.Size(0, -40)
    });

    google.maps.event.addListener(marker, 'click', e => {
      infoWin.open(this._map);
    });

    return marker;
  }

  _makeInfoWindowContent(building) {
    if (building.id === this._centerBld.id) {
      return building.name;
    }
    return `
      <a href="/#/detail/${building.id}" class="gmd-bld-link">
        ${building.name}
      </a>
    `;
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
      center: {
        lat: this._centerBld.latitude,
        lng: this._centerBld.longitude
      },
      fillOpacity: 0.1,
      fillColor: '#555',
      strokeWeight: 1,
      strokeOpacity: 0.5,
      strokeColor: '#D36015'
    };
  }
}
