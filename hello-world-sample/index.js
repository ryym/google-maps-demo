
var $canvas = document.getElementById('map-canvas');

// 位置座標(緯度、経度)オブジェクトを作る。
var latlng = new google.maps.LatLng(
  35.792621,
  139.806513
);

// 地図のオプションを指定する。
var mapOptions = {
  zoom: 15,
  center: latlng
};

// `$canvas`に地図をレンダリングする。
var map = new google.maps.Map($canvas, mapOptions);


// マーカーオブジェクトを作成する。
// 引数で`map`を指定すれば、インスタンス生成と同時に
// マップにマーカーが表示される。
var marker = new google.maps.Marker({
  position: latlng
});
marker.setMap(map);

// 経線に沿った移動は、南北方向の移動にそのまま対応する。
new google.maps.Marker({
  map: map,
  position: { lat: latlng.lat(), lng: 139.807513 }
})
// 緯線に沿った移動は、必ずしも東西方向の移動に対応するわけではない。
// とはいえ、せまい地域内での緯度と経度を考えるだけなら、それほど
// 深く意識する必要はないはず。
new google.maps.Marker({
  map: map,
  position: { lat: 35.791621, lng: latlng.lng() }
})

// 情報ウィンドウを作成する。
var infoWindow = new google.maps.InfoWindow({
  content: '竹ノ塚駅はここです！!',
  position: new google.maps.LatLng(35.794507, 139.790788)
});

infoWindow.open(map);
// infoWindow.open(map, marker); マーカーに関連づける場合


// 線を描画する。
var polyline = new google.maps.Polyline({
  map: map,
  path: [
    new google.maps.LatLng(35.794507, 139.790788),
    new google.maps.LatLng(35.794007, 139.792788),
    new google.maps.LatLng(35.793507, 139.792788)
  ]
});


// 多角形を作成する。
var polygon = new google.maps.Polygon({
  map: map,
  path: [
    new google.maps.LatLng(35.792507, 139.780788),
    new google.maps.LatLng(35.792007, 139.792788),
    new google.maps.LatLng(35.791507, 139.792788),
    new google.maps.LatLng(35.791007, 139.792768)
  ]
})

// 中心から半径1Kmの円を描画する。
new google.maps.Circle({
  map: map,
  center: latlng,
  radius: 1000
});

// http://easyramble.com/latitude-and-longitude-per-kilometer.html

// 極半径(m)
var POLE_RADIUS = 6356752.314;
// 赤道半径(m)
var EQUATOR_RADIUS = 6378137;

function calcLat() {
  var cf = 2 * Math.PI * POLE_RADIUS;
  var d_lat = 360 * 1000 / cf;
  return d_lat;
}

// 指定された緯度の地点における、1kmあたりの経度を返す。
function calcLng(lat) {
  var r = EQUATOR_RADIUS * Math.cos(lat * Math.PI / 180.0);
  var cf = 2 * Math.PI * r;
  var d_lng = 360 * 1000 / cf;
  return d_lng;
}

// 中心から北に1km進んだポイント
// (つまり上記の円の円周上に位置する点)にマーカーを置く。
new google.maps.Marker({
  map: map,
  position: {
    lat: latlng.lat() + calcLat(),
    lng: latlng.lng()
  }
});

// 中心から西に1km進んだポイント
// (つまり上記の円の円周上に位置する点)にマーカーを置く。
new google.maps.Marker({
  map: map,
  position: {
    lat: latlng.lat(),
    lng: latlng.lng() - calcLng( latlng.lat() )
  }
});

