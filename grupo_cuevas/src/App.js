//import logo from './logo.svg';
import './App.css';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import fondo from './componentes/fondo.png'

const estilo = makeStyles(theme=> ({
  root: {
    backgroundImage: `url(${fondo})`
  }
}));

function App() {
  const clases = estilo()

  return (
    <Grid container component='main' className={clases.root}>
      hola
    </Grid>
  );
}

export default App;
