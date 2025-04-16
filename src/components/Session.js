import { Link } from 'react-router-dom';

const Session = ({ session }) => {
  return (
    <div className="session-card">
      <Link to={`/booking/${session.id}`} className="btn btn-primary">
        Book Now
      </Link>
    </div>
  );
};

export default Session; 