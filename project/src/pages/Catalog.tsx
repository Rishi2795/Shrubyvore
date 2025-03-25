import React, { useState } from 'react';
import { Search, Heart, Filter, X, Sun, Cloud, CloudRain, Flower2 as Plant } from 'lucide-react';

const plants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
    category: "Indoor",
    description: "Popular tropical plant with distinctive split leaves",
    wateringInterval: "Weekly",
    sunlight: "Bright indirect",
    difficulty: "Easy"
  },
  {
    id: 2,
    name: "Snake Plant",
    image: "https://images.unsplash.com/photo-1593691509544-d6c29ec2d177",
    category: "Indoor",
    description: "Low-maintenance plant perfect for beginners",
    wateringInterval: "Bi-weekly",
    sunlight: "Any",
    difficulty: "Easy"
  },
  {
    id: 3,
    name: "Peace Lily",
    image: "https://images.unsplash.com/photo-1593691512429-5d42f232ce1e",
    category: "Indoor",
    description: "Beautiful flowering plant that purifies air",
    wateringInterval: "Weekly",
    sunlight: "Low to bright indirect",
    difficulty: "Moderate"
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    image: "https://images.unsplash.com/photo-1598880940942-a41678883f7a",
    category: "Indoor",
    description: "Stunning tree-like plant with large, violin-shaped leaves",
    wateringInterval: "Weekly",
    sunlight: "Bright indirect",
    difficulty: "Expert"
  },
  {
    id: 5,
    name: "String of Pearls",
    image: "https://images.unsplash.com/photo-1611211232932-da3113c5b960",
    category: "Indoor",
    description: "Trailing succulent with pearl-like leaves",
    wateringInterval: "Bi-weekly",
    sunlight: "Bright indirect",
    difficulty: "Moderate"
  },
  {
    id: 6,
    name: "ZZ Plant",
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333",
    category: "Indoor",
    description: "Nearly indestructible plant with glossy leaves",
    wateringInterval: "Monthly",
    sunlight: "Low to bright indirect",
    difficulty: "Easy"
  },
  {
    id: 7,
    name: "Lavender",
    image: "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6",
    category: "Outdoor",
    description: "Fragrant herb with purple blooms",
    wateringInterval: "Weekly",
    sunlight: "Full sun",
    difficulty: "Moderate"
  },
  {
    id: 8,
    name: "Japanese Maple",
    image: "https://images.unsplash.com/photo-1564860924912-0b65ea4d3517",
    category: "Outdoor",
    description: "Elegant tree with stunning fall colors",
    wateringInterval: "Weekly",
    sunlight: "Partial shade",
    difficulty: "Expert"
  }
];

