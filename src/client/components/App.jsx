import React from 'react';

export default class App extends React.Component {
  render() {
    /**
     * Note: MDLの 'mdl-layout' クラスをrender() が返すルートのエレメント
     * に付与すると、react-router で画面を書き換える度に警告が表示されるため、
     * 'mdl-layout' の要素を更に div でラップして返すようにする。
     *
     * see: http://stackoverflow.com/questions/31998227/using-material-design-lite-with-react
     */
    return (
      <div>
        <div className="
          gmd-container mdl-layout mdl-js-layout mdl-layout--fiexed-header"
        >
          {this.renderHeader()}
          <main className="mdl-layout__content">
            {this.props.children}
            {this.renderFooter()}
          </main>
        </div>
      </div>
    );
  }

  renderHeader() {
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

  renderFooter() {
    return (
      <footer id="gmd-footer" className="mdl-mini-footer">
        <ul className="mdl-mini-footer__link-list">
          <li><a href="#">会社概要</a></li>
          <li><a href="#">サイトマップ</a></li>
          <li><a href="#">お問い合わせ</a></li>
        </ul>
      </footer>
    );
  }

  componentDitMount() {
    // window.onloadイベント終了後に追加されたDOMに対して
    // material-design-lite の JS を正しく動かすためには、
    // 下記のグローバルオブジェクトを使って対象要素を更新する必要がある。
    // 'compoenntHandler.upgradeElement(element);'

    // XXX: DRY ..extends? decorator? flux?
    componentHandler.upgradeAllRegistered();
  }
}
