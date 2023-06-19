import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { MdArrowBackIos, MdOutlineRadioButtonChecked } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getAllProductsById } from "@/sanity/sanity-utils";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Head from "next/head";
const Shipping = ({
  cartItems,
  totalPriceOfCartItems,
  toast,
  setCartItems,
  generateOrderId,
}) => {
  const {
    emailId,
    nameEntry,
    phoneNumber,
    streetAddress,
    apartmentAddress,
    pincode,
    city,
    state,
    specialInstruction,
    country,
    buyNowDetails,
  } = useContext(MyContext);
  const router = useRouter();
  const [isLoading ,setIsLoading] = useState(false);


const sendUserEmail = async (fromEmail,toEmail,tprice) =>{
  const html = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Order Confirmation - Kashmirizon</title>
      <style>
          /* Add your custom CSS styles here */
          body {
              font-family: Arial, sans-serif;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
          }
          .header {
              text-align: center;
              margin-bottom: 20px;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              margin-bottom: 20px;
          }
          .content p {
              margin: 10px 0;
          }
          .footer {
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Order Confirmation</h1>
          </div>
          <div class="content">
              <p>Dear ${nameEntry},</p>
              <p>Thank you for placing your order with us. We are pleased to confirm that your order has been received and is currently being processed.</p>
              <p>Order Details:</p>
              <ul>
                  <li>Order Number: ${generateOrderId}</li>
                  <li>Order Date: ${new Date().toLocaleDateString()}</li>
                  <li>Total Amount: ₹${tprice}</li>
                  <li>Shipping Address: ${streetAddress}, ${apartmentAddress}, ${city}, ${pincode}, ${state}, ${country}</li>
              </ul>
              <p>If you have any questions or concerns regarding your order, please feel free to contact our customer support team at [shoyeab.ecom@gmail.com].</p>
              <p>Thank you for choosing us.</p>
          </div>
          <div class="footer">
              <p>Best Regards,</p>
              <p>Kashmirizon</p>
          </div>
      </div>
  </body>
  </html>
  `

  const response = await fetch("/api/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email:fromEmail, subject:"Order Confirmation - Kashmirizon", html ,toEmail:toEmail}),
  });

  if (response.ok) {
  } else {
   console.error("error orccured")
  }
}
const sendEmailToSeller = async (fromEmail,toEmail,tprice) =>{
  const html = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Order Confirmation - Kashmirizon</title>
      <style>
          /* Add your custom CSS styles here */
          body {
              font-family: Arial, sans-serif;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
          }
          .header {
              text-align: center;
              margin-bottom: 20px;
          }
          .header h1 {
              font-size: 24px;
              margin: 0;
          }
          .content {
              margin-bottom: 20px;
          }
          .content p {
              margin: 10px 0;
          }
          .footer {
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>New Order Notification</h1>
          </div>
          <div class="content">
              <p>Dear Seller,</p>
              <p>You have received a new order from a customer. Please review the order details below:</p>
              <p>Order Details:</p>
              <ul>
                  <li>Order Number: ${generateOrderId}</li>
                  <li>Order Date: ${new Date().toLocaleDateString()}</li>
                  <li>Email: ${fromEmail}</li>
                  <li>Total Amount: ₹${tprice}</li>
                  <li>Shipping Address: ${streetAddress}, ${apartmentAddress}, ${city}, ${pincode}, ${state}, ${country}</li>
              </ul>
              <p>Thank you for your attention.</p>
          </div>
      </div>
  </body>
  </html>
  `

  const response = await fetch("/api/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email:fromEmail, subject:"Order Confirmation - Kashmirizon", html ,toEmail:toEmail}),
  });

  if (response.ok) {
  } else {
   console.error("error orccured")
  }
}


  const sendCartItemsToDb = async () => {
    setIsLoading(true)
    const modifiedArray = cartItems.map((item) => {
      const { imageUrl, ...rest } = item;
      return rest;
    });
    const orderData = {
      customer: {
        cAddress: `${streetAddress}, ${apartmentAddress}, ${city}, ${pincode}, ${state}, ${country}`,
        cEmail: emailId.toLowerCase(),
        cName: nameEntry,
        cPhone: phoneNumber,
      },
      items: modifiedArray,
      totalPrice: totalPriceOfCartItems,
      orderStatus: "Pending",
      payment: {
        _type: "payment",
        paymentMode: "Cash On Delivery",
      },
      specialInstruction: specialInstruction,
      orderId: generateOrderId + "",
    };

    try {
      const response = await axios.post("/api/insertOrders", {
        data: orderData,
      });

      setIsLoading(false);
      router.push(`../order/success?orderId=${generateOrderId}`)
      sendUserEmail('shoyeab.ecom@gmail.com',emailId,totalPriceOfCartItems) // sending email to the customer
      sendEmailToSeller(emailId,'shoyeab.ecom@gmail.com',totalPriceOfCartItems) // sending email to seller
      setCartItems([])
      localStorage.removeItem('cart')
      // Handle success (e.g., show a success message to the user)
    } catch (error) {
      console.error(error);
      toast.error("Sorry! Your Order Is Failed Try Again.")
      setIsLoading(false)
    }
    // Handle error (e.g., show an error message to the user)
  };



  //---------------------------- sending buynow items to server----------------------------------------
  const sendBuyNowItemToDb = async () => {
    setIsLoading(true)
    const { imageUrl, ...rest } = buyNowDetails;
    const orderData = {
      customer: {
        cAddress: `${streetAddress}, ${apartmentAddress}, ${city}, ${pincode}, ${state}, ${country}`,
        cEmail: emailId.toLowerCase(),
        cName: nameEntry,
        cPhone: phoneNumber,
      },
      items: [rest],
      totalPrice: rest.productPrice*rest.productQuantity,
      orderStatus: "Pending",
      payment: {
        _type: "payment",
        paymentMode: "Cash On Delivery",
      },
      specialInstruction: specialInstruction,
      orderId: generateOrderId + "",
    };
    try {
      const response = await axios.post("/api/insertOrders", {
        data: orderData,
      });
      console.log("Data sent successfully:", response.data);
      router.push(`../order/success?orderId=${generateOrderId}`)
      setIsLoading(false);
      sendUserEmail('shoyeab.ecom@gmail.com',emailId,rest.productPrice*rest.productQuantity) // sending email to the customer
      sendEmailToSeller(emailId,'shoyeab.ecom@gmail.com',rest.productPrice*rest.productQuantity) // sending email to seller
      // Handle success (e.g., show a success message to the user)
    } catch (error) {
      console.error(error);
      toast.error("Sorry! Your Order Is Failed Try Again.")
      setIsLoading(false)
    }
    // Handle error (e.g., show an error message to the user)
  };

  const handleOrders = async () => {
    if (router.query.type === "cart") {
      let isTampered = false;
      await Promise.all(
        cartItems.map(async (item) => {
          const getItemsFromServer = await getAllProductsById(item.productId);
          if (item.productPrice !== getItemsFromServer[0].price) {
            isTampered = true;
          }
        })
      );
      if (isTampered) {
        toast.error(
          "Sorry! Please review your cart and make sure it's accurate."
        );
        localStorage.removeItem("cart");
        setCartItems([]);
      } else if (
        !isTampered &&
        emailId != "" &&
        phoneNumber != "" &&
        streetAddress != "" &&
        apartmentAddress != "" &&
        pincode != ""
      ) {
        if (cartItems.length != 0) {
          sendCartItemsToDb();
        } else {
          toast.error("Sorry! No Items Are Selected");
        }
      } else if (
        emailId === "" ||
        cartItems.length == 0 ||
        phoneNumber === "" ||
        streetAddress === "" ||
        apartmentAddress === "" ||
        pincode === ""
      ) {
        toast.error("Sorry! missing fields go back");
      }
    }
    if (router.query.type === "buy-now") {
      if(Object.keys(buyNowDetails).length!=0){
        sendBuyNowItemToDb()
      }
      else if(emailId === '' || streetAddress === '' || apartmentAddress === '' || pincode ===''){
        toast.error("Sorry! missing fields go back");
      }
      else{
        toast.error("Sorry! No Items Are Selected");
      }
    }
  };

  return (
    <div>
       <Head><title>{`Proceed to Checkout - Kashmirizon`}</title></Head>
      {isLoading && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2px)",
          }}
          className="absolute left-0  right-0 top-0 bottom-0 flex justify-center items-center"
        >
          <Oval
            height={80}
            width={80}
            color="#FE114C"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#EA3663"
            strokeWidth={3}
            strokeWidthSecondary={4}
          />
        </div>
      )}
      <div className="flex flex-col lg:flex-row py-8 px-2 justify-center">
        {/* shipping address */}
        <div className="flex-1  flex flex-col space-y-8 items-center font-Roboto lg:border-r border-gray-500 ">
          <div className="w-[320px] border rounded-lg p-4 sm:w-[450px] flex flex-col space-y-4 justify-start font-Roboto text-black text-xl">
            <div className="w-full flex flex-col space-y-4">
              <div className="flex justify-start text-sm font-Roboto">
                <h4 className="text-gray-700">Contact:</h4>
                <h4 className="ml-8">{emailId}</h4>
              </div>
              <hr className="h-2" />
              <div className="flex justify-start text-sm font-Roboto overflow-hidden">
                <h4 className="text-gray-700">ShipTo:</h4>
                <h4 className="overflow-hidden ml-9">{`${streetAddress}, ${apartmentAddress}, ${city}, ${pincode}, ${state}, ${country}`}</h4>
              </div>
              <hr className="h-2" />
              <div className="flex justify-start text-sm font-Roboto overflow-hidden">
                <h4 className="text-gray-700">Special Instruction:</h4>
                <h4 className="overflow-hidden ml-4">{specialInstruction}</h4>
              </div>
            </div>
          </div>
          <div>
            {/* shipping method */}
            <div className="w-[320px] sm:w-[450px] flex justify-start">
              <h4 className="font-Roboto text-xl text-black font-bold">
                Shipping Method
              </h4>
            </div>
            <div className="w-[320px] sm:w-[450px] border border-black rounded-lg mt-6 p-4 flex justify-between text-base font-Roboto">
              <h4 className="flex justify-center items-center  text-black">
                <MdOutlineRadioButtonChecked className="mr-2" />
                Cash On Delivery
                <RiTruckLine className="animate-bounce ml-2 text-xl" />
              </h4>
              <h4 className="ml-8">
                ₹
                {(router.query.type === "cart" && totalPriceOfCartItems) ||
                  (router.query.type === "buy-now" &&
                    buyNowDetails.productPrice * buyNowDetails.productQuantity)}
              </h4>
            </div>
          </div>
          <div className="flex text-sm md:text-base w-[300px] md:w-[450px] justify-between items-center">
            <div>
              <button
                onClick={() => {
                  router.back();
                }}
                className="flex cursor-pointer justify-center text-sm items-center"
              >
                <MdArrowBackIos /> Return
              </button>
            </div>
            <div>
              <button
                onClick={handleOrders}
                className="py-2 px-4 bg-lightred text-white rounded-lg"
              >
                Order ₹
                {(router.query.type === "cart" && totalPriceOfCartItems) ||
                  (router.query.type === "buy-now" &&
                    buyNowDetails.productPrice * buyNowDetails.productQuantity)}
              </button>
            </div>
          </div>
        </div>
        {/* cart items */}
        <div className="flex-1 mt-10 lg:mt-0  px-4">
          <div className="w-full">
            <div className="pb-6 overflow-hidden">
              <p className="font-Alegreya text-2xl">Items</p>
              <hr className="h-1 " />
              {((Object.keys(buyNowDetails).length != 0 &&
                router.query.type === "buy-now") ||
                (cartItems.length != 0 && router.query.type === "cart")) && (
                <p className="font-bold font-Roboto text-maron mt-2">
                  Order Id: #{generateOrderId}
                </p>
              )}
            </div>
            {/* ------------------------For Buy Now Product display------------------------------- */}
            {router.query.type === "buy-now" &&
              Object.keys(buyNowDetails).length == 0 && (
                <p className="font-Roboto p-2 text-sm">
                  Sorry! No Items Are Selected{" "}
                  <Link href={"../"}>
                    <button className="px-2 py-1 rounded-lg bg-lightred hover:bg-lightredhover text-white">
                      Go To Shopping Page
                    </button>
                  </Link>
                </p>
              )}
            {router.query.type === "buy-now" &&
              Object.keys(buyNowDetails).length != 0 && (
                <div>
                  <div className="flex space-x-6 my-3 border rounded-lg px-2">
                    <div className="w-[70px] h-[100px] ">
                      <Image
                        className=" w-[70px] h-[100px]  object-contain"
                        src={buyNowDetails.imageUrl}
                        width={500}
                        height={500}
                        alt="buy now product"
                      />
                    </div>
                    <div className="py-2 font-Roboto text-maron">
                      <p className="font-bold capitalize ">
                        {buyNowDetails.productName}
                      </p>
                      <p className="font-bold text-sm">
                        Price:{" "}
                        <span className="font-light">
                          {buyNowDetails.productPrice}
                        </span>
                      </p>
                      <p className="font-bold text-sm">
                        Quantity:{" "}
                        <span className="font-light">
                          {buyNowDetails.productQuantity}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr className="h-2 my-6" />
                  <div>
                    <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                      <span>Total Price:</span>
                      <span>
                        ₹{" "}
                        {buyNowDetails.productPrice *
                          buyNowDetails.productQuantity}
                      </span>
                    </div>
                    <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                      <span>Delivery Charges:</span>
                      <span>
                        ₹
                        {buyNowDetails.productPrice *
                          buyNowDetails.productQuantity <
                        250
                          ? 40
                          : 0}
                      </span>
                    </div>
                    <hr className="h-1 mt-4" />
                    <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                      <span>Grand Total:</span>
                      <span>
                        ₹
                        {buyNowDetails.productPrice *
                          buyNowDetails.productQuantity +
                          (buyNowDetails.productPrice *
                            buyNowDetails.productQuantity <
                          250
                            ? 45
                            : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            {/* --------------------------------------------------- */}

            {router.query.type === "cart" && (
              <div>
                {cartItems.length == 0 && (
                  <p className="font-Roboto p-2 text-sm">
                    Sorry! No Items Are Selected{" "}
                    <Link href={"../"}>
                      <button className="px-2 py-1 rounded-lg bg-lightred hover:bg-lightredhover text-white">
                        Go To Shopping Page
                      </button>
                    </Link>
                  </p>
                )}
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex space-x-6 my-3 border rounded-lg px-2"
                  >
                    <div className="w-[70px] h-[100px] ">
                      <Image
                        className="w-[70px] h-[100px]  object-contain"
                        src={item.imageUrl}
                        width={500}
                        height={500}
                        alt="buy now product"
                      />
                    </div>
                    <div className="py-2 font-Roboto text-maron">
                      <p className="font-bold capitalize ">
                        {item.productName}
                      </p>
                      <p className="font-bold text-sm">
                        Price:{" "}
                        <span className="font-light">{item.productPrice}</span>
                      </p>
                      <p className="font-bold text-sm flex">
                        Quantity: {item.productQuantity}
                      </p>
                    </div>
                  </div>
                ))}

                {!cartItems.length == 0 && (
                  <div>
                    <hr className="h-2 my-6" />
                    <div>
                      <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                        <span>Total Price:</span>
                        <span>₹{totalPriceOfCartItems}</span>
                      </div>
                      <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                        <span>Delivery Charges:</span>
                        <span>₹{totalPriceOfCartItems < 250 ? 40 : 0}</span>
                      </div>
                      <hr className="h-1 mt-4" />
                      <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                        <span>Grand Total:</span>
                        <span>
                          ₹
                          {totalPriceOfCartItems < 250
                            ? totalPriceOfCartItems + 40
                            : totalPriceOfCartItems}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;

export async function getServerSideProps(context) {
  const timestamp = Date.now();
  const randomDigits = Math.floor(Math.random() * 10000);
  const generateOrderId = `${timestamp}-${randomDigits}`;
  return {
    props: { generateOrderId },
  };
}