// Mock garden data
const gardenPlants = [
  {
    id: 1,
    name: "Sunflower Defender",
    image: "https://images.unsplash.com/photo-1551431009-a802eeec77b1",
    health: 100,
    level: 3,
    power: "Sun Production",
    wateringInterval: "Daily",
    sunlight: "Full sun"
  },
  {
    id: 2,
    name: "Cactus Guard",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a",
    health: 85,
    level: 2,
    power: "Spiky Defense",
    wateringInterval: "Monthly",
    sunlight: "Full sun"
  },
  {
    id: 3,
    name: "Venus Flytrap Sentinel",
    image: "https://images.unsplash.com/photo-1596719177110-33a3329b4600",
    health: 95,
    level: 4,
    power: "Pest Control",
    wateringInterval: "Weekly",
    sunlight: "Bright indirect"
  },
  {
    id: 4,
    name: "Bamboo Barrier",
    image: "https://images.unsplash.com/photo-1588253127161-e994edc23a8f",
    health: 90,
    level: 3,
    power: "Rapid Growth",
    wateringInterval: "Weekly",
    sunlight: "Partial shade"
  },
  {
    id: 5,
    name: "Rose Warrior",
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322",
    health: 75,
    level: 5,
    power: "Thorny Defense",
    wateringInterval: "Weekly",
    sunlight: "Full sun"
  }
];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    wateringInterval: "",
    sunlight: "",
    difficulty: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [myGarden, setMyGarden] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [sunEnergy, setSunEnergy] = useState(100);

  const clearFilters = () => {
    setFilters({
      category: "",
      wateringInterval: "",
      sunlight: "",
      difficulty: ""
    });
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || plant.category === filters.category;
    const matchesWatering = !filters.wateringInterval || plant.wateringInterval === filters.wateringInterval;
    const matchesSunlight = !filters.sunlight || plant.sunlight === filters.sunlight;
    const matchesDifficulty = !filters.difficulty || plant.difficulty === filters.difficulty;

    return matchesSearch && matchesCategory && matchesWatering && matchesSunlight && matchesDifficulty;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Plant Almanac</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-green-600 hover:text-green-700"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Categories</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
              <select
                value={filters.wateringInterval}
                onChange={(e) => setFilters({ ...filters, wateringInterval: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Watering Interval</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <select
                value={filters.sunlight}
                onChange={(e) => setFilters({ ...filters, sunlight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Sunlight Needs</option>
                <option value="Full sun">Full sun</option>
                <option value="Bright indirect">Bright indirect</option>
                <option value="Partial shade">Partial shade</option>
                <option value="Low light">Low light</option>
                <option value="Any">Any</option>
              </select>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Difficulty Level</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* My Garden Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Garden</h2>
          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-yellow-100 px-4 py-2 rounded-lg">
              <Sun className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="font-medium">{sunEnergy} ☀️</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setWeather('sunny')}
                className={`p-2 rounded-lg ${weather === 'sunny' ? 'bg-yellow-100' : 'bg-gray-100'}`}
              >
                <Sun className={`h-6 w-6 ${weather === 'sunny' ? 'text-yellow-500' : 'text-gray-400'}`} />
              </button>
              <button
                onClick={() => setWeather('cloudy')}
                className={`p-2 rounded-lg ${weather === 'cloudy' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                <Cloud className={`h-6 w-6 ${weather === 'cloudy' ? 'text-blue-500' : 'text-gray-400'}`} />
              </button>
              <button
                onClick={() => setWeather('rainy')}
                className={`p-2 rounded-lg ${weather === 'rainy' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                <CloudRain className={`h-6 w-6 ${weather === 'rainy' ? 'text-blue-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </div>

        {gardenPlants.length === 0 ? (
          <div className="bg-green-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your garden is empty!</h3>
            <p className="text-gray-600 mb-4">Start adding plants to your collection and track their growth.</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Explore Plants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gardenPlants.map((plant) => (
              <div key={plant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${plant.health}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{plant.name}</h3>
                      <p className="text-sm text-gray-600">Level {plant.level}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {plant.power}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Sun className="h-4 w-4 mr-2" />
                      {plant.sunlight}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Cloud className="h-4 w-4 mr-2" />
                      {plant.wateringInterval}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Plant Almanac Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Plants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              inGarden={myGarden.includes(plant.id)}
              inWishlist={wishlist.includes(plant.id)}
              onAddToGarden={() => setMyGarden([...myGarden, plant.id])}
              onRemoveFromGarden={() => setMyGarden(myGarden.filter(id => id !== plant.id))}
              onToggleWishlist={() => {
                if (wishlist.includes(plant.id)) {
                  setWishlist(wishlist.filter(id => id !== plant.id));
                } else {
                  setWishlist([...wishlist, plant.id]);
                }
              }}
            />
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No plants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface PlantCardProps {
  plant: typeof plants[0];
  inGarden: boolean;
  inWishlist: boolean;
  onAddToGarden: () => void;
  onRemoveFromGarden: () => void;
  onToggleWishlist: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  inGarden,
  inWishlist,
  onAddToGarden,
  onRemoveFromGarden,
  onToggleWishlist
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative">
      <img
        src={`${plant.image}?auto=format&fit=crop&w=800&q=80`}
        alt={plant.name}
        className="w-full h-64 object-cover"
      />
      <button
        onClick={onToggleWishlist}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          inWishlist ? 'bg-red-100 text-red-600' : 'bg-white text-gray-600'
        }`}
      >
        <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
      </button>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
      <p className="text-gray-600 mb-4">{plant.description}</p>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Watering:</span>
          {plant.wateringInterval}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Sunlight:</span>
          {plant.sunlight}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Difficulty:</span>
          {plant.difficulty}
        </div>
      </div>
      <button
        onClick={inGarden ? onRemoveFromGarden : onAddToGarden}
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          inGarden
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
      >
        {inGarden ? 'Remove from Garden' : 'Add to My Garden'}
      </button>
    </div>
  </div>
);

export default Catalog;