import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {RiLuggageCartLine} from 'react-icons/ri'
import {TbTruckDelivery} from 'react-icons/tb'
import {BiMap} from 'react-icons/bi'
import {MdOutlineLocalOffer} from 'react-icons/md'
import {
  getAllBannerImages,
  getBottomBannerImages,
  getCategories,
  getDealOfTheDay,
  getTopProducts,
} from "@/sanity/sanity-utils";

// react icons
import { IoMdCart } from "react-icons/io";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import styles from "../styles/home.module.css";
// Import Swiper styles
import "swiper/css";
import { useRouter } from "next/router";

const TopPrducts = ({
  id,
  slug,
  title,
  imageUrl,
  actualPrice,
  price,
  popularTag,
  stock,
  addToCart,
  toast,
}) => {
  const color_array = [
    "bg-lightred",
    "bg-bold-green",
    "bg-orange-500",
    "bg-red-500",
  ];
  return (
    <div
      className={`${styles.product_wrapper_class}  w-[10rem] mt-4 h-[16rem] sm:w-[14rem] sm:m-4 lg:m-8 sm:h-[22rem] shadow-shadow2 rounded-lg sm:rounded-xl border px-2 py-2 sm:py-4 relative overflow-hidden flex items-center flex-col cursor-pointer bg-white`}
    >
     <Link href={`/product/${slug}?id=${id}`}>
        <div>
          <div className="  w-[9rem] h-[10rem] mr-auto sm:w-[12rem] sm:h-[14rem] ml-auto rounded-md  overflow-hidden  ">
            {/* image */}
            <Image
              className={`${styles.product_image_class} rounded-md object-contain h-[10rem] sm:h-[14rem]`}
              src={imageUrl}
              width={500}
              height={500}
              alt="top Prodcuts"
            />
          </div>
        </div>
          {/* title */}
          <div className="mt-2 mb-1">
            <h4 className=" text-xs truncate  text-ellipsis sm:text-sm capitalize  font-Roboto text-black w-[9rem] sm:w-[14rem] font-bold break-words text-center">
              {title}
            </h4>
          </div>
      </Link>
      
      <div>
        {/* price */}
        <div className="flex w-[9rem] sm:w-[12rem] items-center justify-around font-Robot0 my-1">
          <p className="text-green-600 text-sm sm:text-base font-bold">₹{price}</p>
          <strike className=" text-sm sm:text-base text-red-500 ">₹{actualPrice}</strike>
        </div>
        <button
            onClick={() => {
              stock === "available" &&
                (addToCart({
                  productId: id,
                  _key: id,
                  productName: title,
                  productPrice: price,
                  imageUrl: imageUrl,
                }),
                toast.success(`Item added to cart successfully!`,{
                  position: toast.POSITION.BOTTOM_CENTER,
                  icon: ({theme, type}) =>  <IoMdCart/>
                }));
            }}
            className={`w-full sm:text-sm py-1 text-xs font-Roboto rounded-lg  ${
              stock == "outOfStock"
                ? "text-gray-400 border "
                : "hover:bg-lightredhover bg-lightred text-white"
            }`}
          >
            Add To Cart
          </button>
      </div>

      <div
        className={`p-1 text-center top-[15px] -right-[32px] rotate-45 sm:top-[30px] sm:-right-[34px] text-white ${
          popularTag == "Hot Deal" && color_array[3]
        } ${popularTag == "Best Seller" && color_array[0]} ${
          popularTag == "New Arrival" && color_array[1]
        } ${
          popularTag == "Trending" && color_array[2]
        }  absolute z-[2] w-[120px] sm:w-[150px]`}
      >
        <p className="text-[10px] sm:text-sm right-0 font-Roboto">
          {popularTag}
        </p>
      </div>
      {stock == "outOfStock" && (
        <div className="absolute z-10 w-full  top-[50%] rounded-xl">
          <p className="text-sm text-center bg-red-400 rounded-sm  text-white font-Roboto">
            Out Of Stock
          </p>
        </div>
      )}
    </div>
  );
};

