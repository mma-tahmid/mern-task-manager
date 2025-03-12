
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import "tailwindcss";
import DashBoard_HomePage from './Pages/DashBoard_HomePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import Page404 from './Pages/Page404';
import CreateNewTaskPage from './Pages/CreateNewTaskPage';


const appRouter = createBrowserRouter([

  {
    path: '/',
    element: <DashBoard_HomePage />
  },

  {
    path: '/registration',
    element: <RegistrationPage />
  },

  {
    path: '/login',
    element: <LoginPage />
  },

  {
    path: '/create-new-task',
    element: <CreateNewTaskPage />
  },



  {
    path: '*',
    element: <Page404 />
  }, // react latest version automatic detect wrong routing path

])





function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
