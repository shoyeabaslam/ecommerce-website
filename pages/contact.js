import Image from "next/image";
import React, { useState } from "react";
import logo from "../public/images/logo.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdPayment ,MdProductionQuantityLimits} from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { RiExchangeFill } from "react-icons/ri";
import { BsFillBoxFill, BsFillCaretDownFill, BsShop } from "react-icons/bs";
import Link from "next/link";


function ContactPage({ toast }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState({oderPlace:false,payment:false,shipping:false,exchange:false,damage:false});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Response</title>
      <!-- Include Tailwind CSS CDN -->
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body>
      <div class="container mx-auto px-4 py-8">
        <h2 class="text-xl font-bold mb-4">User Response</h2>
        <p class="mb-2"><span class="font-semibold">Name:</span> ${name}</p>
        <p class="mb-4"><span class="font-semibold">Email:</span> ${email}</p>
    
        <p class="mb-4"><span class="font-semibold">Message:</span> ${body}</p>
    
       
      </div>
    </body>
    </html>
    `;

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, subject:"Customer Query", html ,toEmail:"kashmirizon@gmail.com"}),
    });

    if (response.ok) {
      toast.success("Sent successfully");
      setIsLoading(false);
      setEmail("");
      setName("");
      setBody("");
    } else {
      toast.error("Error");
      setEmail("");
      setName("");
      setBody("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100  py-6 flex flex-col lg:flex-row items-center justify-center sm:p-12 font-Roboto">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-4 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-rose-200 rounded-full flex flex-shrink-0 justify-center items-center text-rose-500 text-2xl font-mono">
                <Image src={logo} width={500} height={500} alt="logo" />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Contact Us</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  For any queries and feedback contact us
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-white rounded border border-gray-300 focus:border-lightred focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-white rounded border border-gray-300 focus:border-lightred focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="message"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-white rounded border border-gray-300 focus:border-lightred focus:ring-2 focus:ring-rose-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="text-white w-full flex justify-center bg-lightred border-0 py-2 px-6 focus:outline-none hover:bg-lightredhover rounded text-lg mt-6"
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      "Submit"
                    ) : (
                      <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ul className="flex flex-wrap flex-col items-center ">
          <li className="text-2xl my-2">Frequently Ask Questions</li>
          <li className="w-[300px] sm:w-[400px] m-4">
          <div className="cursor-pointer bg-lightred">
              <p
                onClick={() => {
                  setIsClicked({oderPlace:!isClicked.oderPlace});
                }}
                className="flex items-center text-white justify-between p-2  rounded"
              >
                <BsFillBoxFill /> How do I place an order?{" "}
                <BsFillCaretDownFill
                  className={`${
                    isClicked.oderPlace ? "rotate-180" : "rotate-0"
                  } transition-all delay-100 ease-in-out`}
                />
              </p>
              <div
                className={`bg-lightred text-white font-Roboto text-xs overflow-hidden ${
                  isClicked.oderPlace ? "h-[180px]" : "h-0"
                } ease-in-out transition-all delay-100`}
              >
                  <ul className="list-disc px-5 py-2">
                    <li>Visit our website and browse through our collection.<Link href={'/'} className="text-green-200 ">Click Here</Link></li>
                    <li>Click on the desired product, select the appropriate options, and click Add to Cart.</li>
                    <li>Review your cart and proceed to checkout. Follow the prompts to enter your shipping and payment information.</li>
                    <li>Once your order is successfully placed, you will receive a confirmation email with order details.</li>
                  </ul>
              </div>
            </div>
          </li>

          <li className="w-[300px] sm:w-[400px] m-4">
          <div className="cursor-pointer bg-lightred">
              <p
                onClick={() => {
                  setIsClicked({payment:!isClicked.payment});
                }}
                className="flex items-center text-center text-white justify-between p-2  rounded"
              >
                <MdPayment /> What payment methods do you accept?{" "}
                <BsFillCaretDownFill
                  className={`${
                    isClicked.payment ? "rotate-180" : "rotate-0"
                  } transition-all delay-100 ease-in-out`}
                />
              </p>
              <div
                className={`bg-lightred text-white font-Roboto text-xs overflow-hidden ${
                  isClicked.payment ? "h-[60px]" : "h-0"
                } ease-in-out transition-all delay-100`}
              >
                  <ul className="list-disc px-5 py-2">
                    <li>Currently are working on Cash On Delivery Mode in future we are going to add online payments</li>
                  </ul>
              </div>
            </div>
          </li>

          <li className="w-[300px] sm:w-[400px] m-4">
          <div className="cursor-pointer bg-lightred">
              <p
                onClick={() => {
                  setIsClicked({shipping:!isClicked.shipping});
                }}
                className="flex items-center text-center text-white justify-between p-2  rounded"
              >
                <TbTruckDelivery /> How long does shipping take?{" "}
                <BsFillCaretDownFill
                  className={`${
                    isClicked.shipping ? "rotate-180" : "rotate-0"
                  } transition-all delay-100 ease-in-out`}
                />
              </p>
              <div
                className={`bg-lightred text-white font-Roboto text-xs overflow-hidden ${
                  isClicked.shipping ? "h-[100px]" : "h-0"
                } ease-in-out transition-all delay-100`}
              >
                  <ul className="list-disc px-5 py-2">
                    <li>Shipping times may vary depending on your location and the product`s availability. We strive to process and ship orders within [1-2] business days. Once shipped, you will receive a tracking number to monitor your package`s progress.</li>
                  </ul>
              </div>
            </div>
          </li>

          <li className="w-[300px] sm:w-[400px] m-4">
          <div className="cursor-pointer bg-lightred">
              <p
                onClick={() => {
                  setIsClicked({exchange:!isClicked.exchange});
                }}
                className="flex items-center text-center text-white justify-between p-2  rounded"
              >
                <RiExchangeFill /> What is your return/exchange policy?{" "}
                <BsFillCaretDownFill
                  className={`${
                    isClicked.exchange ? "rotate-180" : "rotate-0"
                  } transition-all delay-100 ease-in-out`}
                />
              </p>
              <div
                className={`bg-lightred text-white font-Roboto text-xs overflow-hidden ${
                  isClicked.exchange ? "h-[100px]" : "h-0"
                } ease-in-out transition-all delay-100`}
              >
                  <ul className="list-disc px-5 py-2">
                    <li>We have a hassle-free return/exchange policy. If you are not satisfied with your purchase, you can return it within [2-3] days of delivery for a refund or exchange. Please review our detailed return policy on our website for further instructions.</li>
                  </ul>
              </div>
            </div>
          </li>

          <li className="w-[300px] sm:w-[400px] m-4">
          <div className="cursor-pointer bg-lightred">
              <p
                onClick={() => {
                  setIsClicked({damage:!isClicked.damage});
                }}
                className="flex items-center text-center text-white justify-between p-2  rounded"
              >
                <MdProductionQuantityLimits /> What if my order arrives damaged or defective?{" "}
                <BsFillCaretDownFill
                  className={`${
                    isClicked.damage ? "rotate-180" : "rotate-0"
                  } transition-all delay-100 ease-in-out`}
                />
              </p>
              <div
                className={`bg-lightred text-white font-Roboto text-xs overflow-hidden ${
                  isClicked.damage ? "h-[120px]" : "h-0"
                } ease-in-out transition-all delay-100`}
              >
                  <ul className="list-disc px-5 py-2">
                    <li>We apologize for any inconvenience. If your order arrives damaged or defective, please contact us within [1-2] days of delivery. Provide detailed information and, if possible, include photos of the damaged/defective item. We will assist you in resolving the issue promptly.</li>
                  </ul>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default ContactPage;
