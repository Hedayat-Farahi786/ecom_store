import React from "react";

const NavbarCart = () => {
  return (
    <div
    tabIndex={0}
    className="card card-compact dropdown-content bg-base-100 w-max z-[1] mt-20 shadow"
  >
    <div className="card-body inline-block px-4">
      <p>Your Shopping Bag is empty!</p>
    </div>
  </div>
  );
};

export default NavbarCart;
