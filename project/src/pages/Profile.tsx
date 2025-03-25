import React, { useState } from 'react';
import { User, Mail, Calendar, Leaf, Edit2, Plus, Flower2 as Plant, Sun } from 'lucide-react';

interface ProfileProps {
  userName: string;
}

interface PlantNote {
  id: number;
  plantName: string;
  date: string;
  note: string;
  type: 'growth' | 'maintenance' | 'issue';
}

const Profile: React.FC<ProfileProps> = ({ userName }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'plants' | 'notes'>('overview');
  
  // Mock user data
  const userData = {
    name: userName,
    email: "john.doe@example.com",
    joinDate: "March 2024",
    gardenLevel: 5,
    plantsOwned: 12,
    successfulHarvests: 8
  };

  // Mock plant notes
  const plantNotes: PlantNote[] = [
    {
      id: 1,
      plantName: "Monstera Deliciosa",
      date: "2024-03-15",
      note: "New leaf unfurling! The fenestration is beautiful.",
      type: 'growth'
    },
    {
      id: 2,
      plantName: "Snake Plant",
      date: "2024-03-14",
      note: "Watered and cleaned leaves. Added slow-release fertilizer.",
      type: 'maintenance'
    },
    {
      id: 3,
      plantName: "Peace Lily",
      date: "2024-03-13",
      note: "Noticed some brown spots on leaves. Might be overwatering.",
      type: 'issue'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-green-100 p-6 rounded-full">
            <User className="h-12 w-12 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {userData.email}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {userData.joinDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'overview'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('plants')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'plants'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          My Plants
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'notes'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Plant Notes
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Garden Level</h3>
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">Level {userData.gardenLevel}</p>
            <p className="text-sm text-gray-600 mt-1">Master Gardener</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Plants Owned</h3>
              <Plant className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{userData.plantsOwned}</p>
            <p className="text-sm text-gray-600 mt-1">Growing Strong</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Successful Harvests</h3>
              <Sun className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{userData.successfulHarvests}</p>
            <p className="text-sm text-gray-600 mt-1">Happy Plants</p>
          </div>
        </div>
      )}

      {activeTab === 'plants' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Plant Collection</h2>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add New Plant
            </button>
          </div>
          {/* Plant list would go here */}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Plant Notes</h2>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </button>
          </div>
          <div className="space-y-4">
            {plantNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-lg border-l-4 ${
                  note.type === 'growth'
                    ? 'border-green-500 bg-green-50'
                    : note.type === 'maintenance'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{note.plantName}</h3>
                    <p className="text-sm text-gray-600">{note.date}</p>
                  </div>
                  <button className="p-1 hover:bg-white rounded-full transition-colors">
                    <Edit2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <p className="mt-2 text-gray-700">{note.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;