import React from "react";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <div className="text-white">
            <h3 className="text-center">&copy; Copyright {currentYear}</h3>
        </div>
    );
}

export default Footer;