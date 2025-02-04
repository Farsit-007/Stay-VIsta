import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashbpoardLayout from '../layouts/DashbpoardLayout'
import Statictics from '../components/Dashboard/Common/Statictics'
import AddRoom from '../components/Dashboard/Host/AddRoom'
import MyListings from '../components/Dashboard/Host/MyListings'
import Profile from '../pages/Profile/Profile'
import ManageUsers from '../components/Dashboard/Admin/ManageUsers'
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'
import MyBookings from '../components/Dashboard/Guest/MyBookings/MyBookings'
import ManageBookings from '../components/Dashboard/Host/ManageBookings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails /></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path : '/dashboard',
    element:<PrivateRoute><DashbpoardLayout></DashbpoardLayout></PrivateRoute>,
    children : [
      {
        index : true,
        element : <PrivateRoute><Statictics></Statictics></PrivateRoute>,
      },
      {
        path : 'add-room',
        element : <PrivateRoute><HostRoute><AddRoom></AddRoom></HostRoute></PrivateRoute>,
      }
      ,
      {
        path : 'my-listings',
        element : <PrivateRoute><HostRoute><MyListings></MyListings></HostRoute></PrivateRoute>,
      }
      ,
      {
        path : 'manage-users',
        element :<PrivateRoute> <AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>,
      }
      
      ,
      {
        path : 'profile',
        element : <PrivateRoute><Profile></Profile></PrivateRoute>,
      }
      ,
      {
        path : 'my-bookings',
        element : <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
      }
      ,
      {
        path : 'manage-bookings',
        element : <PrivateRoute><HostRoute><ManageBookings></ManageBookings></HostRoute></PrivateRoute>,
      }
    ]
  }
])
