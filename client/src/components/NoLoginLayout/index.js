import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />  {/* Child routes will be rendered here */}
        </div>
    );
};

export default MainLayout;
