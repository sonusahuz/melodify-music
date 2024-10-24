import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div  className="mb-20">
      <h1 className="text-2xl text-left my-3 font-medium">Privacy Policy</h1>
      <p>Effective Date: 12/10/2024</p>

      <p>
        At Melodify, we value your privacy and are committed to protecting your
        personal information. This Privacy Policy explains how we collect, use,
        and protect the information you provide while using our website. By
        using Melodify, you agree to the collection and use of information in
        accordance with this policy.
      </p>

      <h2 className="text-xl font-bold py-4">1. Information We Collect</h2>
      <p>
        We may collect the following types of information when you visit or use
        Melodify:
      </p>
      <ul>
        <li>
          <strong>Personal Information:</strong> We do not collect personally
          identifiable information such as your name, email address, or contact
          details, unless you voluntarily provide it to us through contact forms
          or other interactions.
        </li>
        <li>
          <strong>Non-Personal Information:</strong> We may collect
          non-identifiable information, such as browser type, device type, IP
          address, and general usage data for improving the user experience.
        </li>
      </ul>

      <h2 className="text-xl font-bold py-4">2. Use of Information</h2>
      <p>
        The information we collect is used solely for the following purposes:
      </p>
      <ul>
        <li>To provide and improve the Melodify website experience.</li>
        <li>
          To analyze how users interact with the website and make improvements
          accordingly.
        </li>
        <li>To respond to your inquiries or requests, if applicable.</li>
      </ul>

      <h2 className="text-xl font-bold py-4">3. Cookies</h2>
      <p>
        Melodify may use cookies or similar tracking technologies to enhance the
        user experience. Cookies are small files stored on your device that help
        us analyze site traffic and usage patterns. You can choose to disable
        cookies through your browser settings, though some features of the
        website may not function as intended if you do so.
      </p>

      <h2 className="text-xl font-bold py-4">4. Third-Party Services</h2>
      <p>
        Melodify uses the JioSaavn API to provide music streaming services. We
        do not control the data collection practices of JioSaavn or other
        third-party service providers. Please review their privacy policies for
        more information on how they handle your data.
      </p>

      <h2 className="text-xl font-bold py-4">5. Data Security</h2>
      <p>
        We take reasonable steps to protect your data from unauthorized access,
        alteration, or disclosure. However, no method of data transmission over
        the Internet is 100% secure, and we cannot guarantee the absolute
        security of your information.
      </p>

      <h2 className="text-xl font-bold py-4">6. Children&apos;s Privacy</h2>
      <p>
        Melodify does not knowingly collect or solicit personal information from
        children under the age of 13. If we learn that we have collected
        personal information from a child under 13 without parental consent, we
        will delete that information as quickly as possible. If you believe we
        may have collected such information, please contact us immediately.
      </p>

      <h2 className="text-xl font-bold py-4">7. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will
        revise the &quot;Effective Date&quot; at the top of this page. You are
        encouraged to review this policy periodically to stay informed of any
        changes.
      </p>

      <h2 className="text-xl font-bold py-4">8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at{' '}
        <a href="mailto:support@melodify.com">support@melodify.com</a>.
      </p>

      <p>By using Melodify, you agree to this Privacy Policy.</p>
    </div>
  );
};

export default PrivacyPolicy;
