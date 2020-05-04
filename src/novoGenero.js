import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovoGenero = () => {

  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const onChange = event => {
    setName(event.target.value);
  }

  const saveGenre = () => {
    axios.post('/api/genres', {
      name: name
    })
      .then(res => {
        setSuccess(true);
      })
  }

  if (success) {
    return <Redirect to='/generos'/>
  }


  return (
    <div className='container' id='style-container'>
      <h1>Novo Gênero</h1>
      <form>
        <div className='form-group'>
          <label htmlFor="name">Nome</label>
          <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome do Gênero" />
        </div>
        <button type='button' id='btnSalvar' className='btn btn-primary' onClick={saveGenre}>Salvar</button>

      </form>
    </div>

  );

}

export default NovoGenero;
