import React from 'react';

export default class CommonFooter extends React.Component {
  render() {
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
}
