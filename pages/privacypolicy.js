import Head from 'next/head';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <title>JExprez - Privacy Policy</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At JExprez, we value and respect your privacy. This Privacy Policy
          explains how we collect, use, and protect your personal information
          when you interact with our website.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Collection and Use of Personal Information</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address,
          shipping address, and payment details when you place an order on our
          website. This information is used solely for the purpose of processing
          your order, providing customer support, and improving our services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Google Authentication</h2>
        <p className="mb-4">
          We offer Google authentication as a convenient and secure way for you
          to log in to our website. By choosing to log in using your Google
          account, you authorize us to collect and use your authentication
          information, including your name and email address, in accordance
          with this Privacy Policy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Storage of Cart Data</h2>
        <p className="mb-4">
          To enhance your shopping experience, we may store your cart data in
          your local storage. This allows you to conveniently resume your
          shopping from where you left off. We do not collect or store any
          sensitive payment information in your local storage.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Security and Data Protection</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, alteration, or
          disclosure. We use secure socket layer SSL technology to encrypt
          sensitive information during transmission.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Disclosure</h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent, except for the purpose of order
          fulfillment or when required by law.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies</h2>
        <p className="mb-4">
          We use cookies on our website to improve your browsing experience and
          provide personalized services. By using our website, you consent to
          the use of cookies in accordance with our Cookie Policy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We reserve the right to modify this Privacy Policy at any time. Any
          changes will be reflected on this page. It is your responsibility to
          review this Privacy Policy periodically for updates.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at privacy@jexprez.com.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
