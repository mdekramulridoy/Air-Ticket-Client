import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#34b1e3] text-white py-12 mt-auto text-center">
      <footer className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-8 items-center">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <img
              src="https://i.ibb.co.com/y0drfXS/logo-new.png"
              alt="Logo"
              className="h-12"
            />
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-3 md:space-y-0 md:space-x-4">
              <Link to="/about" className="hover:text-orange-500 transition-colors">
                About Us
              </Link>
              <Link to="/visas" className="hover:text-orange-500 transition-colors">
                Our Services
              </Link>
              <Link to="/faqs" className="hover:text-orange-500 transition-colors">
                FAQs
              </Link>
            </nav>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6 justify-center md:justify-start">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0062ff] transition-colors"
              >
                {/* Twitter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0A66C2] transition-colors"
              >
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M4.98 3c0-1.104.876-2 1.96-2 1.085 0 1.96.896 1.96 2s-.876 2-1.96 2c-1.084 0-1.96-.896-1.96-2zm1.96 3.5c-2.452 0-4.4 1.988-4.4 4.4v7.6h2.8v-7.2c0-.912.743-1.6 1.6-1.6.857 0 1.6.688 1.6 1.6v7.2h2.8v-7.6c0-2.412-1.948-4.4-4.4-4.4zm-7.44 5.9h2.8v9.1h-2.8v-9.1z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-white pt-6 text-center">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} VisaPortal. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Designed by <span className="font-semibold">Md. Ekramul Hoque</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
