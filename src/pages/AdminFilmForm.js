import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { filmService } from '../services/api';

const AdminFilmForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    release_date: '',
    genre: '',
    director: '',
    cast: '',
    poster_url: '',
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }

    if (id) {
      const fetchFilm = async () => {
        try {
          const response = await filmService.getFilm(id);
          setFormData(response.data);
        } catch (err) {
          setError('Failed to fetch film data');
        }
      };
      fetchFilm();
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        await filmService.updateFilm(id, formData);
      } else {
        await filmService.createFilm(formData);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save film');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Film' : 'Add New Film'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="duration">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="release_date">
              Release Date
            </label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="genre">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="director">
              Director
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cast">
            Cast
          </label>
          <input
            type="text"
            id="cast"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="poster_url">
            Poster URL
          </label>
          <input
            type="url"
            id="poster_url"
            name="poster_url"
            value={formData.poster_url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">Active</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Saving...' : 'Save Film'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminFilmForm; 