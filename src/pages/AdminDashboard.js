import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { filmService } from '../services/api';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalFilms: 0,
    activeFilms: 0,
    totalBookings: 0,
  });

  const handleDeleteFilm = async (filmId) => {
    try {
      await filmService.deleteFilm(filmId);
      // Update the films list after successful deletion
      setFilms(films.filter(film => film.id !== filmId));
      // Update stats
      setStats(prevStats => ({
        ...prevStats,
        totalFilms: prevStats.totalFilms - 1,
        activeFilms: prevStats.activeFilms - 1
      }));
    } catch (err) {
      setError('Failed to delete film');
    }
  };

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [filmsResponse, statsResponse] = await Promise.all([
          filmService.getFilms(),
          filmService.getStats(),
        ]);
        setFilms(filmsResponse.data);
        setStats(statsResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Films</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalFilms}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Active Films</h3>
          <p className="text-3xl font-bold text-green-600">{stats.activeFilms}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
        </div>
      </div>

      {/* Films Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Films Management</h2>
          <button
            onClick={() => navigate('/admin/films/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add New Film
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {films.map((film) => (
                <tr key={film.id} className="border-t">
                  <td className="py-3 px-4">{film.title}</td>
                  <td className="py-3 px-4">{film.duration} min</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      film.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {film.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigate(`/admin/films/${film.id}/edit`)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFilm(film.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 