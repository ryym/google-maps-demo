import React from 'react';
import BuildingDetail from './BuildingDetail';

// XXX: Hard coding data.
const buildingInfo = {
  name: '元渕江公園',
  address: '東京都足立区保木間2丁目17-1',
  latitude: 35.792621,
  longitude: 139.806513,
};

/**
 * 建物の詳細情報コンポーネントを管理するコンポーネント
 * 受け取ったIDの建物情報をサーバから取得し、`BuildingDetail`にプロパティとして
 * 渡す。こうする事で、`BuildingDetail`に状態を持たせないようにする。
 */
export default class BuildingDetailContainer extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      neighbors: undefined, // XXX: Should be '[]'
      radius: undefined,
      neighborsDisplayed: false
    };
  }

  render() {
    const { neighbors, radius } = this.state;
    return (
      <div>
        <a href="/#/">Home</a>
        <div>
          <span>Building of {this.props.params.id}</span>
          {this.renderButton()}
        </div>
        <BuildingDetail {...buildingInfo} neighbors={neighbors} radius={radius} />
      </div>
    )
  }

  renderButton() {
    if (this.state.neighborsDisplayed) {
      return (
        <button onClick={() => this.hideNeighbors()}>
          周辺情報を隠す
        </button>
      );
    }

    return (
      <button onClick={() => this.displayNeighbors()}>
        周辺の建物を表示する
      </button>
    );
  }

  displayNeighbors() {
    this.setState({
      neighbors: [
        [ 35.791976, 139.811780 ],
        [ 35.797128, 139.806029 ],
      ],
      radius: 800,
      neighborsDisplayed: true
    });
  }

  hideNeighbors() {
    this.setState({
      neighbors: undefined,
      radius: undefined,
      neighborsDisplayed: false
    })
  }
}
