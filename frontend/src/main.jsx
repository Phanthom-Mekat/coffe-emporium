import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffe from './components/UpdateCoffe.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AuthProvider from './components/provider/AuthProvider.jsx';
import Users from './components/Users.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => fetch('https://coffe-backend.vercel.app/coffee')
  },
  {
    path: "addcoffee",
    element: <AddCoffee />
  },
  {
    path: "updatecoffee/:id",
    element: <UpdateCoffe />,
    loader: ({ params }) => fetch(`https://coffe-backend.vercel.app/coffee/${params.id}`)
  }, {
    path: "login",
    element: <Login />
  }, {
    path: "register",
    element: <Register />,

  },{
    path:"users",
    element:<Users/>,
    loader: ()=> fetch('https://coffe-backend.vercel.app/users')
  }

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
