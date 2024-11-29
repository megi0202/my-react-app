import React, { useState } from 'react'; // useState をインポート
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import './NewThread.css';

const NewThread = () => {
  const [title, setTitle] = useState(''); // スレッドタイトルの状態
  const [threads, setThreads] = useState([]); 
  const navigate = useNavigate(); // ナビゲート用

  // フォーム送信時に呼ばれる関数
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://railway.bulletinboard.techtrain.dev/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const newThread = await response.json();
        console.log('New thread created:', newThread); // 新しく作成したスレッドの内容を確認
        navigate('/'); // スレッド一覧画面に遷移
      } else {
        const errorData = await response.json();
        console.error('スレッドの作成に失敗しました', errorData);
      }
    } catch (error) {
      console.error('エラーが発生しました', error);
    }
  };

  return (
    <div className="board">
      <Header threads={threads} />
      <h1 className="title">スレッド新規作成</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="nyuuryoku"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // タイトルを更新
          placeholder="スレッドのタイトルを入力"
          required
        />
        <div className="buttons">
          <Link to="/" className="modoru">Topに戻る</Link>
          <button type="submit" className="button-submit">作成</button>
        </div>
      </form>
    </div>
  );
};

export default NewThread;
