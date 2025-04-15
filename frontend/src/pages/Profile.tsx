import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useUser();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <p>Check your plant stats, sun energy, and activity summary here.</p>
          </div>
        );
      case 'myPlants':
        return (
          <div>
            <h2>My Plants</h2>
            <p>Your collection of plants will appear here. Add, remove, or water them!</p>
          </div>
        );
      case 'plantNotes':
        return (
          <div>
            <h2>Plant Notes</h2>
            <p>Keep track of plant care notes, growth logs, and reminders here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {user?.firstName || 'Gardener'} 🌿</h1>

      <div className="tabs">
        <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>
          Overview
        </button>
        <button onClick={() => setActiveTab('myPlants')} className={activeTab === 'myPlants' ? 'active' : ''}>
          My Plants
        </button>
        <button onClick={() => setActiveTab('plantNotes')} className={activeTab === 'plantNotes' ? 'active' : ''}>
          Plant Notes
        </button>
      </div>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Profile;
