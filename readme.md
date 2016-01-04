# Google Maps API Demo

## やりたい事

例えば建物情報を管理するシステムにおいて、ある建物の位置を地図上に
表示するとともに、その周辺にある他の建物についても一緒に確認できるようにしたい。

## 方法

[Google Maps JavaScript API][google-maps-api-js]を使えば、位置情報をもとにその場所の地図を
ブラウザ上に表示できます。また周辺何Km以内にある建物の検索なども、あらかじめ管理対象の
建物の緯度と経度がわかっていれば実現できます。

(住所から緯度・経度を取得するには、[Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro)
が使えそう)

## デモ内容

サーバーから建物データを取得して画面に表示します。
建物情報画面で「周辺情報を表示」ボタンをクリックすると、サーバーに問い合わせて
その建物の周辺に存在する他の建物情報を合わせて表示します。
実装はかなり粗めです。

## 動作確認

### 事前に必要なもの

[node.js & npm (version 4.x)](https://nodejs.org/en/)

### 実行

`git`でクローンしたディレクトリに移動し、以下のコマンドを実行します。

```sh
# 依存関係をインストールする。クローン後、1度だけ行う。
$ npm install

# クライアントコードをビルドする。
$ npm run build

# サーバーを立ち上げる。立ち上がったら、'localhost:3000'でアクセスできる。
$ npm start
```

## 主な使用技術

* [Google Maps JavaScript API v3][google-maps-api-js]
* [React](https://facebook.github.io/react/)
* [webpack](https://webpack.github.io/)
* [express](http://expressjs.com/)

## NOTE

住所や緯度・経度の値以外、**使用しているデータはデタラメなもの**です。
また無駄に[Material Design Lite](http://www.getmdl.io/)を使ってデザインしてますが、これは
ついでに触ってみたかっただけです。

[google-maps-api-js]: https://developers.google.com/maps/documentation/javascript/
