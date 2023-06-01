import React, { useState, useEffect, useContext } from "react";
import { MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MyContext } from "@/context/MyContext";
import { getAllProductsById } from "@/sanity/sanity-utils";
import { AiFillMinusSquare, AiFillPlusSquare,AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
const Information = ({
  product,
  cartItems,
  quantityDecrement,
  quantityIncrement,
  totalPriceOfCartItems,
  toast
}) => {
  const { data: session, status } = useSession({ required: true });
  //assuming user will enter something
  const router = useRouter();
  const {
    emailId,
    setEmailId,
    nameEntry,
    setNameEnter,
    phoneNumber,
    setPhoneNumber,
    streetAddress,
    setStreetAddress,
    apartmentAddress,
    setApartmentAddress,
    pincode,
    setPincode,
    city,
    setCity,
    state,
    setState,
    specialInstruction,
    setSpecialInstruction,
    country,
    setCountry,
    buyNowDetails,
    setBuyNowDetails,
  } = useContext(MyContext);
  const [isChecked, setIsChecked] = useState(false);
  const [fieldSet, setFieldSet] = useState({
    isEmailEmpty: false,
    isNameEmpty: false,
    isPhoneEmpty: false,
    isStreeAddressEmpty: false,
    isApartmentEmpty: false,
    isCityEmpty: false,
    isPincodeEmpty: false,
    isStateEmpty: false,
  });
  const [isFetching,setIsFetching] = useState(false);
  const checkPincodeIsServicble = async ()=>{
    setIsFetching(true)
    try {
      if(pincode!=''){
        const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
       if(res.data[0].Status == "Success"){
          setState(res.data[0].PostOffice[0].State)
          console.log(res.data[0].PostOffice[0].State)
          setCity(res.data[0].PostOffice[0].District)
          setIsFetching(false)

       }
       else{
        toast.error('Pincode Not Serviceble')
        setIsFetching(false)
        setPincode('')
       }   
      }
      else{
        toast.warn('Enter Pincode')
        setIsFetching(false)

      }
    } catch (error) {
      console.error(error)
      setIsFetching(false)

    }
  }

  useEffect(() => {
    setEmailId(session ? session.user.email : "");
    if (localStorage.getItem("shippingAddress")) {
      const shippingAddress = JSON.parse(
        localStorage.getItem("shippingAddress")
      );
      setEmailId(shippingAddress.email);
      setNameEnter(shippingAddress.name);
      setPhoneNumber(shippingAddress.phone);
      setStreetAddress(shippingAddress.streetAddress);
      setApartmentAddress(shippingAddress.apartmentAddress);
      setCity(shippingAddress.city);
      setState(shippingAddress.state);
      setPincode(shippingAddress.pincode);
    }
    if (
      localStorage.getItem("buyNowProduct") &&
      router.query.type === "buy-now"
    ) {
      setBuyNowDetails({
        ...JSON.parse(localStorage.getItem("buyNowProduct")),
        productPrice: product[0].price,
      });
    }
  }, [product, router.query.type, session, setApartmentAddress, setBuyNowDetails, setCity, setEmailId, setNameEnter, setPhoneNumber, setPincode, setState, setStreetAddress]);

  const IncQuantBProduct = () => {
    const { productPrice, ...updatedDetails } = buyNowDetails;
    updatedDetails.productQuantity = buyNowDetails.productQuantity + 1;
    try {
      setBuyNowDetails({ ...updatedDetails, productPrice });
      localStorage.setItem(
        "buyNowProduct",
        JSON.stringify({ ...updatedDetails })
      );
    } catch (error) {
      console.error(error);
      localStorage.removeItem("buyNowProduct");
    }
  };
  const DecQuantBProduct = () => {
    const { productPrice, ...updatedDetails } = buyNowDetails;
    if(updatedDetails.productQuantity>1){
      updatedDetails.productQuantity = buyNowDetails.productQuantity - 1;
    }
    try {
      setBuyNowDetails({ ...updatedDetails, productPrice });
      localStorage.setItem(
        "buyNowProduct",
        JSON.stringify({ ...updatedDetails })
      );
    } catch (error) {
      console.error(error);
      localStorage.removeItem("buyNowProduct");
    }
  };

  const checkForValidation = () => {
    const fields = [
      { name: "emailId", emptyField: "isEmailEmpty" },
      { name: "nameEntry", emptyField: "isNameEmpty" },
      { name: "phoneNumber", emptyField: "isPhoneEmpty" },
      { name: "streetAddress", emptyField: "isStreeAddressEmpty" },
      { name: "apartmentAddress", emptyField: "isApartmentEmpty" },
      { name: "city", emptyField: "isCityEmpty" },
      { name: "pincode", emptyField: "isPincodeEmpty" },
      { name: "state", emptyField: "isStateEmpty" },
    ];
    let updatedFieldSet = { ...fieldSet };
    fields.forEach(({ name, emptyField }) => {
      updatedFieldSet[emptyField] = eval(name) === "";
    });

    setFieldSet(updatedFieldSet);
  };

  const handleContinueShopping = () => {
    checkForValidation();
    if (
      emailId != "" &&
      nameEntry != "" &&
      phoneNumber != "" &&
      streetAddress != "" &&
      apartmentAddress != "" &&
      pincode != "" &&
      city != "" &&
      state!=''
    ) {
      if (isChecked) {
        localStorage.setItem(
          "shippingAddress",
          JSON.stringify({
            email: emailId,
            name: nameEntry,
            phone: phoneNumber,
            streetAddress: streetAddress,
            apartmentAddress: apartmentAddress,
            city: city,
            state: state,
            pincode: pincode,
          })
        );
      }
      router.push(`./shipping?type=${router.query.type}`);
    }
    
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value;
    const isValidNumber = !isNaN(inputValue); // Check if the input is a valid number

    if (isValidNumber) {
      setPhoneNumber(inputValue);
    }
  };
  return (
    <div className="py-8 px-2 ">
      <Head><title>{`Checkout Information - JExprez`}</title></Head>
      <div className="flex flex-col lg:flex-row justify-center">
        {/* shipping address */}
        <div className="flex-1 flex flex-col space-y-8 items-center font-Roboto lg:border-r border-gray-500 ">
          <div className="w-[300px] sm:w-[450px] flex justify-start font-Roboto text-black text-xl">
            <h3>Contact</h3>
          </div>
          <div
            className={`relative border rounded-lg ${
              !fieldSet.isEmailEmpty ? "border-gray-500" : "border-lightred"
            }  h-12 text-sm md:text-base w-[300px] sm:w-[450px]`}
          >
            <p
              className={`absolute font-Roboto text-sm -top-[10px] ${
                !fieldSet.isEmailEmpty ? "text-gray-500" : "text-lightred"
              } px-2 bg-white left-2 border-gray-500 rounded-full`}
            >
              Email
            </p>
            <input
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="border-none rounded-lg w-full h-full px-4 outline-none"
              type="email"
            />
          <p className="text-xs font-Roboto p-2 text-orange-400">Please note that use your signed-in email address to track your order</p>

          </div>

          <div className="w-[300px] sm:w-[450px] flex justify-start pt-4 font-Roboto text-black text-xl">
            <h3>Shipping Address</h3>
          </div>
          <div
            className={`relative border rounded-lg ${
              !fieldSet.isNameEmpty ? "border-gray-500" : "border-lightred"
            }  h-12 text-sm md:text-base w-[300px] sm:w-[450px]`}
          >
            <p
              className={`absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 ${
                !fieldSet.isNameEmpty ? "text-gray-500" : "text-lightred"
              } rounded-full`}
            >
              Full Name
            </p>
            <input
              value={nameEntry}
              onChange={(e) => setNameEnter(e.target.value)}
              className="border-none rounded-lg w-full h-full px-4 outline-none"
              type="text"
            />
          </div>
          <div
            className={`relative border rounded-lg ${
              !fieldSet.isPhoneEmpty ? "border-gray-500" : "border-lightred"
            }  h-12 text-sm md:text-base w-[300px] sm:w-[450px]`}
          >
            <p
              className={`absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 ${
                !fieldSet.isPhoneEmpty ? "text-gray-500" : "text-lightred"
              } rounded-full`}
            >
              Phone Number
            </p>
            <input
              value={phoneNumber}
              onChange={handlePhoneNumber}
              className="border-none rounded-lg m-0 w-full h-full px-4 outline-none"
              type="text"
            />
          </div>
          <div
            className={`relative border rounded-lg ${
              !fieldSet.isStreeAddressEmpty
                ? "border-gray-500"
                : "border-lightred"
            }  h-12 text-sm md:text-base w-[300px] sm:w-[450px]`}
          >
            <p
              className={`absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 ${
                !fieldSet.isStreeAddressEmpty
                  ? "text-gray-500"
                  : "text-lightred"
              } rounded-full`}
            >
              Street Address
            </p>
            <input
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="border-none rounded-lg w-full h-full px-4 outline-none"
              type="text"
            />
          </div>
          <div
            className={`relative border rounded-lg ${
              !fieldSet.isApartmentEmpty ? "border-gray-500" : "border-lightred"
            }  h-12 text-sm md:text-base w-[300px] sm:w-[450px]`}
          >
            <p
              className={`absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 ${
                !fieldSet.isApartmentEmpty ? "text-gray-500" : "text-lightred"
              } rounded-full`}
            >
              Apartment, Suite, or Unit (if applicable)
            </p>
            <input
              value={apartmentAddress}
              onChange={(e) => setApartmentAddress(e.target.value)}
              className="border-none rounded-lg w-full h-full px-4 outline-none"
              type="text"
            />
          </div>
          <div className="relative border rounded-lg  border-gray-500 h-12 text-sm md:text-base w-[300px] sm:w-[450px]">
            <p className="absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 text-gray-500 rounded-full">
              Country/Region
            </p>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              className="px-4 bg-white outline-none rounded-lg w-full h-full"
            >
              <option value={country}>India</option>
            </select>
          </div>
          <div
              className={`relative border flex text-sm md:text-base m-3 rounded-lg ${
                !fieldSet.isPincodeEmpty ? "border-gray-500" : "border-lightred"
              } h-10 w-[300px] sm:w-[450px]`}
            >
              <p
                className={`absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 ${
                  !fieldSet.isPincodeEmpty ? "text-gray-500" : "text-lightred"
                } rounded-full`}
              >
                PIN Code
              </p>
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="border-none rounded-lg w-full h-full px-2 outline-none"
                type="text"
              />
              <button onClick={checkPincodeIsServicble} className="bg-lightred h-7 absolute top-1 right-1 border-lightred text-xs py-1 flex justify-center items-center px-2  rounded-lg text-white">{!isFetching?'Fetch':<AiOutlineLoading3Quarters className="animate-spin font-bold"/>} </button>
            </div>
          <div className="flex flex-wrap justify-center">
            <div
              className={`relative border text-sm md:text-base m-3 rounded-lg ${
                !fieldSet.isCityEmpty ? "border-gray-500" : "border-lightred"
              } h-10 md:w-[220px] sm:w-[500px] w-[300px]`}
            >
              <p
                className={`absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 ${
                  !fieldSet.isCityEmpty ? "text-gray-500" : "text-lightred"
                } rounded-full`}
              >
                City
              </p>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border-none rounded-lg w-full h-full px-2 outline-none"
                type="text"
              />
            </div>
            <div className={`relative border text-sm md:text-base m-3 rounded-lg ${
                !fieldSet.isStateEmpty ? "border-gray-500" : "border-lightred"
              } h-10 md:w-[220px] sm:w-[450px] w-[300px]`}
            >
              <p
                className={`absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 ${
                  !fieldSet.isStateEmpty ? "text-gray-500" : "text-lightred"
                } rounded-full`}
              >
                State
              </p>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full truncate text-ellipsis rounded-lg h-full outline-none p-2"
              />
            </div>
           
          </div>
          <div className="relative border rounded-lg border-gray-500  text-sm md:text-base w-[300px] sm:w-[450px]">
            <p className="absolute font-Roboto text-sm -top-[10px] px-2 bg-white left-2 text-gray-500 rounded-full">
              Special Instructions To Seller
            </p>
            <textarea
              value={specialInstruction}
              onChange={(e) => setSpecialInstruction(e.target.value)}
              className="border-none rounded-lg w-full h-full p-4 outline-none"
              type="text"
            />
          </div>

          <div className=" flex text-sm md:text-base w-[300px] md:w-[450px] justify-start">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <p onClick={handleCheckboxChange} className="ml-2 cursor-pointer">
              Save this information for next time
            </p>
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
                onClick={handleContinueShopping}
                className="py-3 px-2 bg-lightred text-white rounded-lg"
              >
                Continue Shopping
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
            </div>
            {/* ------------------------For Buy Now Product display------------------------------- */}

            {router.query.type === "buy-now" && (
              <div>
                <div className="flex space-x-6 my-3 border rounded-lg px-2">
                  <div className="w-[70px] h-[100px] ">
                    <Image
                      className="w-[70px] h-[100px]  object-contain"
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
                      <span className="font-light">{buyNowDetails.productPrice}</span>
                    </p>
                    <p className="font-bold text-sm flex">
                      Quantity:{" "}
                      <span className=" ml-4 font-light flex justify-center items-center">
                        <AiFillMinusSquare
                          onClick={DecQuantBProduct}
                          className="mr-2 cursor-pointer"
                        />
                        {buyNowDetails.productQuantity}
                        <AiFillPlusSquare
                          onClick={IncQuantBProduct}
                          className="ml-2 cursor-pointer"
                        />
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="h-2 my-6" />
                <div>
                  <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                    <span>Total Price:</span>
                    <span>₹{buyNowDetails.productPrice * buyNowDetails.productQuantity}</span>
                  </div>
                  <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                    <span>Delivery Charges:</span>
                    <span>₹{(buyNowDetails.productPrice * buyNowDetails.productQuantity)<250?40:0}</span>
                  </div>
                  <hr className="h-1 mt-4" />
                  <div className="font-Roboto flex w-[200px] justify-between font-bold text-maron">
                    <span>Grand Total:</span>
                    <span>₹{buyNowDetails.productPrice * buyNowDetails.productQuantity + ((buyNowDetails.productPrice*buyNowDetails.productQuantity)<250?45:0)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* -----------------------------For Cart Product Display---------------------- */}
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
                        className=" w-[70px] h-[100px]  object-contain"
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
                        Quantity:{" "}
                        <span className=" ml-4 font-light flex justify-center items-center">
                          <AiFillMinusSquare
                            onClick={() => {
                              quantityDecrement(item.productId);
                            }}
                            className="mr-2 cursor-pointer"
                          />
                          {item.productQuantity}
                          <AiFillPlusSquare
                            onClick={() => {
                              quantityIncrement(item.productId);
                            }}
                            className="ml-2 cursor-pointer"
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                ))}

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
        </div>
      </div>
    </div>
  );
};

export default Information;

export async function getServerSideProps(context) {
  let product = {};
  if (context.query.type === "buy-now") {
    product = await getAllProductsById(context.query.id);
  }
  
  return {
    props: { product },
  };
}
