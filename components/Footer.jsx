import { EmailOutlined } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-4 bg-gray-900 p-3 py-6">
      <div className="max-w-container mx-auto text-white flex justify-between max-md:flex-col max-md:gap-4">
        <div>
          <h3 className="text-xl font-semibold max-md:mb-3">Foody</h3>
        </div>
        <div>
          <h3 className="text-gray-500 font-bold text-lg uppercase mb-3">
            Support
          </h3>
          <ul className="text-gray-300">
            <li className="mb-2">
              <Link href="#" className="hover:text-gray-200 transition-colors">
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:text-gray-200 transition-colors">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:text-gray-200 transition-colors">
                Downloads
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:text-gray-200 transition-colors">
                Other Services
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-500 font-bold text-lg uppercase mb-3">
            Foody
          </h3>
          <ul className="text-gray-300">
            <li className="mb-2">
              <Link href="#" className="hover:text-gray-200 transition-colors">
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:text-gray-200 transition-colors">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:text-gray-200 transition-colors">
                Downloads
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:text-gray-200 transition-colors">
                Other Services
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-6">
            <EmailOutlined className="mr-1" /> Stay up to date on the latest
            from foody.
          </h3>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email Address"
              className="block mb-3 w-full py-2 px-4 text-md text-black rounded-full outline-transparent border focus:border-red-600 text-center"
              required
            />
            <button className="bg-red-600 text-white px-6 py-2 rounded-full block mb-3 uppercase hover:bg-red-700 transition-colors w-full">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
