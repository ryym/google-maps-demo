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
          {this.props.children}
        </div>
      </div>
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
