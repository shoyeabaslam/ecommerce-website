import Head from 'next/head';
import Image from 'next/image';
import commitment from '../public/images/commitment.jpg'
import mission from '../public/images/mission.jpg'
const AboutUsPage = () => {
  return (
    <>
      <Head>
        <title>About Us - Kashmirizon</title>
      </Head>
      <div className="bg-gray-100 font-Roboto">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-Alegreya text-center text-gray-800 mb-6">
            Welcome to <span className='text-lightred'>Kashmirizon!</span>
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Your go-to destination for quality products, quick delivery, and exceptional customer service.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-6 md:mb-0">
            <Image
                src={mission}
                alt="Our Mission"
                className="w-[30rem] h-auto md:ml-8 rounded-lg my-6 "
                width={500}
                height={500}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600">
                At Kashmirizon, we are committed to providing the finest quality products to our customers, with a particular focus on the unique needs and preferences of the Kashmir audience. Our mission is to offer a seamless online shopping experience, combining fast delivery, excellent customer support, and the best deals, all while promoting local artisans and businesses in the Kashmir region.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Our Commitment
              </h2>
              <p className="text-lg text-gray-600">
                We take pride in curating a wide range of high-quality products that cater to diverse customer needs. Our dedicated team works tirelessly to ensure swift order processing and delivery, so you can enjoy your purchases without delay. We also offer quick and responsive customer support to assist you with any inquiries or concerns you may have along the way. At Kashmirizon, we are committed to creating a satisfying and reliable shopping experience for each and every customer.
              </p>
            </div>
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Image
                src={commitment}
                alt="Our Team"
                className="w-[30rem] h-auto md:ml-8 rounded-lg my-6 "
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
