import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import './ThreadPosts.css';
import Header from './Header';

function ThreadPosts() {
  const { thread_id } = useParams(); // URLからthreadIdを取得

  const [posts, setPosts] = useState([]); // 投稿データの状態管理
  const [newPost, setNewPost] = useState(''); // 新規投稿フォームの状態管理
  const [error, setError] = useState(null); // エラー管理
  const [loading, setLoading] = useState(false); // ローディング状態管理
  const [offset, setOffset] = useState(0); // 投稿のオフセット

  // 投稿データの取得
  const fetchPosts = async (currentOffset) => {
    setLoading(true); // ロード開始
    try {
      const response = await fetch(
        `https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${currentOffset}`
      );
      if (!response.ok) {
        throw new Error('投稿の取得に失敗しました');
      }
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]); // 新しい投稿を追加
      setOffset(currentOffset + 10); // 次のオフセットを設定
    } catch (error) {
      console.error('エラー:', error);
      setError(error.message);
    } finally {
      setLoading(false); // ロード終了
    }
  };

  // 初期投稿の取得
  useEffect(() => {
    fetchPosts(0); // 最初に10件を取得
  }, []); // threadIdが変更されたときに投稿を再取得

  // 新規投稿の送信
  const handleSubmit = async (e) => {
    e.preventDefault(); // ページリロードを防ぐ
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thread_id: thread_id, // スレッドID
          post: newPost, // 新規投稿内容
        }),
      });

      if (!response.ok) {
        throw new Error('投稿の送信に失敗しました');
      }

      const newPostData = await response.json(); // 新規投稿のデータを取得
      setPosts((prevPosts) => [newPostData, ...prevPosts]); // 新規投稿を先頭に追加
      setNewPost(''); // フォームをクリア
    } catch (error) {
      setError(error.message);
    }
  };

  // 次の10件を読み込む
  const loadMorePosts = () => {
    fetchPosts(offset);
  };

  return (
    <div >
      <Header />
      <div className="thread-content">
        <h1 className="thread-title">スレッド投稿一覧</h1>
        {error && <p className="thread-error-message">{error}</p>}

        {/* 投稿フォーム */}
        <form onSubmit={handleSubmit} className="thread-post-form">
          <textarea
            className="thread-post-input"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="投稿内容を入力"
            required
          />
          <button type="submit" className="thread-post-button">投稿する</button>
        </form>

        {/* 投稿一覧 */}
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={`${post.id}-${index}`} className="thread-post-card">
              <p className="thread-post-text">{post.post}</p>
            </div>
          ))
        ) : (
          <p className="thread-no-posts">投稿が見つかりません。</p>
        )}
        
        {/* 次の投稿を読み込むボタン */}
        {posts.length > 0 && !loading && (
          <button onClick={loadMorePosts} className="thread-load-more-button">もっと見る</button>
        )}

        {loading && <p className="thread-loading-message">ロード中...</p>}
        <Link to="/" className="modoru">Topに戻る</Link>
      </div>
    </div>
  );
}

export default ThreadPosts;
