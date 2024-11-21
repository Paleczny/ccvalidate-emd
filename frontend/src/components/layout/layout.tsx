import {Outlet} from "react-router-dom";
import React from "react";
import {Header, Footer} from "./";

const Layout = () => {
    return (
        <div className='d-flex flex-column min-vh-100 bg-secondary bg-opacity-25 p-4'>
            <Header/>
            <main className='flex-grow-1'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout