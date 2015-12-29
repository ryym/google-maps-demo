import {
  default as React,
  PropTypes as P
} from 'react';
import BuildingOnMap from './BuildingOnMap';

function neighbor(latitude, longitude) {
  return { latitude, longitude };
}

/**
 * 指定された建物の情報を、地図とともに表示するコンポーネント
 */
export default class BuildingDetail extends React.Component {
  render() {
    if (! this.props.building) {
      return <div>Loading...</div>;
    }
    const { neighbors, radius } = this.props;
    const b = this.props.building;

    const mapProps = {
      height: 400,
      width: 500,
      latitude: b.latitude,
      longitude: b.longitude,
      initialZoom: 15
    };

    return (
      <div>
        <h1>建物情報</h1>
        <h2>{b.name}</h2>
        <div>{b.address}</div>
        <BuildingOnMap {...mapProps} neighbors={neighbors} radius={radius} />
      </div>
    );
  }
}

BuildingDetail.propTypes = {
  building: P.object,
  neighbors: P.array,
  radius: P.number
};
