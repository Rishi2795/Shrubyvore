import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heart, Trash2 } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { user } = useUser();

  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
      addedDate: "2024-03-15",
      price: "$45.99",
      availability: "In Stock"
    },
    {
      id: 2,
      name: "Snake Plant",
      image: "https://images.unsplash.com/photo-1593691509544-d6c29ec2d177",
      addedDate: "2024-03-14",
      price: "$29.99",
      availability: "Out of Stock"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-red-500" />
          <span className="text-lg font-medium">{wishlistItems.length} Plants</span>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">Added on {item.addedDate}</p>
                  <p className="text-lg font-medium text-green-600">{item.price}</p>
                  <p className={`text-sm ${item.availability === "In Stock" ? "text-green-600" : "text-red-500"}`}>
                    {item.availability}
                  </p>
                </div>
                <button
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Add to Garden
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">Start adding plants you'd love to grow!</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Explore Plants
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
