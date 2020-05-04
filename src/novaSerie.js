import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovaSerie = () => {

  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');
  let status = '';

  useEffect(() => {
    axios.get('/api/genres')
        .then(res => {
          setGenres(res.data.data);
  });
}, [genreId])

  const onChange = event => {
    setName(event.target.value);
  }

  const onChangeGenre = evt => {
      setGenreId(evt.target.value);
  }

  const statusSelect = value => () => {
    status = value;
    console.log(status);
  }

  const saveSerie = () => {
    axios.post('/api/series', {
      name: name,
      genre_id: genreId,
      status: status
    })
      .then(res => {
        setSuccess(true);
      })
  }

  if (success) {
    return <Redirect to='/series'/>
  }


  return (
    <div className='container' id='style-container'>
      <h1>Nova Série</h1>
      <form>
        <div className='form-group'>
          <label htmlFor="name"><strong>Nome</strong></label>
          <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome da Série" />
        </div>

        <div className='form-group'>
          <label htmlFor="selectGeneros"><strong>Gênero</strong></label>
          <select className='form-control' id='selectGeneros' onChange={onChangeGenre} value={genreId}>
            <option></option>
            {genres.map(genre =>  <option key={genre.id} value={genre.id}>{genre.name}</option>)} 
          </select>
        </div>
       
        <label htmlFor="selectStatus"><strong>Status</strong></label>
        <div className='form-check'>
          <input className='form-check-input' type='radio' name='status' id='assistido' value='ASSISTIDO' onChange={statusSelect('ASSISTIDO')}/>
          <label className='form-check-label' htmlFor='assistido'> Assistido</label>
        </div>
        <div className='form-check'>
          <input className='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={statusSelect('PARA_ASSISTIR')} />
          <label className='form-check-label' htmlFor='paraAssistir'> Para Assistir</label>
        </div>
        <div className='form-check'>
          <input className='form-check-input' type='radio' name='status' id='assistindo' value='ASSISTINDO' onChange={statusSelect('ASSISTINDO')}/>
          <label className='form-check-label' htmlFor='assistindo'> Assistindo no momento</label>
        </div>
        <br></br>

        <button type='button' id='btnSalvar' className='btn btn-primary' onClick={saveSerie}>Salvar</button>

      </form>
    </div>

  );

}

export default NovaSerie;
