import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Letras from './letras'
import axios from 'axios';

//Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { All } from './css/style'



// TODO vem do banco de dados
const palavras = [{valor: 'PA?O', correta: undefined, possibilidades: [1,2,2,2,3]}]

class Jogo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //state recebe palavras const
            palavras: palavras,
            pontuação: 0,
            palavraDigitada: '',
            listDePalavrasJaFeitas:[],
            dica: ''
        }
    }

    // Usar arrow functions em vez de batata() devido a não precisar dar bind
    
    send = (event) => {
        // evita o carregamento da pagina (vide F5)
        event.preventDefault()

        const { palavraDigitada } = this.state
        const data = {
            //nome do campo : valor do campo
            palavraDigitada: palavraDigitada
        }
        //manda para backend um json formado por {palavraDigitada: palavraDigitada}
       

    }

    updateDados = data => {
        const {listDePalavrasJaFeitas} = this.state
        listDePalavrasJaFeitas.push(data.palavraEnviada)

        this.setState({
            pontuacao: this.state.pontuacao + data.pontuacao, 
            listDePalavrasJaFeitas: listDePalavrasJaFeitas,
            palavra: data.novaPalavra
        })
    }

    trocaLetra = (letra) => {
        //posicao que possui o ponto de interrogacao
        //state para renderizar novamente
        var pos_interrogacao = this.state.palavras[0].valor.indexOf('?')
        //pode continuar inserindo letras
        if(pos_interrogacao > 0){
           var p = this.state.palavras[0]
           var palavra_atual = p
           var replace = palavra_atual.valor.substr(0,pos_interrogacao)+letra+palavra_atual.valor.substr(pos_interrogacao,palavra_atual.valor.length);
           palavra_atual.valor = replace.replace('?','');
           console.log(replace)
          
           //atualizar state, renderiza sozinho
           this.setState({palavraDigitada: p})
        }
       
    }

    render() {
        const { classes } = this.props
        return (
            //set de acordo com this.props
            <Grid container style={this.props.hidden ? {} : {display:"none"}}>
                <Grid item xs={12}>
                    <Grid container justify="flex-end">
                        <Typography variant="button" gutterBottom className={classes.Jogador}>
                            Jogador: {this.props.nome}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Letras click={this.trocaLetra}></Letras>
                        </Grid>
                        <Grid item xs={12} className={classes.Palavra}>
                            {this.state.palavras[0].valor.replace('?','_')}
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className={classes.BotoesLimparEnviar}>
                            {/* botoes */}
                            <Grid item xs={2}>
                                <Button  variant="outlined" size="large" className={classes.BotaoLimpar}>
                                    Limpar
                                </Button>
                            </Grid>    
                            <Grid item xs={2}>
                                <Button  
                                variant="outlined" 
                                size="large" 
                                className={classes.BotaoEnviar}
                                onClick={this.send}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(All)(Jogo);