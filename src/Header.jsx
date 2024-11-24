import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Header({ threads }) {
  return (
    <div className="header">
      <h1 className="keiziban">掲示板</h1>
      <Link to="/threads/new" className="sakusei">スレッド新規作成</Link>
    </div>
  );
}

export default Header;