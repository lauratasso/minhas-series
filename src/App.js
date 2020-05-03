import React from 'react';
import Header from './header';
import Generos from './generos';
import NovoGenero from './novoGenero';
import EditGenero from './editGenero';
import Series from './series';
import NovaSerie from './novaSerie';
import InfoSerie from './infoSerie';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container'>
      <h1>Minhas Séries</h1>
    </div>
  )
}

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/generos/novo' exact component={NovoGenero} />
          <Route path='/generos/:id' exact component={EditGenero} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/novo' exact component={NovaSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
