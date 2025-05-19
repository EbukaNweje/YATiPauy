import React from "react";
import { Button } from "antd";

const MobileMenu = () => {
  return (
    <div className="MobileMenuContainer">
      <div className="MobilenavList">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contanct Us</li>
        </ul>

        <div className="MobileButtonHolder">
          <Button className="Button">Login</Button>
          <Button>create Account</Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
