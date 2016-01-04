import React from 'react';
import CommonHeader from '../CommonHeader';
import CommonFooter from '../CommonFooter';

export default class BuildingDetailLayout extends React.Component {
  render() {
    return (
      <div>
        <div className="
          gmd-container mdl-layout mdl-js-layout
          mdl-layout--fixed-header mdl-layout--fixed-drawer"
        >
          <CommonHeader />
          {this.renderDrawer()}
          <main id="detail-container" className="mdl-layout__content">
            {this.props.children}
            <CommonFooter />
          </main>
        </div>
      </div>
    );
  }

  renderDrawer() {
    return (
      <div
        id="gmd-drawer"
        className="mdl-layout__drawer mdl-shadow--4dp mdl-color--blue-grey-800"
      >
        <div className="mdl-layout-title
          mdl-color--blue-grey-900 mdl-color-text--blue-grey-400"
        >
          <i className="material-icons">label</i>B-012345
        </div>
        <nav className="gmd-detail__navigation mdl-navigation">
          <a href="#" className="mdl-navigation__link">
            <i className="material-icons gmd-detail__navigation__icon">home</i>
            <span>建物情報</span>
          </a>
          <a href="#" className="mdl-navigation__link">
            <i className="material-icons gmd-detail__navigation__icon">build</i>
            <span>工事情報</span>
          </a>
          <a href="#" className="mdl-navigation__link">
            <i className="material-icons gmd-detail__navigation__icon">person</i>
            <span>お客様情報</span>
          </a>
          <a href="#" className="mdl-navigation__link">
            <i className="material-icons gmd-detail__navigation__icon">flag</i>
            <span>リフォーム履歴</span>
          </a>
          <a href="#" className="mdl-navigation__link">
            <i className="material-icons gmd-detail__navigation__icon">verified_user</i>
            <span>点検・保証</span>
          </a>
          <a href="#" className="mdl-navigation__link">
            <i className="material-icons gmd-detail__navigation__icon">work</i>
            <span>アップロード書類</span>
          </a>
          <a href="#" className="mdl-navigation__link">
            <i className="material-icons gmd-detail__navigation__icon">photo_camera</i>
            <span>外観写真</span>
          </a>
          <a href="#" className="mdl-navigation__link">
            <i className="material-icons gmd-detail__navigation__icon">info_outline</i>
            <span className="mdl-badge" data-badge="1">お知らせ</span>
          </a>
        </nav>
      </div>
    );
  }
}
