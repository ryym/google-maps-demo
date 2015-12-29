// 一時的。実際にはサーバーサイドで同様の処理を行う。

// 極半径(m)
const POLE_RADIUS = 6356752.314;

// 赤道半径(m)
const EQUATOR_RADIUS = 6378137;

const LAT_PER_1KM = calcLatPer1km();

function calcLatPer1km() {
  const circum = 2 * Math.PI * POLE_RADIUS;
  const degree = 360 * 1000 / circum;
  return degree;
}

function calcLngPer1km(lat) {
  const radius = EQUATOR_RADIUS * Math.cos(lat * Math.PI / 180.0);
  const circum = 2 * Math.PI * radius;
  const degree = 360 * 1000 / circum;
  return degree;
}

function between(from, to, value) {
  return from <= value && value <= to;
}

function withinCircle({ center, radius, target }) {
  const lngPer1km = calcLngPer1km(center.lat);
  const diffLat = LAT_PER_1KM * (radius / 1000);
  const diffLng = lngPer1km * (radius / 1000);

  const
    southLat = center.lat - diffLat,
    northLat = center.lat + diffLat,
    westLng  = center.lng - diffLng,
    eastLng  = center.lng + diffLng;

  return between(westLng, eastLng, target.lng)
      && between(southLat, northLat, target.lat);
}

export default {
  withinCircle
};

