import React from 'react';

export default class CommonHeader extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <div className="mdl-layout-title">
            <a id="header-logo-link" href="/#/">Google Maps API Demo</a>
          </div>
          <button
            id="header-btn"
            className="mdl-button mdl-js-button mdl-button--icon"
          >
            <i className="material-icons">account_circle</i>
          </button>
          <ul
            className="mdl-menu mdl-js-menu mdl-menu--bottom-right"
            htmlFor="header-btn"
          >
            <li className="mdl-menu__item">アカウント情報</li>
            <li className="mdl-menu__item">ログアウト</li>
          </ul>
        </div>
      </header>
    );
  }
}