const DealOfTheDay = ({
  id,
  slug,
  title,
  imageUrl,
  actualPrice,
  price,
  stock,
  addToCart,
  toast,
}) => {
  const router = useRouter();
  const redirectTOLandingPage = (id, slug) => {
    // <Link href={`/product/${Product.slug}?id=${Product._id}`}  key={Product._id}></Link>//
    router.push(`/product/${slug}?id=${id}`);
  };
  return (
    <div
      className={`${styles.product_wrapper_class} w-[10rem] mt-4 h-[16rem] sm:w-[14rem] sm:m-4 lg:m-8 sm:h-[22rem] shadow-shadow2 rounded-lg sm:rounded-xl border px-2 py-2 sm:py-4 relative overflow-hidden flex items-center flex-col cursor-pointer bg-white`}
    >
      <Link href={`/product/${slug}?id=${id}`}>
        <div>
          <div className=" w-[9rem] h-[10rem] mr-auto sm:w-[12rem] sm:h-[14rem] ml-auto rounded-md  overflow-hidden ">
            {/* image */}
            <Image
              className={`${styles.product_image_class} object-contain h-[10rem] sm:h-[14rem]`}
              src={imageUrl}
              width={500}
              height={500}
              alt="top Prodcuts"
            />
          </div>
        </div>
          {/* title */}
          <div className="mt-2 mb-1">
            <h4 className=" text-xs truncate  text-ellipsis sm:text-sm capitalize  font-Roboto text-black w-[9rem] sm:w-[14rem] font-bold break-words text-center">
              {title}
            </h4>
          </div>
      </Link>
      <div>
        {/* price */}
        <div className="flex w-[9rem] sm:w-[12rem] items-center justify-around font-Robot0 my-1">
          <p className="text-green-600 text-sm sm:text-base font-bold">₹{price}</p>
          <strike className=" text-sm sm:text-base text-red-500 ">₹{actualPrice}</strike>
        </div>
        <button
            onClick={() => {
              stock === "available" &&
                (addToCart({
                  productId: id,
                  _key: id,
                  productName: title,
                  productPrice: price,
                  imageUrl: imageUrl,
                }),
                toast.success(`Item added to cart successfully!`,{
                  position: toast.POSITION.BOTTOM_CENTER,
                  icon: ({theme, type}) =>  <IoMdCart/>
                }));
            }}
            className={`w-full sm:text-sm py-1 text-xs font-Roboto rounded-lg  ${
              stock == "outOfStock"
                ? "text-gray-400 border "
                : "hover:bg-lightredhover bg-lightred text-white"
            }`}
          >
            Add To Cart
          </button>
      </div>
      <div
        className={`p-1 text-center top-0 right-0 text-white bg-lightred absolute z-[2] w-[45px] sm:w-[100px] rounded-bl-xl`}
      >
        <p className="text-[9px] sm:text-sm right-0 font-Roboto">
          {Math.ceil((price / actualPrice) * 100)}% Off
        </p>
      </div>
      {stock == "outOfStock" && (
        <div className="absolute z-10 w-full  bg-gray-400 top-[50%] bg-transparen">
          <p className="text-sm text-center bg-red-400 text-white font-Roboto">
            Out Of Stock
          </p>
        </div>
      )}
    </div>
  );
};

