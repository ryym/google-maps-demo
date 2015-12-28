import {
  default as React,
  PropTypes as P
} from 'react';
import BuildingOnMap from './BuildingOnMap';

/**
 * 指定された建物の情報を、地図とともに表示するコンポーネント
 */
export default class BuildingDetail extends React.Component {
  render() {
    const { latitude, longitude } = this.props;
    const mapProps = {
      height: 300,
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
        <BuildingOnMap {...mapProps} />
      </div>
    );
  }
}

BuildingDetail.propTypes = {
  name: P.string.isRequired,
  address: P.string.isRequired,
  latitude: P.number.isRequired,
  longitude: P.number.isRequired,
};
