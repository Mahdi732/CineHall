import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { filmService } from '../services/api';

const Home = () => {
  const [featuredFilms, setFeaturedFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedFilms = async () => {
      try {
        const response = await filmService.getFilms();
        // Get the first 3 films as featured
        setFeaturedFilms(response.data.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch featured films:', err);
        setLoading(false);
      }
    };

    fetchFeaturedFilms();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Welcome to CinéHall</h1>
            <p className="text-xl mb-8">Experience the magic of cinema</p>
            <Link
              to="/films"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
            >
              Browse Films
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Films Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Films</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFilms.map((film) => (
              <div
                key={film.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className="h-48 bg-gray-200">
                  {/* You can add film image here */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{film.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{film.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">${film.price}</span>
                    <Link
                      to={`/films/${film.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Cinema?</h2>
          <p className="text-xl mb-8">Join us for an unforgettable movie experience</p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 