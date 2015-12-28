import React from 'react';
import BuildingDetail from './BuildingDetail';

// XXX: Hard coding data.
const buildingInfo = {
  name: '元渕江公園',
  address: '東京都足立区保木間2丁目17-1',
  latitude: 35.792621,
  longitude: 139.806513,

  neighbors: [
    [ 35.791976, 139.811780 ],
    [ 35.797128, 139.806029 ],
  ],
  radius: 800
};

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BuildingDetail {...buildingInfo} />
      </div>
    );
  }
}
