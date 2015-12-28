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
