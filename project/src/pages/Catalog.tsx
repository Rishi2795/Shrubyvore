import React, { useState } from 'react';
import { Search } from 'lucide-react';

const plants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
    category: "Indoor",
    description: "Popular tropical plant with distinctive split leaves"
  },
  {
    id: 2,
    name: "Snake Plant",
    image: "https://images.unsplash.com/photo-1593691509544-d6c29ec2d177",
    category: "Indoor",
    description: "Low-maintenance plant perfect for beginners"
  },
  {
    id: 3,
    name: "Peace Lily",
    image: "https://images.unsplash.com/photo-1593691512429-5d42f232ce1e",
    category: "Indoor",
    description: "Beautiful flowering plant that purifies air"
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    image: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd",
    category: "Indoor",
    description: "Trendy plant with large, violin-shaped leaves"
  },
  {
    id: 5,
    name: "ZZ Plant",
    image: "https://images.unsplash.com/photo-1597055181300-b7b43cd496b5",
    category: "Indoor",
    description: "Nearly indestructible plant with glossy leaves"
  },
  {
    id: 6,
    name: "Pothos",
    image: "https://images.unsplash.com/photo-1597055181300-b7b43cd496b5",
    category: "Indoor",
    description: "Fast-growing vine with heart-shaped leaves"
  }
];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="All">All Categories</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Succulents">Succulents</option>
            </select>
          </div>
        </div>
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlants.map((plant) => (
          <div key={plant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={`${plant.image}?auto=format&fit=crop&w=800&q=80`}
              alt={plant.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
              <p className="text-gray-600 mb-4">{plant.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{plant.category}</span>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => alert('Added to your nursery!')}
                >
                  Add to My Nursery
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No plants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Catalog