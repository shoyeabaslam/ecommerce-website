import TotalOrder from '@/components/TotalOrder';
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'
import { getAllProductsImages, getOrders } from "@/sanity/sanity-utils";
import Head from 'next/head';
import DeliveredOrders from '@/components/DeliveredOrders';

const Dashboard = ({torders,productImages,toast,totalDeliveredProducts,totalAmount}) => {
  const {data:Session}  = useSession();
  const [isTotalClicked,setIsTotalClicked] = useState(true);
  const [isDeliveredClicked ,setIsDeliveredClicked] = useState(false);
  if(Session){
    if(Session.user.email === 'shoyeab.ecom@gmail.com'){
        return(
            <div>
                <Head>
                   <title>Order Details</title>
                </Head>
                <div className='flex flex-wrap justify-center font-Roboto'>
                    <div onClick={()=>{setIsTotalClicked(true),setIsDeliveredClicked(false)}} className='w-[250px] h-[100px] cursor-pointer bg-lightred m-2 text-white flex flex-col items-center justify-center rounded-lg shadow-md shadow-customrosered hover:shadow-lg hover:shadow-customrosered'>
                        <p>Total Orders</p>
                        <p className='font-bold'>{torders.length}</p>
                    </div>
                    <div onClick={()=>{setIsTotalClicked(false),setIsDeliveredClicked(true)}} className='cursor-pointer w-[250px] h-[100px] bg-green-600 m-2 text-white flex flex-col items-center justify-center rounded-lg shadow-md shadow-green-400 hover:shadow-lg hover:shadow-green-400'>
                        <p>Delivered Orders</p>
                        <p>{totalDeliveredProducts.length}</p>
                    </div>
                    <div className='w-[250px] h-[100px] bg-orange-400 m-2 text-white flex flex-col items-center justify-center rounded-lg shadow-md shadow-orange-300'>
                        <p>Total Revenue</p>
                        <p>₹{totalAmount}</p>
                    </div>
                </div>
                {isTotalClicked && <TotalOrder torders={torders} productImages = {productImages} toast={toast}/>}
                {isDeliveredClicked && <DeliveredOrders torders={torders} productImages = {productImages} toast={toast}/>}
            </div>
        )
    }
    else{
        return(
            <div>Login With Admin Id</div>
        )
    }
  }
  else{
    return(
        <div>Please Login With Admin Id</div>
    )
  }
}

export default Dashboard

export async function getServerSideProps(context) {
    const torders = await getOrders()
    const productImages = await getAllProductsImages();
    const totalDeliveredProducts = torders.filter((item) => item.orderStatus === 'Delivered');
    const totalAmount = torders.reduce((sum, item) => sum + item.totalPrice, 0);
    return {
      props: {
        torders,
        productImages,
        totalDeliveredProducts,
        totalAmount
      },
    };
}