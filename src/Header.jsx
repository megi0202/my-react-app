import React from 'react';

function Header({ threads }) {
  return (
    <div className="header">
      <h1 className="keiziban">掲示板</h1>
      <div className="thread-sakusei">
        <h2>{threads.length > 0 ? threads[0].title : '新規作成画面'}</h2>
      </div>
    </div>
  );
}

export default Header;