export default function Home({
  categories,
  topProducts,
  dealOFTheDay,
  addToCart,
  toast,
  bannerImages,
  bottomBanner
}) {
  SwiperCore.use([Autoplay]);
  return (
    <>
      <Head>
        <title>
          Welcome to JExprez - Your One-Stop Online Shopping Destination
        </title>
       
      </Head>
      <main className={`p-1`}>
        <div className="home_container lg:flex lg:justify-center items-center lg:px-4 lg:mt-2">
          <div className="slider_container">
            <Swiper
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 2000 }}
              className="w-full lg:w-[95vw] object-contain lg:h-[80vh] rounded-lg"
            >
              {bannerImages.map((items) => (
                <SwiperSlide key={items._id}>
                  <Image
                    className=" w-full lg:w-[95vw] object-cover object-center lg:h-[80vh] rounded-lg"
                    src={items.sliderImage}
                    width={1000}
                    height={1000}
                    alt="banner Image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* ---------------------------section 2----------------------------------------- */}
        <div className="px-2 sm:px-10">
          {/* ----------Category section ----------------------*/}
          <div className=" category_container flex flex-col items-center w-[100%] mt-5">
            <div className="flex justify-center w-[70vw] items-center">
              <div className="w-[20%] h-[1px] bg-lightred" />
              <h1 className="font-Alegreya text-xl text-maron lg:text-4xl  p-2 sm:p-10">
                Our Category
              </h1>
              <div className="w-[20%] h-[1px] bg-lightred" />
            </div>

            <div className="flex flex-wrap w-full justify-center lg:items-center lg:flex-row pt-4">
              {categories.map((category) => (
                <Link
                  href={`/category/${category.category}`}
                  key={category._id}
                >
                  <div
                    className={`${styles.categories_wrapper} mx-2 my-2 shadow-lg border flex w-[150px] h-[50px] md:w-[250px] md:h-[60px] rounded-lg overflow-hidden cursor-pointer pl-2`}
                  >
                    <div className={`w-[30px] md:w-[50px] mt-auto mb-auto`}>
                      <Image
                        className={`${styles.categories_image}`}
                        src={category.categoryImage}
                        width={500}
                        height={500}
                        alt="category img"
                      />
                    </div>
                    <div
                      className={`${styles.categories_subtext} flex w-full justify-center items-center`}
                    >
                      <h4 className="text-[11px] leading-3 md:text-sm font-Alegreya break-words text-center">
                        {category.category}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ------------ Deal of the day--------------- */}
          <div className="mt-10">
            <div className="flex justify-center items-center">
              <h1 className="font-Alegreya text-xl px-10 text-maron lg:text-4xl ">
                Deal Of The Day
              </h1>
            </div>
            <p className="text-center text-xsm sm:text-sm text-gray-400 py-4">
              Do Not Miss The Current Offers Until The End Of March.
            </p>
            <div className="flex flex-wrap justify-evenly md:justify-center">
              {dealOFTheDay.map((Product) => (
                <DealOfTheDay
                  addToCart={addToCart}
                  toast={toast}
                  key={Product._id}
                  id={Product._id}
                  slug={Product.slug}
                  title={Product.title}
                  imageUrl={Product.image}
                  actualPrice={Product.actualprice}
                  price={Product.price}
                  stock={Product.stock}
                />
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------------------------------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {bottomBanner.map((image) => (
              <div
                key={image._id}
                className="bg-gray-200 h-[160px] md:h-[220px] relative rounded-lg"
              >
                <Image
                  className="h-[160px] rounded-lg object-cover object-center w-full md:h-[220px]"
                  src={image.bannerImage}
                  width={500}
                  height={500}
                  alt="bottom banner image"
                />
                <div
                  style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                  className="absolute font-Roboto right-0 left-0 top-0 bottom-0 flex flex-col items-end justify-center p-6"
                >
                  <p className=" font-bold text-sm sm:text-2xl text-white py-4">
                    {image.bannerTitle}
                  </p>
                  <Link href={image.bannerURL}>
                    <butto className="bg-lightred px-8 p-1 text-white rounded-lg my-2 cursor-pointer">
                      Shop
                    </butto>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ------------------------Top Product Section-------------- */}
          <div className="mt-6">
            <div>
              <h1 className="font-Alegreya text-2xl text-maron text-center lg:text-4xl  p-2 sm:p-10">
                Top Products
              </h1>
            </div>
            <div className="flex flex-wrap justify-evenly md:justify-center ">
              {topProducts.map((products) => (
                <TopPrducts
                  key={products._id}
                  id={products._id}
                  slug={products.slug}
                  title={products.title}
                  imageUrl={products.image}
                  actualPrice={products.actualprice}
                  price={products.price}
                  popularTag={products.popularTag}
                  stock={products.stock}
                  addToCart={addToCart}
                  toast={toast}
                />
              ))}
            </div>
          </div>
        </div>
        {/* ---------------------------section 3------------------------------------------ */}
        <div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 px-4 sm:px-10 text-customrosered">
            <div className=" rounded-lg h-[150px] shadow-shadow1 flex flex-col items-center justify-center font-Roboto">
              <div className="bg-rose-200 p-3 rounded-full"><RiLuggageCartLine className="text-3xl "/></div>
              <p className="capitalize py-2  font-bold">premium quality product</p>
            </div>
            <div className=" rounded-lg h-[150px] shadow-shadow1 flex flex-col items-center justify-center font-Roboto">
            <div className="bg-rose-200 p-3 rounded-full"><TbTruckDelivery className="text-3xl "/></div>
              <p className="capitalize pt-2  font-bold">Express Delivery</p>
              <p className="capitalize text-xs text-customrosered">Free Shipping for above ₹250</p>
            </div>
            <div className=" rounded-lg h-[150px] shadow-shadow1 flex flex-col items-center justify-center font-Roboto">
            <div className="bg-rose-200 p-3 rounded-full"><BiMap className="text-3xl"/></div>
              <p className="capitalize py-2  font-bold">Order Tracking</p>
            </div>
            <div className=" rounded-lg h-[150px] shadow-shadow1 flex flex-col items-center justify-center font-Roboto">
            <div className="bg-rose-200 p-3 rounded-full"><MdOutlineLocalOffer className="text-3xl "/></div>
              <p className="capitalize py-2  font-bold">Regular Discounts</p>
            </div>
           
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const categories = await getCategories();
  const topProducts = await getTopProducts();
  const dealOFTheDay = await getDealOfTheDay();
  const bannerImages = await getAllBannerImages();
  const bottomBanner = await getBottomBannerImages();

  return {
    props: {
      categories,
      topProducts,
      dealOFTheDay,
      bannerImages,
      bottomBanner
    },
  };
}
