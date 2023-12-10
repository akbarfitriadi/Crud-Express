import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [nextUserId, setNextUserId] = useState(null);

  useEffect(() => {
    getUser();
  }, [id]);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${id}`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const getNextUserId = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/users`);
      const currentIndex = response.data.findIndex(u => u.id === parseInt(id));
      const nextIndex = (currentIndex + 1) % response.data.length;
      const nextUserId = response.data[nextIndex].id;
      setNextUserId(nextUserId);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getNextUserId();
  }, [id]);

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-half">
        <div className="box">
          <h2 className="title is-4 has-text-centered">Details Mahasiswa</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <ul>
                <li><strong>Npm:</strong> {user.npm}</li>
                <li><strong>Nama:</strong> {user.name}</li>
                <li><strong>Kelas:</strong> {user.kelas}</li>
                <li><strong>Jurusan:</strong> {user.jurusan}</li>
                <li><strong>No.Hp:</strong> {user.phone}</li>
              </ul>
              <div className="has-text-centered mt-4">
                <Link to="/" className="button is-dark is-small">Back</Link>
                {nextUserId && (
                  <Link to={`/view/${nextUserId}`} className="button is-success is-small ml-2">Next</Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
