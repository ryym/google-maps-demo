# Hello, Google Maps API

まずは以下の紹介記事をもとに、APIを触ってみる。
依存関係やサーバー処理はなしで、HTMLを表示するだけで動きを確認できるようにする。

[Google Maps JavaScript API v3 の使い方まとめ](https://syncer.jp/google-maps-javascript-api-matome)

----

# 上記サンプルで書かれている事

## Mapクラス

地図を表すクラス。

```javascript
var map = new google.maps.Map(canvasElement, mapOptions);
```

* オプション一覧

    `zoom`, `center`は必須

* インスタンスメソッド一覧

    JavaScript上で地図を操作できる。

* イベント一覧

    地図上のユーザーアクションに応じたイベントを補足できる。

    ```javascript
    google.maps.event.addListener(map, 'bounds_changed', function() {
      console.log('Bounds are changed!');
    })
    ```

## Markerクラス

地図上に設置可能なマーカー(ピン)を表すクラス。

```javascript
new google.maps.Marker(markerOption);
```

* オプション一覧
* メソッド一覧
* イベント一覧

## InfoWindowクラス

地図上にポップアップでメッセージを表示するためのクラス。

```javascript
var infoWindow = new google.maps.InfoWindow(windowOptions);
```

* オプション一覧
* メソッド一覧
* イベント一覧

## 図形描画

### Polylineクラス

地図上に線を引くクラス。

```javascript
var line = new google.maps.Polyline(options);
```

### Polygonクラス

地図上に多角形を作成するクラス。

```javascript
var line = new google.maps.Polygon(options);
```

### Rectangleクラス

地図上に長方形を作成するためのクラス。左下と右上の2点だけ指定すれば良い。

```javascript
new google.maps.Rectangle(options);
```

### Circleクラス

地図上に円を描画するためのクラス。中心座標と半径を指定する。

```javascript
new google.maps.Circle({
  center: latlng,
  radius: 500,
  map: map
});
```

### GroundOverlayクラス

地図上に画像を表示させるためのクラス。

```javascript
var sw = new google.maps.LatLng(35.708194, 139.808565);
var ne = new google.maps.LatLng(35.712280, 139.813619);
var latlngBounds = new google.maps.LatLngBounds(sw, ne);

new google.maps.GroundOverlay('./groundoverlay.png', latlngBounds);

map.fitBounds(latlngBounds);
```


## その他

### APIの使用について

Googleの各種APIを使用するためには、まずGoogleアカウントを取得し、[Google Developers Console][google-dev-console]で
APIを有効化してAPIキーを取得する。そしてAPIを使用する際には常に取得したAPIキーをパラメータとして送信する。
しかし、このAPIキーは必須ではなく、なくても使用できる。ただしキーを使っておくと、
それに基づいてリクエスト回数の統計など様々な情報を入手できるようになる。
