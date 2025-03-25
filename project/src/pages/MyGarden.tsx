import React, { useState } from 'react';
import { Flower2 as Plant, Sun, Cloud, CloudRain } from 'lucide-react';

interface MyGardenProps {
  userName: string;
}

const MyGarden: React.FC<MyGardenProps> = ({ userName }) => {
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [sunEnergy, setSunEnergy] = useState(100);

  // Mock garden data
  const gardenPlants = [
    {
      id: 1,
      name: "Sunflower Defender",
      image: "https://images.unsplash.com/photo-1551431009-a802eeec77b1",
      health: 100,
      level: 3,
      power: "Sun Production",
      position: { x: 2, y: 1 }
    },
    {
      id: 2,
      name: "Cactus Guard",
      image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a",
      health: 85,
      level: 2,
      power: "Spiky Defense",
      position: { x: 3, y: 2 }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-xl p-8">
        {/* Garden Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {userName}'s Garden Defense
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

        {/* Garden Grid */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          {Array.from({ length: 24 }).map((_, index) => {
            const plant = gardenPlants.find(
              p => p.position.x === (index % 6) + 1 && p.position.y === Math.floor(index / 6) + 1
            );

            return (
              <div
                key={index}
                className={`aspect-square rounded-lg ${
                  plant ? 'bg-green-100' : 'bg-brown-100 border-2 border-dashed border-brown-200'
                } flex items-center justify-center relative cursor-pointer hover:bg-green-50 transition-colors`}
              >
                {plant ? (
                  <div className="absolute inset-0 p-2">
                    <div className="relative h-full">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 rounded-b-lg">
                        <div className="h-1 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${plant.health}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Plant className="h-6 w-6 text-green-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Plant Inventory */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Plant Defenders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gardenPlants.map((plant) => (
              <div key={plant.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{plant.name}</h3>
                    <p className="text-sm text-gray-600">Level {plant.level}</p>
                    <p className="text-sm text-green-600">{plant.power}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGarden;