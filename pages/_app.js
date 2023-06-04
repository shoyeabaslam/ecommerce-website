import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { MyContextProvider } from "../context/MyContext";

export default function App({ Component, pageProps, session }) {
  const router = useRouter();
  const page = router.pathname;
  const [progress, setProgress] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPriceOfCartItems, setTotalPriceOfCartItems] = useState(0);

  // save cart state into local storage
  const saveToLocalStorage = (myCartItem) => {
    localStorage.setItem("cart", JSON.stringify(myCartItem));
  };

  const addToCart = async (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.productId === item.productId);
    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.productId === item.productId) {
          return {
            ...cartItem,
            productQuantity: cartItem.productQuantity + 1,
          };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
      saveToLocalStorage(updatedCartItems);
      totalPrice(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...item, productQuantity: 1 }]);
      saveToLocalStorage([...cartItems, { ...item, productQuantity: 1 }]);
      totalPrice([...cartItems, { ...item, productQuantity: 1 }])
    }
    // console.log(cartItems);
    
  };

  const quantityIncrement = (productId) => {
    const newCartItems = cartItems.map((cartItem) => {
      if (cartItem.productId === productId) {
        return {
          ...cartItem,
          productQuantity: cartItem.productQuantity + 1,
        };
      }

      return cartItem;
    });
    setCartItems(newCartItems);
    saveToLocalStorage(newCartItems);
    totalPrice(newCartItems)
  };
  const quantityDecrement = (productId) => {
    const newCartItems = cartItems.map((cartItem) => {
      if (cartItem.productId === productId && cartItem.productQuantity > 1) {
        return {
          ...cartItem,
          productQuantity: cartItem.productQuantity - 1,
        };
      }

      return cartItem;
    });
    setCartItems(newCartItems);
    saveToLocalStorage(newCartItems);
    totalPrice(newCartItems)

  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const totalPrice = (cartItems)=>{
    let tPrice = 0;
    cartItems.map((item)=>{
      tPrice = tPrice + item.productQuantity*item.productPrice;
    })
    setTotalPriceOfCartItems(tPrice);
    
  }
  
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    saveToLocalStorage(updatedCart);
    totalPrice(updatedCart);

  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(60);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
   
    try {
      if (localStorage.getItem("cart")) {
        setCartItems(JSON.parse(localStorage.getItem("cart")));
        totalPrice(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem('cart');
    }
  }, [router.events]);
  return (
    <>
     <Head>
        <title>JExprez</title>
        <link rel="shortcut icon" href="/images/logo.png" />
      </Head>
      <SessionProvider session={session}>
      <MyContextProvider>
        <LoadingBar
          color="#ff0000"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          height={3}
          waitingTime={200}
          loaderSpeed={1000}
          shadow={true}
        />
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
        {!(page == "/admin") && (
          <Navbar
            removeFromCart={removeFromCart}
            cartItems={cartItems}
            quantityDecrement={quantityDecrement}
            quantityIncrement={quantityIncrement}
            clearCart={clearCart}
          />
        )}

        <Component
          addToCart={addToCart}
          toast={toast}
          cartItems={cartItems}
          quantityIncrement={quantityIncrement}
          quantityDecrement={quantityDecrement}
          setCartItems={setCartItems}
          totalPriceOfCartItems = {totalPriceOfCartItems}
          {...pageProps}
        />

        {!(page == "/admin") && <Footer />}
        </MyContextProvider>
      </SessionProvider>
    </>
  );
}

