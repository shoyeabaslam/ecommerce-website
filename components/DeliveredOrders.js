import axios from "axios";
import Image from "next/image";
import React, {  useState } from "react";
import { HiEye } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { Oval } from "react-loader-spinner";


const OrdersView = ({orderItems,setIsOpen,productImages,toast}) => {
    const [selectedStatus, setSelectedStatus] = useState(orderItems.orderStatus);
  
  
    const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
    };
  
    const getProductUrl = (id) => {
      const url = productImages.filter((item) => {
        return item._id === id;
      });
      return url[0]?.image; // Assuming you want to return the image property of the first matching item
    };
  
   
  
    return (
      <div className="bg-yellow-100 fixed h-[100vh] overflow-auto top-[65px] left-[5%] right-[5%] flex flex-col py-10 px-8">
        <div className="relative">
        
          <div className="absolute top-0 right-0"><ImCross onClick={()=>{setIsOpen(false)}} className="text-lightred cursor-pointer"/></div>
          <div>
            <h2 className="text-xl font-bold text-center text-maron">
              Order Details
            </h2>
          </div>
          <div className="mb-4 flex items-center space-x-6">
            <h2 className="text-base font-semibold">Order ID:</h2>
            <p>#{orderItems.orderId}</p>
          </div>
          <div className="mb-4 flex items-center space-x-6">
            <h2 className=" font-semibold">Payment Mode:</h2>
            <p>{orderItems.payment.paymentMode}</p>
          </div>
          <div className="mb-4">
            <h2 className=" font-semibold">Customer Details:</h2>
            <p className="mt-2 ">
              Name: <span className="text-maron ml-2">{orderItems.customer.cName}</span>  <br />
              Email: <span className="text-maron ml-2">{orderItems.customer.cEmail}</span>  <br />
              Phone: <span className="text-maron ml-2">{orderItems.customer.cPhone}</span>  <br />
              Address:<span className="text-maron ml-2">{orderItems.customer.cAddress}</span>  
            </p>
          </div>
          <div className="mb-4 flex items-center space-x-6">
            <h2 className=" font-semibold">Total Price:</h2>
            <p>₹{orderItems.totalPrice}</p>
          </div>
          <div className="mb-4 flex items-center space-x-6">
            <h2 className=" font-semibold">Special Instruction To Seller:</h2>
            <p>{orderItems.specialInstruction}</p>
          </div>
  
          <div className="flex space-x-8">
            <p className="font-bold">Order Status:</p>
            <div>
              <input
                className="accent-lightred"
                type="radio"
                id="pending"
                value="Pending"
                checked={selectedStatus === "Pending"}
                onChange={handleStatusChange}
              />
              <label className="ml-2" htmlFor="pending">
                Pending
              </label>
            </div>
            <div>
              <input
                className="accent-lightred"
                type="radio"
                id="processing"
                value="Processing"
                checked={selectedStatus === "Processing"}
                onChange={handleStatusChange}
              />
              <label className="ml-2" htmlFor="processing">
                Processing
              </label>
            </div>
            <div>
              <input
                type="radio"
                className="accent-lightred"
                id="out-of-delivery"
                value="OutOfDelivery"
                checked={selectedStatus === "OutOfDelivery"}
                onChange={handleStatusChange}
              />
              <label className="ml-2" htmlFor="out-of-delivery">
                Out of Delivery
              </label>
            </div>
            <div>
              <input
                type="radio"
                className="accent-lightred"
                id="delivered"
                value="Delivered"
                checked={selectedStatus === "Delivered"}
                onChange={handleStatusChange}
              />
              <label className="ml-2" htmlFor="delivered">
                Delivered
              </label>
            </div>
          </div>
  
          <div className="grid grid-cols-4 gap-2 mt-4 pb-16 ">
            <div className="bg-customrosered font-bold p-2">Product Image</div>
            <div className="bg-customrosered font-bold p-2">Product Name</div>
            <div className="bg-customrosered font-bold p-2">Product Price</div>
            <div className="bg-customrosered font-bold p-2">Product Quantity</div>
  
            {
              orderItems.items.map((item)=>(
                <React.Fragment key={item.productId}>
                     <div className="  p-2 flex justify-center"><Image className="w-16 border border-black rounded-lg h-20 object-contain" src={getProductUrl(item.productId)} width={500} height={500} alt="Product Image"/></div>
                      <div className="border border-black rounded-lg  p-2">{item.productName}</div>
                      <div className="border border-black rounded-lg  p-2">₹{item.productPrice}</div>
                      <div className="border border-black rounded-lg  p-2">{item.productQuantity}</div>
                </React.Fragment>
              ))
            }
            
          </div>
        </div>
      </div>
    );
};
  

const DeliveredOrders = ({ torders ,productImages,toast}) => {
  
    const statusColor = { Delivered: "bg-green-300"};
  const [orderItems,setOrdersItems] = useState({});
  const [searchBar, setSearchBar] = useState("");
  const [isOpen,setIsOpen] = useState(false);
  const filteredData =
    searchBar !== ""
      ?  torders.filter((item) => item.orderId.includes(searchBar) && item.orderStatus === 'Delivered')
      : torders.filter((item) => item.orderStatus === 'Delivered');


  const handleOrderView = (item)=>{
    setOrdersItems(item)
    setIsOpen(true)
    
  }    
  return (
    <div className="p-8 font-Roboto relative">
      {isOpen && <OrdersView orderItems={orderItems} setIsOpen={setIsOpen} productImages={productImages} toast={toast}/>}
      <div>
       <div className="flex   items-center">
       <input
          onChange={(e) => {
            setSearchBar(e.target.value);
          }}
          className="border  border-black outline-none my-6 w-[300px] py-2 px-2 rounded-lg"
          placeholder="Search Order Id"
        />
      
       </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-200 p-4">Order ID</div>
          <div className="bg-gray-200 p-4">Address</div>
          <div className="bg-gray-200 p-4">Amount</div>
          <div className="bg-gray-200 p-4">Status</div>

          

          {filteredData.map((item) => (
            <React.Fragment key={item._id}>
              <div className="bg-white p-4 truncate">{item.orderId}</div>
              <div className="bg-white p-4 truncate">
                {item.customer.cAddress}
              </div>
              <div className="bg-white p-4 truncate">₹{item.totalPrice}</div>
              <div
                className={`p-4 flex justify-center items-center truncate rounded-lg ${
                  statusColor[item.orderStatus]
                }`}
              >
                {item.orderStatus === "" ? "Pending" : item.orderStatus}
                
                  <HiEye onClick={()=>handleOrderView(item)} className="text-xl ml-2 hover:text-lightredhover cursor-pointer" />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DeliveredOrders