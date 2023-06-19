import Head from 'next/head';
import returnpolicy from '../public/images/returnpolicy.jpg'
import Image from 'next/image';

const ReturnPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Return Policy - Kashmirizon</title>
      </Head>
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6">
            Return Policy
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                How to Return an Order
              </h2>
              <p className="text-lg text-gray-600">
                We want you to be completely satisfied with your purchase. If you`re not happy with your order, follow these steps to initiate a return:
              </p>
              <ol className="list-decimal mt-4 ml-8 text-lg text-gray-600">
                <li>Ensure the item is unused, undamaged, and in its original packaging.</li>
                <li>Contact our customer support team at shoyeab.ecom@gmail.com within 7 days of receiving your order.</li>
                <li>Provide your order details and reason for return in the email.</li>
                <li>Our team will guide you through the return process and provide further instructions.</li>
                <li>Once the return is approved, package the item securely and ship it back to our designated return address.</li>
                <li>Keep the tracking number for reference.</li>
                <li>Upon receiving the returned item, we will inspect it to ensure it meets our return criteria.</li>
                <li>If the return is approved, we will initiate a refund or exchange based on your preference.</li>
              </ol>
            </div>
            <div className="md:w-1/2">
            <Image
                src={returnpolicy}
                alt="Our Mission"
                className="w-full h-auto md:ml-8 rounded-lg my-6 px-8"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600">
              If you have any issues or questions regarding the return process, please don`t hesitate to contact our customer support team at shoyeab.ecom@gmail.com. We are here to assist you and ensure a smooth and satisfactory return experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicyPage;
