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
    /**
     * 更に、'mdl-layout__drawer' などのレイアウト要素は、'mdl-layout'要素の直下にいないと
     * 正しく動作しない。こうなると、mdl の要素をReactでコンポーネント化する事が
     * 難しくなる。。(MDL関連クラスをコンポーネントのルートに付けられない以上、別のdivで
     * ラップして返すしかないが、それらを組み合わせると'mdl-layout'と'mdl-layout__xx'の
     * 間に余計な div が挟まる事になる)
     */
    return (
      <div>
        {this.props.children}
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

  componentDidUpdate() {
    componentHandler.upgradeAllRegistered();
  }
}
