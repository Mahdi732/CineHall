import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DeleteAccount = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();
  const { deleteAccount } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await deleteAccount(formData);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Suppression de compte</h2>
      
      {!isConfirmed ? (
        <div className="text-center">
          <p className="mb-4 text-gray-700">
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
          </p>
          <button
            onClick={() => setIsConfirmed(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Je confirme
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-700">
            Pour confirmer la suppression de votre compte, veuillez entrer vos identifiants :
          </p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsConfirmed(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
              >
                {loading ? 'Suppression en cours...' : 'Supprimer le compte'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default DeleteAccount; 