import React, { useEffect } from 'react';
import './App.css';
import { useLocationStore } from './store';

export const Locations = () => {
  const { locationPython, locationsDOTNET, fetchLocationsDOTNET, fetchLocationsPython } = useLocationStore();

  useEffect(() => {
    fetchLocationsPython();
  }, []);

  useEffect(() => {
    fetchLocationsDOTNET();
  }, []);

  return (
    <div className="locations-container">
      <h1>Locations List Python</h1>
      <ul>
        {locationPython.map((location, index) => (
          <li key={index} className="location-item-python">
            <strong>{location.name}</strong> - {location.Region}
          </li>
        ))}
      </ul>
      <h1>Locations List DOTNET</h1>
      <ul>
        {locationsDOTNET.map((location, index) => (
          <li key={index} className="location-item-dotnet">
            <strong>{location.name}</strong> - {location.region}
          </li>
        ))}
      </ul>
    </div>
  );
};
