import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { sessionService, bookingService } from '../services/api';
import { QRCodeSVG } from 'qrcode.react';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [session, setSession] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Seat selection, 2: Payment, 3: Confirmation
  const [timer, setTimer] = useState(15 * 60); // 15 minutes in seconds
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await sessionService.getSession(id);
        setSession(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch session details');
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [id]);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleSeatSelect = (seat) => {
    if (seat.is_couple) {
      // Handle couple seats (select both seats)
      const coupleSeats = [seat, { ...seat, number: seat.number + 1 }];
      setSelectedSeats(coupleSeats);
    } else {
      setSelectedSeats([seat]);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await bookingService.createBooking({
        session_id: id,
        seats: selectedSeats.map(seat => seat.id),
        user_id: user.id
      });
      setBookingId(response.data.id);
      setStep(3);
    } catch (err) {
      setError('Failed to create booking');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!session) return <div className="text-center mt-10">Session not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>
          <div className="grid grid-cols-8 gap-2">
            {session.seats.map((seat) => (
              <button
                key={seat.id}
                className={`p-2 rounded ${
                  seat.is_available
                    ? selectedSeats.some(s => s.id === seat.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                    : 'bg-red-200 cursor-not-allowed'
                }`}
                onClick={() => seat.is_available && handleSeatSelect(seat)}
                disabled={!seat.is_available}
              >
                {seat.number}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={() => setStep(2)}
              disabled={selectedSeats.length === 0}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="bg-yellow-100 p-4 rounded-lg mb-6">
            <p className="text-yellow-800">
              Your booking will expire in {formatTime(timer)}
            </p>
          </div>
          <h2 className="text-2xl font-bold mb-6">Payment</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-6">
              <p>Selected Seats: {selectedSeats.map(seat => seat.number).join(', ')}</p>
              <p>Total Price: ${selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expiry Date"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Booking Confirmed!</h2>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <QRCodeSVG value={bookingId} size={200} className="mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Booking ID: {bookingId}</p>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Download Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking; 