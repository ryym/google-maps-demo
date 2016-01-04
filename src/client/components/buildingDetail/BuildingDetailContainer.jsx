import React from 'react';
import BuildingDetailBase from './BuildingDetailBase';
import buildingService from '../../service/buildingService';

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
      neighborsDisplayed: false,
      building: undefined
    };
    this.fetchBuilding(this.props.params.id);
  }

  render() {
    const { building, neighbors, radius } = this.state;
    return (
      <div>
        <BuildingDetailBase
          building={building}
          neighbors={neighbors}
          radius={radius}
        />
      </div>
    );
  }

  fetchBuilding(id) {
    buildingService.findById(id)
      .then(building => {
        this.setState({ building });
      });
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
    const id = this.props.params.id;
    const radius = 1000;

    buildingService.listNeighborsOf(id, radius)
      .then(res => {
        this.setState({
          radius,
          neighbors: res.neighbors,
          neighborsDisplayed: true
        });
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
