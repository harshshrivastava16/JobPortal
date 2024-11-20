import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Browse from './components/shared/Browse'
import Jobs from './components/shared/Jobs'
import Profile from './components/shared/Profile'
import JobDescription from './components/shared/JobDescription'
import Companies from './admin/Companies'
import CompanyCreate from './admin/CompanyCreate'
import CompanySetup from './admin/CompanySetup'
import AdminJobs from './admin/AdminJobs'
import Applicants from './admin/Applicants'
import ProtectedRoute from './admin/ProtectedRoute'
import PostJob from './admin/PostJob'

const appRouter = createBrowserRouter([
  {

    path:'/',
    element:<Home/>
  },
  {

    path:'/login',
    element:<Login/>
  },
  {

    path:'/signup',
    element:<Signup/>
  },
{
  path:'/jobs',
  element:<Jobs/>

},
{
  path:'/browse',
  element:<Browse/>
},
{
  path:'/profile',
  element:<Profile/>
},
{
  path:'/description/:id',
  element:<JobDescription/>
},
{
  path:"/admin/companies",
  element: <ProtectedRoute><Companies/></ProtectedRoute>
},
{
  path:"/admin/companies/create",
  element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
},
{
  path:"/admin/companies/:id",
  element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  
},
{
  path:"/admin/jobs",
  element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
},
{
  path:"/admin/jobs/create",
  element:<ProtectedRoute><PostJob/></ProtectedRoute> 
},
{
  path:"/admin/jobs/:id/applicants",
  element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  
},
])

const App = () => {
  return (
    <>
    <RouterProvider router ={appRouter}/>
    </>
  )
}

export default App