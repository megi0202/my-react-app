import React from 'react';
import ReactDOM from 'react-dom/client'; // react-domではなくreact-dom/clientを使用
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // パスが正しいことを確認
import NewThread from './NewThread';
import ThreadPosts from './ThreadPosts'; // ファイルパスは適宜変更


// ルートを取得し、ReactDOM.createRootでレンダリングする
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/threads/new" element={<NewThread />} />
        <Route path="/threads/:thread_id" element={<ThreadPosts />} />
        
      </Routes>
    </Router>
  </React.StrictMode>
);
