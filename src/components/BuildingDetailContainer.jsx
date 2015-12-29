import React from 'react';
import BuildingDetail from './BuildingDetail';
import buildings from '../data/buildings';

// XXX: Hard coding data.
const buildingInfo = buildings[0];

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
        buildings[1],
        buildings[2]
      ],
      radius: 1000,
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
