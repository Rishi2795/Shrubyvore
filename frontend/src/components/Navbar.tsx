import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, User, Heart, LogOut } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleAlmanacClick = () => {
    if (user) {
      navigate('/catalog');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  const isLoggedIn = !!user;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800">Shrubyvore</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</Link>
            <button
              onClick={handleAlmanacClick}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Plant Almanac
            </button>
            {isLoggedIn ? (
              <>
                <Link to="/wishlist" className="text-gray-700 hover:text-green-600 flex items-center">
                  <Heart className="h-5 w-5 mr-1" /> Wishlist
                </Link>
                <Link to="/my-garden" className="text-gray-700 hover:text-green-600">My Garden</Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-green-600">
                    <User className="h-5 w-5 mr-1" /> {user?.fullName || 'Profile'}
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-green-600 transition-colors">Login</Link>
                <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-green-600 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-green-600">Home</Link>
          <button
            onClick={handleAlmanacClick}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
          >
            Plant Almanac
          </button>
          {isLoggedIn ? (
            <>
              <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-green-600">Wishlist</Link>
              <Link to="/my-garden" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-green-600">My Garden</Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-green-600">Profile</Link>
              <div className="px-3 py-2 text-gray-700">Signed in as <span className="font-medium">{user?.firstName}</span></div>
              <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-green-600">Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
