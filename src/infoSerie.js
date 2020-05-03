import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  });
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('INFO');
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');


  useEffect(() => {
      axios.get('/api/series/' + match.params.id)
            .then(res => {
              setData(res.data)
              setForm(res.data)
            });
  }, [match.params.id])

  useEffect(() => {
    axios.get('/api/genres')
    .then(res => {
      setGenres(res.data.data)
      const genres = res.data.data;
      const encontrado = genres.find(value => data.genre === value.name);
      if (encontrado){
        setGenreId(encontrado.id);
      }
    });
  }, [data])


//utiliza esse 'field' para conseguir alterar qualquer campo que esteja mexendo, passando o parametro lá no form
  const onChange = field => event => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  }

  const onChangeGenre = evt => {
    setGenreId(evt.target.value);
  }

  const statusSelect = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  const saveSerie = () => {
    axios.put('/api/series/' + match.params.id, {
      ...form,
      genre_id: genreId
    })
      .then(res => {
        setSuccess(true);
      })
  }

  if (success) {
    return <Redirect to='/series' />
  }


  //custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

 
  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'> 
            <div className='row h-100 align-items-center'>
              <div className='col-3'>            
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                { form.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge> }
                { form.status === 'PARA_ASSISTIR' &&  <Badge color='warning'>Para assistir</Badge> }
                { form.status === 'ASSISTINDO' &&  <Badge color='danger'>Assistindo</Badge> }
               <br></br> Gênero: {data.genre}
                </div> 
              </div>
            </div>
          </div>
          </div>       
      </header>
      <div className='container' style={{ 'marginTop': '10px'}}>
        <button className='btn btn-lg btn-warning' onClick={() => setMode('EDIT')}>Editar</button>
      </div>
      {
        mode === 'EDIT' &&
        <div className='container' id='style-container'>
          <h1>Editar Série</h1>
          <form>
            <div className='form-group'>
              <label htmlFor="name">Nome</label>
              <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Nome da Série" />
            </div>

            <div className='form-group'>
              <label htmlFor="comentario">Comentários</label>
              <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="comentario" placeholder="Digite um comentário" />
            </div>

            <div className='form-group'>
              <label htmlFor="selectGeneros">Gênero</label>
              <select className='form-control' id='selectGeneros' onChange={onChangeGenre} value={genreId}>
                {genres.map(genre =>  <option key={genre.id} value={genre.id}>{genre.name}</option>)} 
              </select>
            </div>

            <div className='form-check'>
              <input className='form-check-input' type='radio' checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onChange={statusSelect('ASSISTIDO')}/>
              <label className='form-check-label' htmlFor='assistido'> Assistido</label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' checked={form.status === 'PARA_ASSISTIR'} name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={statusSelect('PARA_ASSISTIR')} />
              <label className='form-check-label' htmlFor='paraAssistir'> Para Assistir</label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' checked={form.status === 'ASSISTINDO'} name='status' id='assistindo' value='ASSISTINDO' onChange={statusSelect('ASSISTINDO')}/>
              <label className='form-check-label' htmlFor='assistindo'> Assistindo no momento</label>
            </div>

            <button type='button' className='btn btn-primary' onClick={saveSerie}>Salvar</button>
          <button className='btn btn-danger' onClick={() => setMode('INFO')} style={{'margin-left': '15px'}} >Cancelar Edição</button>

        </form>
        </div>
      }
    </div>

  );

}

export default InfoSerie;
