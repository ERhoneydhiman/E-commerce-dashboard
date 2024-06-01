import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const auth = localStorage.getItem("user");
  const [sidebar, setSidebar] = useState(false);
  const [menuBtn, setMenuBtn] = useState(true);

  const resetSidebar = () => {
    setSidebar(false);
    setMenuBtn(true);
  };

  const showSidebar = () => {
    setMenuBtn(!menuBtn);
    setSidebar(!sidebar);
  };
  return (
    <>
      <div className="header">
        <h1>E-Commerce Deshboard</h1>
        <div className="nav">
          <ul>
            <li>
              <Link to="/" id="product-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2rem"
                  viewBox="0 -960 960 960"
                  width="2rem"
                  fill="#FFFFFF"
                >
                  <path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
                </svg>
                Products
              </Link>
            </li>
            <li>
              <Link to="/addproduct" id="add-product-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2rem"
                  viewBox="0 -960 960 960"
                  width="2rem"
                  fill="#FFFFFF"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
                <p>Add Products</p>
              </Link>
            </li>
            <li>
              <Link to="/profile" id="profile-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2rem"
                  viewBox="0 -960 960 960"
                  width="2rem"
                  fill="#FFFFFF"
                >
                  <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                </svg>
                <p>Profile</p>
              </Link>
            </li>
          </ul>
        </div>
        <button id="sidebar-btn" onClick={showSidebar}>
          {menuBtn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
              fill="#FFFFFF"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
              fill="#FFFFFF"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          )}
        </button>
      </div>
      <div className={`sidebar ${sidebar ? "show" : ""}`}>
        <div className="side">
          <ul>
            <li>
              <Link onClick={resetSidebar} to="/profile" id="profile-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="3rem"
                  viewBox="0 -960 960 960"
                  width="3rem"
                  fill="#0d2738"
                >
                  <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                </svg>
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <Link onClick={resetSidebar} to="/" id="product-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="3rem"
                  viewBox="0 -960 960 960"
                  width="3rem"
                  fill="#0d2738"
                >
                  <path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
                </svg>
                Products
              </Link>
            </li>
            <li>
              <Link
                onClick={resetSidebar}
                to="/addproduct"
                id="add-product-logo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="3rem"
                  viewBox="0 -960 960 960"
                  width="3rem"
                  fill="#0d2738"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
                <p>Add Products</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
