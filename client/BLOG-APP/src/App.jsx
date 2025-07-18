import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'; 
import Create from './pages/Create.jsx';
import Update from './pages/Update.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import View from './pages/View.jsx';
import Layout from './components/Layout.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Requireauth from './components/Requireauth.jsx';
import Logout from './pages/Login.jsx';
function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 👈 Layout wraps all children
    children: [
      { path: 'posts', element: <Home /> },
      { path: 'posts/create', element:(
        <Requireauth >
        <Create /> 
        </Requireauth >
      )},
      {path: '/posts', element: <Home />},

      { path: 'posts/update/:id', element:(
      <Requireauth>
      <Update />
    </Requireauth>
    )
      },
           { path: 'posts/view/:id', element:(
      <Requireauth>
      <View />
    </Requireauth>
    )},
      { path: 'posts/signup', element: <Signup /> },
      { path: 'posts/login', element: <Login /> },
       { path: 'posts/logout', element: <Logout/>}
    ]
  }
]);

  return (
    <>
  <ToastContainer autoClose={5000} position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
