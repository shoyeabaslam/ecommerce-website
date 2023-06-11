import { getAllProductsImages, getOrdersByEmail } from "@/sanity/sanity-utils";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TrackOrder = ({ myOrders, productImages }) => {
  const getProductUrl = (id) => {
    const url = productImages.filter((item) => {
      return item._id === id;
    });
    return url[0]?.image; // Assuming you want to return the image property of the first matching item
  };
  const ordPer = {'Pending':25,'Processing':50,'OutOfDelivery':75,'Delivered':100}
  return (
    <div>
      <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
          {myOrders.map((items) => (
            <div
              key={items._id}
              className="bg-white shadow overflow-hidden sm:rounded-lg my-4 font-Roboto"
            >
              <div className="px-4 py-4 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Order ID: {items.orderId}
                </h2>
                <div className="flex items-center justify-start">
                  <div>
                    <p className="text-sm mr-2 text-gray-500">Order Status: </p>
                  </div>
                  <div className="relative w-full flex justify-center items-center flex-1">
                    <progress className="flex-1 h-2 mr-2" value={ordPer[`${items.orderStatus}`]} max={100}></progress>
                    {items.orderStatus === "Pending" && (
                      <div className="flex  items-center">
                        <div className="animate-pulse bg-yellow-500 border border-black rounded-full ] w-4 h-4">
                          .
                        </div>
                        <p className="text-sm ml-2">Pending</p>
                      </div>
                    )}
                    {items.orderStatus === "Processing" && (
                      <div className="flex  items-center">
                        <div className="animate-pulse bg-rose-500 border border-black rounded-full ] w-4 h-4">
                          .
                        </div>
                        <p className="text-sm ml-2">Processing</p>
                      </div>
                    )}
                    {items.orderStatus === "OutOfDelivery" && (
                      <div className="flex  items-center">
                        <div className="animate-pulse bg-blue-500 border border-black rounded-full ] w-4 h-4">
                          .
                        </div>
                        <p className="text-sm ml-2">Out for Delivery</p>
                      </div>
                    )}
                    {items.orderStatus === "Delivered" && (
                      <div className="flex  items-center">
                        <div className="animate-pulse bg-green-700 border border-black rounded-full ] w-4 h-4">
                          .
                        </div>
                        <p className="text-sm ml-2">Delivered</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900 py-6">
                  Total Quantity : {items.items.length}
                </h3>
                <ul>
                  {items.items.map((details) => (
                    <li
                      className="flex items-center justify-between"
                      key={details.productId}
                    >
                      <Image
                        className="w-10 h-12 object-contain"
                        src={getProductUrl(details.productId)}
                        width={500}
                        height={500}
                        alt="product image"
                      />{" "}
                      <p>{details.productName}</p>{" "}
                      <p>{details.productQuantity}</p>{" "}
                      <p>₹{details.productPrice}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Price
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  ₹{items.totalPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const productImages = await getAllProductsImages();
  let email = "";
  if (session) {
    email = session.user.email;
  }
  const myOrders = await getOrdersByEmail(email);
  return {
    props: {
      myOrders,
      productImages,
    },
  };
}
