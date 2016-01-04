import React from 'react';

export default class BuildingDetailLayout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
