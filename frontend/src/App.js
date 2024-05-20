import './App.css';
import { RouterProvider , createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';

import Layout from './comps/Layout';
import Products from './comps/Products';
import AddProducts from './comps/AddProducts';
import Profile from './comps/Profile';
import Logout from './comps/Logout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
       <Route path='' element={<Products/>}/>
       <Route path='/addproduct' element={<AddProducts/>}/>
       <Route path='/updateproduct' element={<AddProducts/>}/>
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/logout' element={<Logout/>}/>
    </Route>
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
