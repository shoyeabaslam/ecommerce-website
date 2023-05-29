import { searchItems } from '@/sanity/sanity-utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoMdCart } from "react-icons/io";
import styles from "../styles/home.module.css"
import rejected from '../public/images/rejected.png'
import { useRouter } from 'next/router';



const Product = ({ title,id,slug, price, imageUrl, actualprice,stock,addToCart,toast}) => {
  return (
    <div
      className={`${styles.product_wrapper_class} w-[10rem] mt-4 h-[17rem] sm:w-[16rem] sm:m-4 lg:m-8 sm:h-[24rem] shadow-lg shadow-gray-300 rounded-lg border p-2 sm:py-4 relative overflow-hidden flex items-center flex-col cursor-pointer justify-evenly bg-white`}
    >
     <Link href={`/product/${slug}?id=${id}`}>
     <div>
      <div className=" w-[9rem] h-[12rem] sm:w-[14rem] sm:h-[15rem] rounded-md mt-0 sm:mt-2  overflow-hidden ">
        {/* image */}
        <Image
          className={`${styles.product_image_class} object-cover h-[12rem] sm:h-[15rem] mr-auto ml-auto`}
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
        <div className="flex w-[8rem] sm:w-[10rem] items-center h-[40px] justify-between font-Roboto">
          <p className="font-bold  text-green-600 ">₹{price}</p>
          <strike className=" text-red-500 ">₹{actualprice}</strike>
          <button onClick={()=>{stock==='available' && (addToCart({"productId":id,"_key":id ,"productName":title,"productPrice":price,"imageUrl":imageUrl}) ,toast.success(`Item added to cart successfully!`))}}  className={`flex items-center justify-center text-xl sm:text-2xl  rounded-full ${(stock=="outOfStock")?'text-gray-500 ':'text-maron hover:text-lightred'}`}>
              <IoMdCart />
            </button>
        </div>
      </div>
   
      {
          (stock == 'outOfStock') && (<div className="absolute z-10 w-full  bg-gray-400 top-[50%] bg-transparen">
          <p className="text-sm sm:text-base text-center bg-red-400 text-white font-Roboto">Out Of Stock</p>
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
      <p className='text-base ml-9 mt-2 sm:text-xl text-maron'>Your Search Results:</p>
      <div className='flex  flex-wrap justify-evenly sm:justify-start'>
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
      <div><Image className="w-24 sm:w-28" src={rejected} width={500} height={500} alt="Product Available Soon!"/></div>
      <div><p className="font-Alegreya  text-center text-2xl sm:text-3xl text-maron">Sorry! Try With Diffrent Keyword</p></div>
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