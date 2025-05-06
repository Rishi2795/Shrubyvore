import React, { useState } from 'react';
import { Search, Heart, Filter, Sun, Cloud, CloudRain, Flower2 as Plant } from 'lucide-react';

const plants = [
  {
    id: "6818b065d60a0cf5a3769a0e",
    name: "Absinthe",
    description: "A perennial herb from the Aster family, known for its aromatic leaves.",
    soilRequirements: "Well-draining potting soil with organic matter and a slightly alkaline pH.",
    wateringInstructions: "Water when the top inch of soil feels dry. Avoid waterlogging.",
    fertilizerRecommendations: "Apply a balanced, water-soluble fertilizer every 4-6 weeks during the growing season.",
    sunlight: "Full sun to partial shade.",
    difficulty: "Moderate",
    tags: ["Outdoor", "Weekly", "Full sun", "Moderate"],
    images: [
      "https://bs.plantnet.org/image/o/b2b996e0b80966f37091678808b5fed13c33d04d"
    ]
  },
  {
    id: "6818afb20e2cba58d17944bb",
    name: "Adam-and-eve",
    description: "A unique plant species requiring proper care and maintenance.",
    soilRequirements: "Rich, well-draining soil with organic compost.",
    wateringInstructions: "Keep soil consistently moist but not soggy.",
    fertilizerRecommendations: "Use a slow-release fertilizer at the start of the growing season.",
    sunlight: "Bright indirect light.",
    difficulty: "Easy",
    tags: ["Indoor", "Daily", "Bright indirect", "Easy"],
    images: [
      "https://bs.plantnet.org/image/o/1875712523dd5e698b3173f4d2dab9be583f16d4"
    ]
  },
  {
    id: "6818b066d60a0cf5a3769b3a",
    name: "Adder's-tongue",
    description: "A delicate plant species with unique foliage.",
    soilRequirements: "Moist, well-draining soil with a neutral pH.",
    wateringInstructions: "Water regularly to keep the soil evenly moist.",
    fertilizerRecommendations: "Feed with a diluted liquid fertilizer every 2 weeks during active growth.",
    sunlight: "Partial shade to full shade.",
    difficulty: "Moderate",
    tags: ["Outdoor", "Weekly", "Partial shade", "Moderate"],
    images: [
      "https://bs.plantnet.org/image/o/22e0388b0cdd694b52d92d833f629ed645d002c2"
    ]
  },
  {
    id: "6818b05cd60a0cf5a3769319",
    name: "African boxthorn",
    description: "A hardy shrub with thorny branches and small flowers.",
    soilRequirements: "Sandy or loamy soil with good drainage.",
    wateringInstructions: "Water deeply once a week during dry periods.",
    fertilizerRecommendations: "Apply a general-purpose fertilizer in early spring.",
    sunlight: "Full sun.",
    difficulty: "Easy",
    tags: ["Outdoor", "Weekly", "Full sun", "Easy"],
    images: [
      "https://bs.plantnet.org/image/o/41d96e7d1a14e87bae3219da4db7f71fcd8f541d"
    ]
  },
  {
    id: "6818afb00e2cba58d17942f6",
    name: "Agrimony",
    description: "A member of the Rose family, known for its medicinal properties.",
    soilRequirements: "Well-draining soil with moderate fertility.",
    wateringInstructions: "Water when the soil feels dry to the touch.",
    fertilizerRecommendations: "Use an organic fertilizer once a month during the growing season.",
    sunlight: "Full sun to partial shade.",
    difficulty: "Easy",
    tags: ["Outdoor", "Bi-weekly", "Full sun", "Easy"],
    images: [
      "https://bs.plantnet.org/image/o/35a2e338466068f8636c1764b8d31f6298dee718"
    ]
  }
];

const gardenPlants = [
  {
    id: "6818b065d60a0cf5a3769a0e",
    name: "Absinthe",
    image: "https://bs.plantnet.org/image/o/b2b996e0b80966f37091678808b5fed13c33d04d",
    health: 100,
    level: 1,
    power: "Growth Boost",
    wateringInstructions: "Water when the top inch of soil feels dry.",
    sunlight: "Full sun to partial shade."
  },
  {
    id: "6818afb20e2cba58d17944bb",
    name: "Adam-and-eve",
    image: "https://bs.plantnet.org/image/o/1875712523dd5e698b3173f4d2dab9be583f16d4",
    health: 90,
    level: 2,
    power: "Healing Aura",
    wateringInstructions: "Keep soil consistently moist but not soggy.",
    sunlight: "Bright indirect light."
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
  const [myGarden, setMyGarden] = useState(() => {
    const savedPlants = localStorage.getItem('gardenPlants');
    return savedPlants ? JSON.parse(savedPlants).map((plant: any) => plant.id) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>([]);
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

  const handleAddToGarden = (plant: typeof plants[0]) => {
    const savedGardenPlants = localStorage.getItem('gardenPlants');
    const gardenPlants = savedGardenPlants ? JSON.parse(savedGardenPlants) : [];

    // Check if the plant is already in the garden
    if (!gardenPlants.some((p: any) => p.id === plant.id)) {
      const updatedGardenPlants = [...gardenPlants, plant];
      localStorage.setItem('gardenPlants', JSON.stringify(updatedGardenPlants));
      setMyGarden((prev) => [...prev, plant.id]); // Update UI state
    }
  };

  const handleRemoveFromGarden = (plantId: string) => {
    const savedGardenPlants = localStorage.getItem('gardenPlants');
    const gardenPlants = savedGardenPlants ? JSON.parse(savedGardenPlants) : [];

    const updatedGardenPlants = gardenPlants.filter((plant: any) => plant.id !== plantId);
    localStorage.setItem('gardenPlants', JSON.stringify(updatedGardenPlants));
    setMyGarden((prev) => prev.filter((id) => id !== plantId)); // Update UI state
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = Object.entries(filters).every(([key, value]) =>
      value === "" || plant.tags.includes(value)
    );
    return matchesSearch && matchesFilters;
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
      {/* <div className="mb-12">
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}

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
              onAddToGarden={() => handleAddToGarden(plant)}
              onRemoveFromGarden={() => handleRemoveFromGarden(plant.id)}
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
        src={plant.images[0]} // Use the first image from the images array
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
          <span className="font-medium mr-2">Soil:</span>
          {plant.soilRequirements}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Watering:</span>
          {plant.wateringInstructions}
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