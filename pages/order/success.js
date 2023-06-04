import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import successImage from '../../public/images/fireworks.png'
import Image from "next/image";
import Head from "next/head";
const Success = () => {
    const router = useRouter()
    useEffect(() => {
      const handlePopState = (event) => {
        // Check if the back button was clicked
        if (event.type === 'popstate') {
          // Handle the back button click event
          // Redirect or perform any desired action
          router.push('/'); // Redirect to the homepage, for example
        }
      };
  
      // Listen for the popstate event
      window.addEventListener('popstate', handlePopState);
  
      return () => {
        // Clean up event listener
        window.removeEventListener('popstate', handlePopState);
      };
    }, [router]);
  return (
    <div className="p-12">
      <Head><title>{`Order Success - JExprez`}</title></Head>
      <div className="flex flex-col items-center">
        <div className="w-20">
          <Image src={successImage} width={500} height={500} alt="success" />
        </div>
        <p className="font-Roboto font-bold text-xl sm:text-2xl pt-5 px-4">Your order is complete!</p>
        <p className="font-Roboto font-bold text-sm text-maron pt-1">Order id : #<span>{router.query.orderId}</span></p>
        <div className="flex font-Roboto text-sm">
          <Link href={'/trackorder'}><button className="bg-lightred text-white rounded-lg hover:bg-lightredhover px-2
        py-1 m-4">Track Your Order</button></Link> <Link href={'/'}><button className="bg-lightred hover:bg-lightredhover text-white rounded-lg py-1 px-2 m-4">Continue Shopping</button></Link></div>
      </div>
    </div>
  );
};

export default Success;
