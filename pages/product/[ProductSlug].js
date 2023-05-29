import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { getAllProductsById, getTopProducts } from "@/sanity/sanity-utils";
import { BsLightningFill, BsFillCaretDownFill, BsShop } from "react-icons/bs";
import { HiShoppingCart, HiLightBulb } from "react-icons/hi";
import { MdLocalShipping } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
// for multi carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// portable text
import { PortableText } from "@portabletext/react";
import { useSession } from "next-auth/react";
// redux
import { MyContext } from "@/context/MyContext";
import axios from "axios";


const Pages2 = ({ productOverView, imgArray ,topProducts,addToCart,toast}) => {
  const router = useRouter();
  const [imgIndex, setImgIndex] = useState(0);
  const [shippmentClicked, setShippmentClicked] = useState(false);
  const [whyShopClicked, setWhyShopClicked] = useState(false);
  const [didYouKnowClicked, setDidYouKnowClicked] = useState(false);
  const {data: session} = useSession();
  const {setBuyNowDetails} = useContext(MyContext)
  const [pincode ,setPincode] = useState('')


const checkPincodeIsServicble = async ()=>{
  try {
    if(pincode!=''){
      const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
     if(res.data[0].Status == "Success"){
        toast.success('Pincode Is Serviceble')
        setPincode('')
     }
     else{
      toast.error('Pincode Not Serviceble')
      setPincode('')
     }   
    }
    else{
      toast.warn('Enter Pincode')
    }
  } catch (error) {
    console.error(error)
  }
}
const handleBuyNow = ()=>{
  setBuyNowDetails({"productId":productOverView[0]._id,"_key":productOverView[0]._id,"productName":productOverView[0].title,"imageUrl":productOverView[0].image,"productQuantity":1})
  router.push(`../checkouts/information?type=buy-now&id=${productOverView[0]._id}`)
  localStorage.setItem("buyNowProduct",JSON.stringify({"productId":productOverView[0]._id,"_key":productOverView[0]._id,"productName":productOverView[0].title,"imageUrl":productOverView[0].image,"productQuantity":1}))
  
}
  const handleProductImage = (index) => {
    setImgIndex(index);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="text-gray-600 body-font overflow-hidden">
      <div className="flex justify-center lg:justify-start  flex-wrap p-8">
        <div className="flex flex-wrap flex-row sm:flex-col justify-center sm:justify-start items-center">
          {imgArray.map((imgUrl, index) => (
            <div
              onClick={() => handleProductImage(index)}
              key={index}
              className="mt-2 mr-4 flex border-2 p-1  object-cover object-top  h-[90px] w-[60px] sm:w-[80px] md:h-[110px] rounded-lg cursor-pointer"
            >
              <Image width={500} height={500} src={imgUrl} alt="product" />
            </div>
          ))}
        </div>
        <div className="mx-0 my-10 sm:my-0 sm:mx-12 flex  p-1  object-cover object-top h-[400px] w-[300px] md:w-[400px] md:h-[514px]  cursor-crosshair">
          <Image
            width={500}
            height={500}
            src={imgArray[imgIndex]}
            alt="product"
          />
        </div>
        <div className="flex-1 mt-6 lg:mt-0 flex justify-start">
          <div className="lg:ml-10  w-[100%] lg:w-[60%]">
            <h1 className="font-Roboto text-2xl md:text-3xl text-black font-bold">
              {productOverView[0].title}
            </h1>
            <div className="font-Roboto  my-4 flex space-x-4 justify-start items-center">
              <span className="text-black font-bold">
                ₹{productOverView[0].price}
              </span>{" "}
              <strike className="text-gray-400">
                ₹{productOverView[0].actualprice}
              </strike>
              <span className="text-green-600 text-sm">
                {Math.ceil(
                  (productOverView[0].price / productOverView[0].actualprice) *
                    100
                )}
                % off
              </span>
            </div>
            <div className="m-4 font-Roboto text-maron">
                  <PortableText value={productOverView[0].description}/>
            </div>
            {
              (productOverView[0].stock == 'outOfStock') && <p className="text-red-600 text-lg text-Roboto m-4">Out of Stock</p>
            }
           {
            !(productOverView[0].stock == 'outOfStock') && 
            <div className="font-Roboto my-4 flex space-x-4">
            {
              <button onClick={handleBuyNow} className="px-2 py-1 bg-lightred hover:bg-lightredhover text-white rounded flex justify-center items-center">
              Buy Now <BsLightningFill className="ml-2" />
            </button>
            }
            <button className="border px-2 py-1 border-lightred  text-lightred rounded flex justify-center items-center" onClick={()=>{addToCart({"productId":productOverView[0]._id,"_key":productOverView[0]._id,"productName":productOverView[0].title,"productPrice":productOverView[0].price,"imageUrl":productOverView[0].image}) ,toast.success(`Item added to cart successfully!`)}}>
              Add To Cart <HiShoppingCart className="ml-2" />
            </button>
          </div>
           }
            <div className="mt-10 font-Roboto">
              <div className="flex">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e)=>setPincode(e.target.value)}
                  className="outline-none border-b border-lightred p-1 rounded"
                  placeholder="Enter Delivery Pincode"
                ></input>
                <button onClick={checkPincodeIsServicble} className=" p-1  w-28 rounded ml-4  bg-lightred hover:bg-lightredhover text-white">
                  Check
                </button>
              </div>
            
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------section 2--------------------------------- */}
      <div className="">
        <ul className="flex flex-wrap justify-start lg:justify-center px-8">
          <li className="w-[300px] m-4">
            <div className="cursor-pointer bg-lightred">
              <p
                onClick={() => {
                  setShippmentClicked(!shippmentClicked);
                }}
                className="flex items-center text-white justify-between p-2  rounded"
              >
                <MdLocalShipping /> Shipping info & Returns{" "}
                <BsFillCaretDownFill
                  className={`${
                    shippmentClicked ? "rotate-180" : "rotate-0"
                  } transition-all delay-100 ease-in-out`}
                />
              </p>
              <div
                className={`bg-lightred text-white font-Roboto text-xs overflow-hidden ${
                  shippmentClicked ? "h-24" : "h-0"
                } ease-in-out transition-all delay-100`}
              >
                <p className="p-2">
                  We ship out packages multiple times a week, typically within 3
                  days. If something you`ve ordered from us online isn`t quite
                  right, we happily offer refunds, including all sale
                  merchandise. See the full details{" "}
                  <span className="text-blue-200">here.</span>
                </p>
              </div>
            </div>
          </li>
          <li className="w-[300px] m-4">
            {" "}
            <div className="cursor-pointer bg-lightred">
              <p
                onClick={() => {
                  setWhyShopClicked(!whyShopClicked);
                }}
                className="flex items-center text-white justify-between p-2  rounded"
              >
                <BsShop /> Why Shop At Victoire?{" "}
                <BsFillCaretDownFill
                  className={`${
                    whyShopClicked ? "rotate-180" : "rotate-0"
                  } transition-all delay-100 ease-in-out`}
                />
              </p>
              <div
                className={`bg-lightred font-Roboto text-xs text-white overflow-hidden ${
                  whyShopClicked ? "h-20" : "h-0"
                } ease-in-out transition-all delay-100`}
              >
                <p className="p-2">
                  When you shop at Victoire, you`re supporting slow fashion and
                  jewelry made in Canada. It`s thanks to you that these
                  independent designers and makers can continue to thrive.
                </p>
              </div>
            </div>
          </li>
          <li className="w-[300px] m-4">
            {" "}
            <div className="cursor-pointer bg-lightred">
              <p
                onClick={() => {
                  setDidYouKnowClicked(!didYouKnowClicked);
                }}
                className="flex items-center text-white justify-between p-2 rounded"
              >
                <HiLightBulb /> Did You Know?{" "}
                <BsFillCaretDownFill
                  className={`${
                    didYouKnowClicked ? "rotate-180" : "rotate-0"
                  } transition-all delay-100 ease-in-out`}
                />
              </p>
              <div
                className={`bg-lightred text-xs text-white font-Roboto overflow-hidden ${
                  didYouKnowClicked ? "h-20" : "h-0"
                } ease-in-out transition-all delay-100`}
              >
                <p className="p-2">
                  When you support a small business, you`re valuing economic
                  diversity, sustainable growth, community prosperity, dynamic
                  neighbourhoods and collective creativity!
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* -----------------------section 3---------------------------------- */}
     
     <div className="p-8">
      <h2 className="text-3xl font-Alegreya text-maron capitalize my-8">You might like these too!</h2>
     <Carousel
        responsive={responsive}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {
          topProducts.map((items)=>(
            <Link href={`/product/${items.slug}?id=${items._id}`}  key={items._id}>  <div className="w-[140px] md:w-[200px] p-2  h-[200px] md:h-[270px] border bg-gray-50 shadow-xl rounded-lg overflow-hidden cursor-pointer">
          <Image className="w-[110px]  rounded-lg h-[130px] md:w-[180px] md:h-[200px] ml-auto mr-auto" src={items.image} width={500} height={500} alt="product image"/>
          <p className="p-2  text-xs text-center font-Alegreya capitalize text-maron md:text-base">{items.title}</p>
        </div></Link>
          ))
        }
        
      </Carousel>
     </div>
      
    </div>
  );
};

export async function getServerSideProps(context) {
  const productOverView = await getAllProductsById(context.query.id);
  const topProducts = await getTopProducts();
  const imgArray = []; // creating empty array to store the image urls
  imgArray.push(productOverView[0].image); // appending first image url
  if(productOverView[0].alternateImages != null){
    await productOverView[0].alternateImages.map((img) => {
      imgArray.push(img);
    });
  }

  return { props: { productOverView, imgArray ,topProducts} };
}

export default Pages2;
