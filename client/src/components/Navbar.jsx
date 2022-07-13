// import { useSelector } from "react-redux";
// import {React,useState} from "react";
// import { Link } from "react-router-dom"; 
import "./Navbar.css";
// import { GiHamburgerMenu } from 'react-icons/gi'
// import { BsSearch } from 'react-icons/bs'
// import { ImCross } from 'react-icons/im'
// import { Badge } from "@material-ui/core";
// import { Search, ShoppingCartOutlined } from "@material-ui/icons";
// const Navbar = () => {
//   const [click, setClick] = useState(false)
//   const quantity = useSelector((state) => state.cart.quantity);
//   return (
//     <>
//       <nav className='navbar'>
         
//         <div className={click ? "search-icon-responsive" : "search-icon"} onClick={() => setClick(false)}>

//           <input type="search" placeholder="Search" />
//           <label className="icon">
//             <span className="fas fa-search"><BsSearch /></span>
//           </label>

//         </div>
//         <h1 className="logo">EXPENSHOP</h1>
//         <ul className={click ? "nav-links-responsive" : "nav-links"} onClick={() => setClick(false)} >
//         <Link to="/cart" className='cart'>
//             <li>Cart🛒
//             <Badge badgeContent={quantity} color="primary">
//               </Badge>
//               </li>

  
//           </Link>
//           <Link to="/register" className='cart'>
//           <li>SignUp</li>
//         </Link>
//           <Link to="/login" className='cart'>
//             <li>Login</li>
//           </Link>

//         </ul>

//         <div className="mobile-menu-icon" onClick={() => setClick(!click)}>
//           {click ? (<ImCross />) : (<GiHamburgerMenu />)}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiOutlineUserAdd } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/Login",
    name: "Login",
    icon: <FaUser />,
  },
  {
    path: "/Signup",
    name: "SignUp",
    icon: <AiOutlineUserAdd/>,
  },
  {
    path: "/cart",
    name: "Cart",
    icon: <BsFillCartFill />,
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
 
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
 
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "15px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "60px",
            transition: {
              duration: 0.5,
              type: "spring",
             
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                 Bit-Shopping
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;