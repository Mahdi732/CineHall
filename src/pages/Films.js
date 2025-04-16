import React, { useState, useEffect } from 'react';
import { filmService } from '../services/api';

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await filmService.getFilms();
        setFilms(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch films');
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {films.map((film) => (
        <div key={film.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{film.title}</h3>
            <p className="text-gray-600 mb-2">{film.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">${film.price}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Films; 