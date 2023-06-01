import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/home.module.css";
import { IoMdCart } from "react-icons/io";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import rejected from '../../public/images/rejected.png'
import {
  getProducts,
  getSubCategories,
  getTotalProducts,
} from "@/sanity/sanity-utils";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const Product = ({ title,id,slug, price, imageUrl, actualprice,stock,addToCart,toast}) => {
  return (
    <div
    className={`${styles.product_wrapper_class}  w-[10rem] mt-4 h-[16rem] sm:w-[14rem]  lg:m-8 sm:h-[21rem] shadow-lg shadow-gray-300 rounded-lg sm:rounded-xl border px-2 py-2  relative overflow-hidden flex items-center flex-col cursor-pointer bg-white`}
    >
     <Link href={`/product/${slug}?id=${id}`}>
     <div>
      <div className=" w-[8rem] h-[10rem] mr-auto sm:w-[13rem] sm:h-[14rem] ml-auto rounded-md  overflow-hidden ">
        {/* image */}
        <Image
          className={`${styles.product_image_class} object-cover h-[10rem] rounded-md sm:h-[14rem]`}
          src={imageUrl}
          width={500}
          height={500}
          alt="top Prodcuts"
        />
      </div>
      {/* title */}
      <div className="mt-2">
        <h4 className=" text-xs truncate text-ellipsis sm:text-sm capitalize sm:my-0 font-Roboto text-maron w-32 sm:w-52 font-bold break-words text-center">
          {title}
        </h4>
        </div>
      </div>
     </Link>
     <div>
        {/* price */}
        <div className="flex w-[9rem] sm:w-[12rem] items-center justify-around font-Robot0 my-1">
          <p className="text-green-600 text-sm sm:text-base font-bold">₹{price}</p>
          <strike className=" text-sm sm:text-base text-red-500 ">₹{actualprice}</strike>
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
   
      {
          (stock == 'outOfStock') && (<div className="absolute z-10 w-full  bg-gray-400 top-[50%] bg-transparen">
          <p className="text-sm sm:text-base text-center bg-red-400 text-white font-Roboto">Out Of Stock</p>
        </div>)
        }
    </div>
  );
};

const Pages = ({ products, subcategories, currPage, totalPages,addToCart,toast ,type}) => {
  const router = useRouter();
  console.log(router.basePath)
 if(products.length!=0){
  return (
    <div className="p-4 relative">
      <Head><title>{`${router.query.slug} - JExprez`}</title></Head>
       <div className="flex justify-between mb-6 mt-12 sm:mt-0">
         <p className="text-center flex-1  font-Alegreya text-xl sm:text-3xl text-maron">{router.query.slug} Category</p>
        </div>

        <select  defaultValue={'none'} onChange={(e)=>{router.push(`/category/${router.query.slug}?type=${type}&sort=${e.target.value}&page=${currPage}`)}} className="absolute right-2 top-3 flex justify-end outline-none border px-4 py-1 cursor-pointer rounded-xl border-black">
            <option value={'none'} disabled>Sort</option>
            <option value={'new-arraivals'}>New Arraivals</option>
            <option value={'low-high'}>Low - High</option>
            <option value={'high-low'}>High - Low</option>
          </select>
      <div className="pb-4 flex justify-center relative">
        <ul className="flex justify-center flex-wrap">
         {
          subcategories[0].subcategories!=null && <Link href={`/category/${router.query.slug}`}><li className="m-2 font-Roboto  px-5 py-1 cursor-pointer bg-lightred text-white shadow-md shadow-customrosered rounded-md">All</li></Link>
         }
          {subcategories[0].subcategories!=null && subcategories[0].subcategories.map((cat,index) => (
               <Link href={`/category/${router.query.slug}?type=${cat.toLowerCase()}`} key={index}> <li
               className="m-2 font-Roboto border px-5 py-1 border-gray-100 shadow-gray-300 cursor-pointer text-lightred shadow-lg rounded-md">
                  {cat}
                </li>
                </Link>
              ))
          }
        </ul>
       
      </div>
      <div className="flex flex-wrap justify-evenly sm:justify-center ">
        {products.map((product) => (
            <Product
              key={product._id}
              id  = {product._id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              actualprice={product.actualprice}
              stock={product.stock}
              slug={product.slug}
              addToCart={addToCart}
              toast={toast}

            />
      
        ))}
      </div>

      <div className="flex justify-center">
        {totalPages > 1 ? (
          <ul className="flex justify-evenly font-Roboto text-sm mt-16 w-[100%]  md:w-[80%]">
            {currPage > 1 ? (
              <Link
                href={`/category/${router.query.slug}?type=${type}&page=${Number(currPage) - 1}`}
              >
                <li className="flex justify-center text-xl border border-lightred hover:text-white hover:bg-lightred rounded  items-center px-4 text-lightred py-2">
                  <MdNavigateBefore className="mr-2" />
                  Prev
                </li>
              </Link>
            ) : (
              <li className="flex justify-center text-xl border cursor-pointer text-lightred rounded  items-center px-4 py-2">
                <MdNavigateBefore className="mr-2" />
                Prev
              </li>
            )}
            {currPage < totalPages ? (
              <Link
                href={`/category/${router.query.slug}?type=${type}&page=${Number(currPage) + 1}`}
              >
                <li className="flex justify-center text-xl border  border-lightred rounded items-center px-4 text-lightred py-2 hover:bg-lightred hover:text-white">
                  Next <MdNavigateNext className="ml-2" />
                </li>
              </Link>
            ) : (
              <li className="flex justify-center text-xl border  text-lightred rounded items-center px-4  py-2 cursor-pointer">
                Next <MdNavigateNext className="ml-2" />
              </li>
            )}
          </ul>
        ) : (
          <ul></ul>
        )}
      </div>
    </div>
  );
 }
 else{
  return(
    <div className="p-8 flex items-center space-y-4 flex-col">
      <div><Image className="w-24 sm:w-28" src={rejected} width={500} height={500} alt="Product Available Soon!"/></div>
      <div><p className="font-Alegreya text-2xl sm:text-3xl text-maron">Products Available Soon!</p></div>
      <button onClick={()=>{router.back()}} className="px-2 py-1 bg-lightred rounded-lg text-white">Go back</button>
    </div>
  )
 }
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  let currPage = context.query.page || 1
  const dataPerPage = 5;
  let offSet = (currPage - 1) * dataPerPage;

  let type  = context.query.type || 'all'
  const sortArray = {'new-arraivals':'_id','low-high':'price asc','high-low':'price desc'}
  let sort1 = context.query.sort || '_id'
  const products = await getProducts(slug, offSet, offSet + dataPerPage,type.toLowerCase(),sortArray[sort1]);
  const subcategories = await getSubCategories(slug);
  const tProducts = await getTotalProducts(slug);
  const totalPages = Math.ceil(tProducts.length / dataPerPage); // imp
  return {
    props: {
      products,
      subcategories,
      currPage,
      totalPages,
      type
    },
  };
}

export default Pages;
