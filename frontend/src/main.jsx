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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader:()=>fetch('http://localhost:5000/coffee')
  },
  {
    path: "addcoffee",
    element:<AddCoffee/>
  },
  {
    path: "updatecoffee/:id",
    element:<UpdateCoffe/>,
    loader:({params})=>fetch(`http://localhost:5000/coffee/${params.id}`)
  }

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
