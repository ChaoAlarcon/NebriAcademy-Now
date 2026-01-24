import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'


import TestConnection from './TestConnection';

function AppLayout (){
    return (
         <div className='App'>
        <Nav />  
        <Outlet />
        
        <Footer />
      </div>
    )
}

export default AppLayout;
