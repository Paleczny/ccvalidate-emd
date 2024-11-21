import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/layout'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
