import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import './styles.css';

const Generos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('api/genres')
      .then(res => {
        setData(res.data.data)
      });
  }, [])

  const deleteGenero = id => {
    axios.delete('/api/genres/' + id)
      .then(() => {
        setData(data.filter(item => item.id !== id));
      });
  }

  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <Link to={'/generos/' + record.id} className='btn btn-primary' id='linkEdit'>
            <FaEdit size={16} color='black'/>
          </Link>
          <button onClick={() => deleteGenero(record.id)} className='btn btn-danger'>
            <FaRegTrashAlt size={16} color='black'/>
          </button>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container' id='style-container'>
        <h1>Gêneros</h1>
        <div id='buttonNew' ><Link to='/generos/novo'><strong>+</strong> Novo gênero</Link></div>
        <div className='alert alert-warning' role='alert'>
          Você não possui gêneros criados.
        </div>
      </div>
    )
  }

  return (
    <div className='container' id='style-container'>
      <h1>Gêneros</h1>
      <div id='buttonNew' ><Link to='/generos/novo'><strong>+</strong> Novo gênero</Link></div>
      <table className='table'>
        <thead className='table table-dark'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </table>
    </div>
  )
}

export default Generos;