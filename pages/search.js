import { searchItems } from '@/sanity/sanity-utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoMdCart } from "react-icons/io";
import styles from "../styles/home.module.css"
import rejected from '../public/images/rejected.png'
import { useRouter } from 'next/router';
import Head from 'next/head';


const Product = ({ title,id,slug, price, imageUrl, actualprice,stock,addToCart,toast}) => {
  return (
    <div
    className={`${styles.product_wrapper_class}  w-[10rem] mt-4 h-[16rem] sm:w-[14rem]  lg:m-8 sm:h-[21rem] shadow-lg shadow-gray-300 rounded-lg sm:rounded-xl border px-2 py-2  relative overflow-hidden flex items-center flex-col cursor-pointer bg-white`}
    >
     <Link href={`/product/${slug}?id=${id}`}>
     <div>
      <div className=" w-[9rem] h-[10rem] mr-auto sm:w-[13rem] sm:h-[14rem] ml-auto rounded-md  overflow-hidden ">
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
          <p className="text-sm  text-center bg-red-400 text-white font-Roboto">Out Of Stock</p>
        </div>)
        }
    </div>
  );
};
const Search = ({addToCart,toast,pSearch}) => {
  const router = useRouter()
 if(pSearch.length!=0){
  return (
    <div className='font-Roboto p-4'>
      <Head> <title>{`Search - JExprez`}</title></Head>
      <p className='text-base text-center mt-2 sm:text-xl text-maron'>Your Search Results:</p>
      <div className='flex  flex-wrap justify-evenly sm:justify-center'>
          {
              pSearch.map((item)=>(
                <Product key={item._id}
                id  = {item._id}
                title={item.title}
                imageUrl={item.image}
                price={item.price}
                actualprice={item.actualprice}
                stock={item.stock}
                slug={item.slug}
                addToCart={addToCart}
                toast={toast} />
              ))
          }
      </div>
    </div>
  )
 }
 else{
  return(
    <div className="p-8 flex items-center space-y-4 flex-col">
      <Head> <title>{`Search - JExprez`}</title></Head>
      <div><Image className="w-24 sm:w-28" src={rejected} width={500} height={500} alt="Product Available Soon!"/></div>
      <div>
        <p className="font-Alegreya  text-center text-2xl sm:text-3xl text-maron">Sorry! No Results Found</p>
        <p className="font-Alegreya  text-center text-sm text-maron">Try with different keyword</p>
      </div>
      <button onClick={()=>{router.push('/')}} className="px-2 py-1 bg-lightred rounded-lg text-white">Go To Home</button>
    </div>
  )
 }
}

export default Search

export async function getServerSideProps(context){
    const {query} = context;
    const pSearch = await searchItems(query.query !=='' && query.query);
    // console.log(pSearch)
    return{
        props:{pSearch}
    }
}