const TermsAndCondition = () => {
  return (
    <div className="max-h-[70vh] overflow-y-auto p-4 text-gray-800 bg-white rounded-lg">
      <p className="mb-6 text-lg font-medium text-gray-900">
        Welcome to Bitwire Trust. These Terms and Conditions govern your access
        to and use of our services, including utility bill payments,
        cryptocurrency exchange, and gift card trading on our Platform.
      </p>

      <p className="mb-8 text-gray-700 border-l-4 border-blue-500 pl-4 py-1 bg-blue-50">
        By accessing or using Bitwire Trust, you agree to be bound by these
        Terms. Please read them carefully.
      </p>

      <ol className="list-decimal list-outside pl-3 space-y-8">
        <li>
          <strong className="text-lg font-semibold text-gray-900 mb-2 block">
            Eligibility
          </strong>
          <p className="text-gray-700">
            You must be at least 18 years old and have the legal capacity to
            enter into contracts. By using Bitwire Trust, you confirm that you
            meet these eligibility requirements.
          </p>
        </li>

        <li>
          <strong className="text-lg font-semibold text-gray-900 mb-2 block">
            Account Registration
          </strong>
          <p className="text-gray-700 mb-2">
            You are required to create an account to use our services.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li>
              You agree to provide accurate and up-to-date personal information.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account details and for all activities that occur under your
              account.
            </li>
          </ul>
        </li>

        <li>
          <strong className="text-lg font-semibold text-gray-900 mb-2 block">
            Our Services
          </strong>
          <p className="text-gray-700 mb-2">
            Bitwire Trust provides the following services:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li>
              Payment of utility bills such as airtime, data, electricity, cable
              TV, and betting
            </li>
            <li>
              Cryptocurrency exchange (buying and selling of supported digital
              assets)
            </li>
            <li>
              Gift card trading (selling or exchanging supported gift cards)
            </li>
          </ul>
          <p className="text-gray-700 mt-2">
            We reserve the right to modify or discontinue any of our services at
            any time without notice.
          </p>
        </li>

        <li>
          <strong className="text-lg font-semibold text-gray-900 mb-2 block">
            Prohibited Activities
          </strong>
          <p className="text-gray-700 mb-2">You agree not to:</p>
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li>Use Bitwire Trust for any illegal or fraudulent activity</li>
            <li>
              Engage in money laundering, terrorism financing, or any financial
              crime
            </li>
            <li>Impersonate another person or use another user's account</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>
              Exploit vulnerabilities in our Platform or abuse any promotional
              offers
            </li>
          </ul>
        </li>

        <li>
          <strong className="text-lg font-semibold text-gray-900 mb-2 block">
            KYC and Identity Verification
          </strong>
          <p className="text-gray-700">
            To comply with Nigerian laws and global anti-money laundering (AML)
            regulations, you may be required to verify your identity. Failure to
            comply may result in restrictions on your account.
          </p>
        </li>

        <li>
          <strong className="text-lg font-semibold text-gray-900 mb-2 block">
            Contact Us
          </strong>
          <p className="text-gray-700 mb-2">
            If you have any questions, complaints, or inquiries, you may contact
            us at:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-5 text-gray-700">
            <li>
              Email:{" "}
              <span className="text-blue-600">support@bitwiretrust.com</span>
            </li>
            <li>
              Phone: <span className="text-blue-600">+234-xxx-xxx-xxxx</span>
            </li>
            <li>
              Website:{" "}
              <span className="text-blue-600">www.bitwiretrust.com</span>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default TermsAndCondition;
