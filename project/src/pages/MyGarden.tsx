import React, { useState, useEffect } from 'react';
import { Flower2 as Plant, Sun, Cloud, CloudRain } from 'lucide-react';

interface MyGardenProps {
  userName: string;
}

const MyGarden: React.FC<MyGardenProps> = ({ userName }) => {
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [sunEnergy, setSunEnergy] = useState(100);
  const [gardenPlants, setGardenPlants] = useState(() => {
    const savedPlants = localStorage.getItem('gardenPlants');
    return savedPlants ? JSON.parse(savedPlants) : [];
  });

  useEffect(() => {
    const savedPlants = localStorage.getItem('gardenPlants');
    if (savedPlants) {
      setGardenPlants(JSON.parse(savedPlants));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gardenPlants', JSON.stringify(gardenPlants));
  }, [gardenPlants]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-xl p-8">
        {/* Garden Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {userName}'s Garden
            </h1>
            <p className="text-gray-600">Level 5 Garden Master</p>
          </div>
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

        {/* Garden Plants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gardenPlants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={plant.images[0]} // Ensure the first image is displayed
                  alt={plant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${plant.health || 100}%` }} // Default health to 100 if not present
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{plant.name}</h3>
                <p className="text-sm text-gray-600">{plant.description}</p>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {plant.power || 'Growth Boost'} {/* Default power if not present */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyGarden;