import React from "react";
import Navbar from "../components/home/common/Navbar";
import Footer from "../components/home/common/Footer";

const HomeLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default HomeLayout;
