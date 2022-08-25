import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');

const root = createRoot(container!);

const App = lazy(
  () =>
    import(
      /* webpackChunkName: "App" */ "../src/App"
    )
);

root.render(
  <Suspense fallback={<div className='w-screen h-screen'></div>}>
    <App />
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
