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
    const {
      latitude, longitude,
      neighbors, radius
    } = this.props;

    const mapProps = {
      height: 400,
      width: 500,
      latitude,
      longitude,
      initialZoom: 15
    };

    return (
      <div>
        <h1>建物情報</h1>
        <h2>{this.props.name}</h2>
        <div>{this.props.address}</div>
        <BuildingOnMap {...mapProps} neighbors={neighbors} radius={radius} />
      </div>
    );
  }
}

BuildingDetail.propTypes = {
  name: P.string.isRequired,
  address: P.string.isRequired,
  latitude: P.number.isRequired,
  longitude: P.number.isRequired,
  neighbors: P.array,
  radius: P.number
};
