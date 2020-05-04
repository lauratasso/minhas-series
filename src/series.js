import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt, FaInfo } from 'react-icons/fa';
import { Badge } from 'reactstrap';
import './styles.css';

const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('api/series')
      .then(res => {
        setData(res.data.data)
      });
  }, [])

  const deleteSerie = id => {
    axios.delete('/api/series/' + id)
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
          { record.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge> }
          { record.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge> }
          { record.status === 'ASSISTINDO' && <Badge color='danger'>Assistindo</Badge> }
        </td> 

        <td>
					<Link to={'/series/' + record.id} className='btn btn-primary' id='linkInfo'>
						<FaInfo size={16} color='black'/>
					</Link>
					<button onClick={() => deleteSerie(record.id)} className='btn btn-danger'>
						<FaRegTrashAlt size={16} color='black'/>
					</button>
        </td>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
			<div className='container' id='style-container'>
			<h1>Séries</h1>
			<div id='buttonNew' ><Link to='/series/novo'><strong>+</strong> Nova Série</Link></div>        
        <div className='alert alert-warning' role='alert'>
				Você não possui séries criadas.
        </div>
      </div>
    )
  }

  return (
    <div className='container' id='style-container'>
      <h1>Séries</h1>
      <div id='buttonNew' ><Link to='/series/novo'><strong>+</strong> Nova Série</Link></div>
      <table className='table'>
        <thead className='table table-dark'>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Status</th>
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

export default Series;