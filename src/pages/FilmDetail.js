import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { filmService, sessionService } from '../services/api';

const FilmDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const [filmResponse, sessionsResponse] = await Promise.all([
          filmService.getFilm(id),
          sessionService.getSessionsByFilm(id)
        ]);
        setFilm(filmResponse.data);
        setSessions(sessionsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch film details');
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    navigate(`/booking/${session.id}`);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!film) return <div className="text-center mt-10">Film not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Film Information */}
        <div>
          <img
            src={film.image_url || 'https://via.placeholder.com/400x600'}
            alt={film.title}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="mt-4">
            <h1 className="text-3xl font-bold">{film.title}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {film.genre}
              </span>
              <span className="text-gray-600">{film.duration} min</span>
              <span className="text-gray-600">Age: {film.min_age}+</span>
            </div>
            <p className="mt-4 text-gray-700">{film.description}</p>
            
            {/* Trailer Section */}
            {film.trailer_url && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Trailer</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={film.trailer_url}
                    title={`${film.title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sessions List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Sessions</h2>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => handleSessionSelect(session)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {new Date(session.start_time).toLocaleDateString()} -{' '}
                      {new Date(session.start_time).toLocaleTimeString()}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        session.type === 'VIP' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {session.type}
                      </span>
                      <span className="text-gray-600">{session.language}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      ${session.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session.available_seats} seats available
                    </p>
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

export default FilmDetail; 