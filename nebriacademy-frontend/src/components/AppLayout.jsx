import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'


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
