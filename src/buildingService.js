import samples from './data/buildings';

import latlngService from './latlngService';

// 最終的には、サーバからデータをフェッチする。

function findById(id) {
  const building = samples[parseInt(id, 10) - 1];
  return Promise.resolve(building);
}

function listAll() {
  return Promise.resolve( Array.from(samples) );
}

function listNeighborsOf(id, maxDistance) {
  return findById(id)
    .then(centerBld => {
      return samples.filter(bld => {
        if (bld.id === parseInt(id, 10)) {
          return false;
        }
        return latlngService.withinCircle({
          radius: maxDistance,
          center: {
            lat: centerBld.latitude,
            lng: centerBld.longitude
          },
          target: {
            lat: bld.latitude,
            lng: bld.longitude
          }
        });
      });
    });
}

export default {
  findById,
  listAll,
  listNeighborsOf,
};
