import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './App/store'; 
import './index.css';
import Login from './Page/Login';
import Signin from './Page/Signin';
import Home from './Page/Home';
import Explore from './Page/Explore';
import Reels from './Page/Reels';
import Message from './Page/Message';
import Profile from './Page/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/sign', element: <Signin /> },
      { path: '/home', element: <Home /> },
      { path: '/explore', element: <Explore /> },
      { path: '/reels', element: <Reels /> },
      { path: '/messages', element: <Message /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
