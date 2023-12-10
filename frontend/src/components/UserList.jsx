import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-3 is-centered">
      <div className="column is-narrow is-offset">
        <h2 className="title is-4">Daftar Mahasiswa</h2>
        <p>Total {users.length} users</p>
        <table className="table is-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Npm</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Jurusan</th>
              <th>No.Hp</th>
              <th>Actions <Link to={`add`} className='button is-success is-small'>Add Mahasiswa</Link> </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.npm}</td>
                <td>{user.name}</td>
                <td>{user.kelas}</td>
                <td>{user.jurusan}</td>
                <td>{user.phone}</td>
                <td>
                  <Link to={`edit/${user.id}`} className="button is-small is-info mr-1">Edit</Link>
                  <Link to={`view/${user.id}`} className="button is-small is-dark mr-1">View</Link>
                  <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
