import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-20 bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/prosmart_logo_lg.png"
                alt="ProSmart Concepts"
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl">ProSmart Concepts</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Your trusted partner for premium corporate gifting and innovative business solutions. Inspiring brand value and strengthening professional relationships since 2007.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Best Deals</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1a5d1a] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1a5d1a] flex-shrink-0" />
                <span className="text-sm text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1a5d1a] flex-shrink-0" />
                <span className="text-sm text-gray-400">info@prosmartconcepts.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 ProSmart Concepts. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
