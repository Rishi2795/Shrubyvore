import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@shrubyvore.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 1234567800</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Sky View, Hyderabad</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-green-300">About Us</a></li>
              <li><a href="/faq" className="hover:text-green-300">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-green-300">Shipping Info</a></li>
              <li><a href="/privacy" className="hover:text-green-300">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-300">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-800 text-center">
          <p>&copy; {new Date().getFullYear()} Greenify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer