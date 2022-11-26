import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import BuyerOrders from "../../Pages/Dashboard/BuyerOrders/BuyerOrders";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import SingleCategories from "../../Pages/Home/Categories/SingleCategories";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import Signup from "../../Pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/singleCategories/:id',
                element: <PrivateRoute><SingleCategories></SingleCategories></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/dashboard/myOrders',
                element: <PrivateRoute><BuyerOrders></BuyerOrders></PrivateRoute>
            },
            {
                path: '/dashboard/AllBuyers',
                element: <PrivateRoute><AdminRoute><AllBuyers></AllBuyers></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/AllSellers',
                element: <PrivateRoute><AdminRoute><AllSellers></AllSellers></AdminRoute></PrivateRoute>
            }
        ]
    }
])

export default router