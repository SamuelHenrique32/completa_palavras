import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Letras from './letras'
import SimpleCard from './cards'
import axios from 'axios';

//Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { All } from './css/style'



// TODO vem do banco de dados
const palavra_recebida = [{valor: 'PA?O', correta: undefined, palavras_para_formar: 3, dica: 'Nada, voa e anda', pontuacao_da_palavra: 10, pontuacao_atual: 30}]
const maxQuantSubstituicoes = 5
const palavras_para_formar = 3

class Jogo extends Component {
    constructor(props) {
        super(props)

        //constante ate receber outra palavra
        window.localStorage.setItem('palavra_recebida_stored',palavra_recebida[0].valor)

        this.state = {
            //state recebe palavras const
            palavra: palavra_recebida,
            pontuação: 0,
            palavraDigitada: '',
            listDePalavrasJaFeitas: [],
            dica: '',
            quantidadeSubstituicoes: 0
        }
    }    

    // Usar arrow functions em vez de batata() devido a não precisar dar bind
    
    send = (event) => {

        //window.localStorage.removeItem('usuario');

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

    //TODO - somente quando receber a palavra do backend
    buscaInterrogacao = () => {
        var palavra_busca_interrogacao = window.localStorage.getItem('palavra_recebida_stored');
        return palavra_busca_interrogacao.indexOf('?')+1
    }

    limpaPalavra = () => {
        var palavra_limpa = window.localStorage.getItem('palavra_recebida_stored');        
        this.state.palavra[0].valor = palavra_limpa
        this.setState({palavraDigitada: palavra_limpa})
        this.state.quantidadeSubstituicoes = 0
    }

    trocaLetra = (letra) => {
        //posicao que possui o ponto de interrogacao
        //state para renderizar novamente
        var pos_interrogacao = this.buscaInterrogacao()
        //pode continuar inserindo letras
        if(pos_interrogacao > 0 && this.state.quantidadeSubstituicoes < maxQuantSubstituicoes){
           var p = this.state.palavra[0]
           var palavra_atual = p
           var palavra_final = palavra_atual.valor.substr(0,pos_interrogacao)+letra+palavra_atual.valor.substr(pos_interrogacao,palavra_atual.valor.length);
           palavra_atual.valor = palavra_final.replace('?','');
           this.state.quantidadeSubstituicoes++
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

                    <Grid container justify="flex-start">
                        <Typography variant="button" className={classes.PalavrasFormadas}>
                            Palavras Formadas:
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <SimpleCard></SimpleCard>
                    <SimpleCard></SimpleCard>
                </Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Letras click={this.trocaLetra}></Letras>
                        </Grid>
                        <Grid item xs={12} className={classes.PalavrasParaFormar}>
                            FORME {this.state.palavra[0].palavras_para_formar} PALAVRAS:
                        </Grid>
                        <Grid item xs={12} className={classes.Palavra}>
                            {this.state.palavra[0].valor.replace('?','_')}
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center" className={classes.BotoesLimparEnviar}>
                            {/* botoes */}
                            <Grid item xs={2}>
                                <Button  variant="outlined" size="large" className={classes.BotaoLimpar} onClick={this.limpaPalavra}>
                                    Limpar
                                </Button>
                            </Grid>    
                            <Grid item xs={2}>
                                <Button variant="outlined" size="large" className={classes.BotaoEnviar} onClick={this.send}>
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