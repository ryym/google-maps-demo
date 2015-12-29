// 極半径(m)
const POLE_RADIUS = 6356752.314;

// 赤道半径(m)
const EQUATOR_RADIUS = 6378137;

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

const LAT_PER_1KM = calcLatPer1km();


export function findNeighborsWithin(meter, centerBld, candidates) {
  const
    centLat = centerBld.latitude,
    centLng = centerBld.longitude;

  const lngPer1km = calcLngPer1km(centLat);

  const diffLat = LAT_PER_1KM * (meter / 1000);
  const diffLng = lngPer1km * (meter / 1000);

  const
    southLat = centLat - diffLat,
    northLat = centLat + diffLat,
    westLng  = centLng - diffLng,
    eastLng  = centLng + diffLng;

  function between(from, to, value) {
    return from <= value && value <= to;
  }

  return candidates.filter(bld => {
      return bld.id != centerBld.id
          && between(westLng, eastLng, bld.longitude)
          && between(southLat, northLat, bld.latitude);
  });
}

