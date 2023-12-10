import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const [npm, setNpm] = useState("");
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("-Pilih");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    getUsersById();
  }, [id]);
 
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4000/users/${id}`, {
        npm, 
        name, 
        kelas, 
        jurusan, 
        phone,
      });
      navigate("/");
    } catch (error) {
      console.log('Error fetching data:', error);
    }    
  };

  const getUsersById = async () => {
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    setNpm(response.data.npm);
    setName(response.data.name);
    setKelas(response.data.kelas);
    setJurusan(response.data.jurusan);
    setPhone(response.data.phone);
  }

  return (
    <div className="columns mt-3 is-centered">
      <div className="column is-half has-text-centered">
        <form onSubmit={updateUser}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Npm</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input type="text" className="input" value={npm} 
                  onChange={(e)=> setNpm(e.target.value)} placeholder='Npm' />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Nama</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input type="text" className="input" value={name} 
                  onChange={(e)=> setName(e.target.value)} placeholder='Nama' />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Kelas</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input type="text" className="input" value={kelas}
                  onChange={(e)=> setKelas(e.target.value)} placeholder='Kelas' />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Jurusan</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select value={jurusan} onChange={(e)=> setJurusan(e.target.value)}>
                      <option value="-Pilih">-Pilih</option>
                      <option value="Teknik Mesin">Teknik Mesin</option>
                      <option value="Teknik Elektro">Teknik Elektro</option>
                      <option value="Teknik Komputer">Teknik Komputer</option>
                      <option value="Teknik Informatika">Teknik Informatika</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">No.Hp</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input type="text" className="input" value={phone} 
                  onChange={(e) => setPhone(e.target.value)} placeholder='+62' />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label"></div>
            <div className="field-body">
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <button type='button' className='button is-dark mr-2' onClick={() => navigate("/")}>Back</button>
                  <button type='submit' className='button is-success '>Update</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
