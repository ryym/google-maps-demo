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

/**
 * 建物の詳細情報コンポーネントを管理するコンポーネント
 * 受け取ったIDの建物情報をサーバから取得し、`BuildingDetail`にプロパティとして
 * 渡す。こうする事で、`BuildingDetail`に状態を持たせないようにする。
 */
export default class BuildingDetailContainer extends React.Component {
  render() {
    return (
      <div>
        <a href="/#/">Home</a>
        <div>Building of {this.props.params.id}</div>
        <BuildingDetail {...buildingInfo} />
      </div>
    )
  }
}
