import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<script type="module" src="path/to/your-script.js"></script>


const rootElement = document.getElementById('root'); // id="root" の div を取得

// 要素が存在する場合のみ ReactDOM.createRoot を呼び出す
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found.");
}
