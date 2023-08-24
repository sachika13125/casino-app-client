import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      fetch('http://localhost:3000/getUsersData')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const currentUser = data.player;
          setUserData(currentUser);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [hovered]);

  return (
    <div
      className="user-profile"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {userData ? (
        <div className="profile-details">
          <div className="user-info">
            <h2 className='user-name font-bold'>{userData.username}</h2>
            <p><strong>Balance:</strong> {userData.balance}</p>
            <p><strong>Tickets:</strong> {userData.tickets}</p>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default UserProfile;
