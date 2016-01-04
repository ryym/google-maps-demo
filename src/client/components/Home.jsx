import React from 'react';
import CommonHeader from './CommonHeader';
import CommonFooter from './CommonFooter';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <CommonHeader />
        <main id="home-container" className="mdl-layout__content">
          {this.props.children}
          <CommonFooter />
        </main>
      </div>
    );
  }
}
