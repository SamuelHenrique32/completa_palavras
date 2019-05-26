import React from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Formulario from './formulario'
import Grid from "@material-ui/core/Grid";
import Jogo from './jogo.js'

const styles = {}

class HomeView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nome: "",
      isForm: true,
      isGame: false
    }
    this.props = props;
    //adicionar this ao contexto atual, volta p contexto depois do evento
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(nome){
    this.setState({
      nome: nome
    })
    this.setState({
      isForm: false
    })
    this.setState({
      isGame: true
    })

    console.log(nome);
  }

  render() {
    return (
      <Grid container>
        {/* necessita ficar dentro de container */}
        <Grid item xs={12}>
          <Formulario hidden={this.state.isForm} submit={this.submitForm}></Formulario>
        </Grid>
        <Grid item xs={12}>
          <Jogo hidden={this.state.isGame} nome={this.state.nome}></Jogo>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(HomeView);
