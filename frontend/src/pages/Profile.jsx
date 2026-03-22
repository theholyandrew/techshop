import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          
          <h1>👤 Мій профіль</h1>

          <div className="profile-info">
            
            <div className="info-row">
              <span className="label">Ім'я:</span>
              <span className="value">{user?.name}</span>
            </div>

            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </div>

            <div className="info-row">
              <span className="label">Роль:</span>
              <span className={`value badge ${user?.role}`}>
                {user?.role === 'admin' ? '👑 Адміністратор' : '👤 Користувач'}
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;