import * as ReactDOM from 'react-dom/client'
import App from './App'; // 相対パスが正しいか確認

const root = document.getElementById('root')
const reactRoot = ReactDOM.createRoot(root)
reactRoot.render(<App />)
