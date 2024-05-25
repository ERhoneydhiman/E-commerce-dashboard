import './App.css';
import { RouterProvider , createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';

import Layout from './comps/Layout';
import Products from './comps/Products';
import AddProduct from './comps/AddProduct';
import UpdateProduct from './comps/UpdateProduct';
import Profile from './comps/Profile';
import Logout from './comps/Logout';
import SignUp from './comps/SignUp';
import PrivateComp from './comps/PrivateComp';
import Login from './comps/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<PrivateComp/>}>
    <Route path='/' element={<Layout />}>
       <Route path='' element={<Products/>}/>
       <Route path='/addproduct' element={<AddProduct/>}/>
       <Route path='/updateproduct/:id' element={<UpdateProduct/>}/>
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/logout' element={<Logout/>}/>
    </Route>
    </Route>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>

    </>
  )
)
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
