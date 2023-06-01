import { useState, useRef, useEffect } from "react";
import React from "react";
import {MdCancel } from "react-icons/md";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import { HiHome, HiShoppingBag, HiOutlineSearch } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { IoMdCart } from "react-icons/io";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import navbarImg from '../public/images/navbarimg.jpg'
import styles from '../styles/home.module.css'





const Navbar = ({ cartItems ,clearCart,quantityIncrement,quantityDecrement,removeFromCart}) => {
  const router = useRouter()
  const [mouseEnter, setMouseEnter] = useState(false);
  const searchRef = useRef();
  const cartRef = useRef();
  const { data: session, status: status } = useSession(); //session
  const [accountDetails, setAccountDetails] = useState({
    _type: "usersAccount",
    uName: "",
    uEmail: "",
  });
  const [isDataSendSuccessfully, setIsDataSendSuccessfully] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');


 // cart open funtion
 const cartOpenFunction = () => {
  if (
    cartRef.current.classList.contains("md:translate-x-[40vw]") &&
    cartRef.current.classList.contains("translate-x-[100vw]")
  ) {
    cartRef.current.classList.remove("md:translate-x-[40vw]");
    cartRef.current.classList.remove("translate-x-[100vw]");
    cartRef.current.classList.add("md:translate-x-0");
    cartRef.current.classList.add("translate-x-0");
  } else {
    cartRef.current.classList.add("md:translate-x-[40vw]");
    cartRef.current.classList.add("translate-x-[100vw]");
    cartRef.current.classList.remove("md:translate-x-0");
    cartRef.current.classList.remove("translate-x-0");
  }
};

const handleKeyDown = (e)=>{
  if (e.key === 'Enter') {
    searchProduct(e);
  }
}
 

  useEffect(() => {
    async function sendData() {
      setAccountDetails({
        ...accountDetails,
        uName: session.user.name,
        uEmail: session.user.email,
      });
      try {
        if (
          accountDetails._type != "" &&
          accountDetails.uName != "" &&
          accountDetails.uEmail != ""
        ) {
          const response = await axios.post("/api/insertUserData", {
            data: accountDetails,
          });

          setIsDataSendSuccessfully(true);
        }
        // Handle success (e.g., show a success message to the user)
      } catch (error) {
        if (error.request.status == 400) {
          setIsDataSendSuccessfully(true);
        } else {
          console.error(error);
        }
        // Handle error (e.g., show an error message to the user)
      }
    }
    if (session) {
      if (!isDataSendSuccessfully) {
        sendData();
      }
      // Perform actions for authenticated users here
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const searchProduct = (e) => {
    e.preventDefault();
    setSearchQuery('')
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  // usersign in funtion

  return (
    <nav className={` ${styles.navBarBackgroundImg} w-full shadow-md sticky top-0 left-0 z-50 h-full py-4 sm:h-[65px]  flex items-center p-2`}>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center  px-2 sm:px-10">
        <div className="font-Eczar text-2xl text-white">
          <p>Logo</p>
        </div>

        <div className="flex my-1">
          <div className="flex ml-[15px] px-2 py-1 shadow-sm border-white shadow-white bg-white  rounded-2xl ">
            <input
              value={searchQuery}
              ref={searchRef}
              onChange={(e)=>{setSearchQuery(e.target.value)}}
              className="w-[80%] lg:w-[450px]   px-2 lg:px-2  outline-none rounded-2xl"
              placeholder="Search products..."
              type="text"
              onKeyDown={handleKeyDown}
            />
            <button  onClick={(e)=>searchProduct(e)} className="ml-1 md:ml-2  w-[50px]   text-maron">
              <HiOutlineSearch className="text-xl font-bold mr-auto ml-auto" />
            </button>
          </div>
          <div className="flex items-center">
            <ul className="flex items-center  space-x-6 ml-4">
              <Link href={"/"}>
                {" "}
                <li className="text-2xl flex items-center  justify-center text-white  cursor-pointer pr-1">
                  <HiHome />
                </li>
              </Link>
              <li className="text-2xl flex relative items-center text-white  cursor-pointer pr-1 text-center">
                {
                  // Using Authentication sign Out
                  session && (
                    <div
                      onMouseEnter={() => {
                        setMouseEnter(true);
                      }}
                      onMouseLeave={() => {
                        setMouseEnter(false);
                      }}
                      className="text-lg font-Roboto w-[25px] h-[25px] "
                    >
                      {/* setting profile  */}
                      <Image
                        className="rounded-full border-white border-2 "
                        src={session.user.image}
                        alt={"User"}
                        width={500}
                        height={500}
                      />
                      {mouseEnter && (
                        <div
                          onMouseEnter={() => {
                            setMouseEnter(true);
                          }}
                          onMouseLeave={() => {
                            setMouseEnter(false);
                          }}
                          className="absolute w-[200px] top-7  -left-24 "
                        >
                          <ul className="text-sm p-4 mt-4  bg-white text-lightred shadow-xl rounded-md">
                            <Link href={"/"}>
                              <li className="p-2 hover:bg-lightred hover:text-white rounded-md">
                                Track Your Order
                              </li>
                            </Link>
                            <Link href={"/"}>
                              <li className="p-2 hover:bg-lightred hover:text-white rounded-md">
                                Account
                              </li>
                            </Link>

                            <li
                              onClick={() => signOut()}
                              className="p-2 hover:bg-lightred hover:text-white rounded-md"
                            >
                              LogOut
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                }
                {/* Sign In  */}
                {!session && (
                  <button
                    className="px-2 py-1 rounded-md text-white text-sm bg-lightred hover:bg-lightredhover"
                    onClick={() => {
                      signIn();
                    }}
                  >
                    Login{" "}
                  </button>
                )}
              </li>
              <li
                onClick={cartOpenFunction}
                className="text-2xl relative text-white  cursor-pointer pr-1"
              >
                <IoMdCart />
               {
                (cartItems!=0) && (
                  <span className="absolute animate-bounce text-center flex  justify-center items-center text-xs text-white  font-Eczar h-5 w-5  rounded-full -top-3 right-1">{cartItems.length}</span>
                )
               }
              </li>
            </ul>
          </div>
        </div>

        {/* adding addtocart component */}
        <div
          ref={cartRef}
          className="cart bg-white shadow-3xl fixed min-h-screen h-[100vh] w-[80vw] sm:w-[60vw] md:w-[40vw] top-0 right-0 transition  overflow-auto md:translate-x-[40vw] translate-x-[100vw] transform z-30 pt-10 px-1"
        >
          <div
            className="absolute top-3 right-4 text-2xl text-red-500 cursor-pointer hover:text-red-600"
            onClick={cartOpenFunction}
          >
            <MdCancel />
          </div>

          <div className="text-xl sm:text-2xl px-4 font-Alegreya">
            <p>Shopping Cart</p>
            <hr className="mt-2" />
          </div>
        {
          (cartItems.length == 0) && (
           <div className="flex font-Roboto flex-col  items-center mt-10">
             <div className="text-8xl text-maron"><HiShoppingBag/></div>
             <p className="text-maron mt-2 font-bold">Your Cart Is Empty!</p>
             <Link href={"/"} onClick={cartOpenFunction}><button className="mt-2 px-2 py-1 bg-lightred text-white rounded-lg hover:bg-lightredhover">Continue Shopping</button></Link>
           </div>
          )
        }


        {
        cartItems.map((items) => (
          <div
            key={items.productId}
            className="flex relative justify-between mt-4 p-4 m-2 bg-gray-50 shadow-xl border rounded-lg items-center h-[80px]"
          >
            <div className="w-12 h-14 ">
              <Image
                className="h-14"
                src={items.imageUrl}
                width={500}
                height={500}
                alt="cart product"
              />
            </div>
            <div>
              <h3 className="px-2 font-Alegreya capitalize text-xs lg:text-base w-[150px] lg:w-[300px] truncate text-ellipsis text-center">
                {items.productName}
              </h3>
              <div className="flex justify-center items-center space-x-6 mt-2">
                <button onClick={()=>{quantityDecrement(items.productId)}} className="text-xl text-lightred">
                  <AiFillMinusSquare />
                </button>
                <p className="text-black font-Roboto">{items.productQuantity}</p>
                <button onClick={()=>{quantityIncrement(items.productId)}} className="text-xl text-lightred">
                  <AiFillPlusSquare />
                </button>
              </div>
            </div>
            <div>
              <p className="font-Roboto mt-2">₹{items.productPrice}</p>
            </div>
            <div onClick={()=>{removeFromCart(items.productId)}} className="absolute text-xs top-1 right-1 cursor-pointer text-lightred"><ImCross/></div>
          </div>
        ))
        }

          
          {
            (cartItems.length!=0) && (
              <div className="py-6 px-4 flex space-x-10 ">
           <Link onClick={cartOpenFunction} href={"../checkouts/information?type=cart"}>
           <button className="flex items-center  py-1 px-3 border rounded  bg-lightred text-white hover:bg-lightredhover">
              Checkout <IoMdCart className="ml-1" />
            </button>
           </Link>
            <button onClick={clearCart} className="py-1 px-3 border rounded   bg-lightred text-white hover:bg-lightredhover">
              Clear
            </button>
          </div>
            )
          } 

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
