import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { Link } from 'react-router-dom';


function App() {
  const [threads, setThreads] = useState([]); // スレッドデータの状態管理

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await response.json();
        setThreads(data); // APIから取得したデータをセット
      } catch (error) {
        console.error('エラー:', error);
      }
    };

    fetchThreads();
  }, []); // []を指定することでコンポーネントのマウント時に一度だけ実行

  return (
    <div className="App">
      <Header threads={threads} />
      <div className="thread-list">
        <h1>新着スレッド</h1>
        {threads.length > 1 ? (
          threads.map(thread => (
            <div key={thread.id} className="thread-card">
              
              <Link to={`/threads/${thread.id}`} className="toukou">{thread.title}</Link>
            </div>
          ))
        ) : (
          <p>スレッドが見つかりません。</p>
        )}
      </div>
    </div>
  );
  
}

export default App;
