
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
