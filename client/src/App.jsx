
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import "tailwindcss";
import DashBoard_HomePage from './Pages/DashBoard_HomePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import Page404 from './Pages/Page404';
import CreateNewTaskPage from './Pages/CreateNewTaskPage';
import NewTaskPage from './Pages/NewTaskPage';
import CompletedTaskPage from './Pages/CompletedTaskPage';
import InProgressTaskPage from './Pages/InProgressTaskPage';
import CanceledTaskPage from './Pages/CanceledTaskPage';
import PrivateRoutes from './Components/PrivateRoutes';
import UpdateProfilePage from './Pages/UpdateProfilePage';
import UpdatedTaskPage from './Pages/UpdatedTaskPage';


const appRouter = createBrowserRouter([

  {
    path: '/',
    element: <PrivateRoutes> <DashBoard_HomePage /> </PrivateRoutes>
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
    path: '/update-profile',
    element: <UpdateProfilePage />
  },

  {
    path: '/create-new-task',
    element: <PrivateRoutes> <CreateNewTaskPage /> </PrivateRoutes>
  },

  {
    path: '/new-task',
    element: <PrivateRoutes> <NewTaskPage /> </PrivateRoutes>
  },

  {
    path: '/completed-task',
    element: <PrivateRoutes> <CompletedTaskPage /> </PrivateRoutes>
  },

  {
    path: '/inprogress-task',
    element: <PrivateRoutes> <InProgressTaskPage /> </PrivateRoutes>
  },

  {
    path: '/canceled-task',
    element: <PrivateRoutes> <CanceledTaskPage /> </PrivateRoutes>
  },

  {
    path: '/updated-task/:id',
    element: <PrivateRoutes> <UpdatedTaskPage/> </PrivateRoutes>
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
