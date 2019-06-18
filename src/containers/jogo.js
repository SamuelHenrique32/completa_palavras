import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Letras from '../components/letras'
import SimpleCard from '../components/cards'

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { All } from '../css/style'
import * as palavraActions from '../actions/palavrasActions'

// TODO vem do banco de dados
const palavraRecebida = { valor: 'PA?O', id: 0, dica: '' }

class Jogo extends Component {
    constructor(props) {
        super(props)

        //constante ate receber outra palavra
        window.localStorage.setItem('palavra_recebida_stored', palavraRecebida.valor)

        this.state = {
            idPalavra: palavraRecebida.id,
            palavraRecebida: palavraRecebida,
            pontuacao: 0,
            palavraDigitada: '',

            palavrasPassada: [{ palavra: 'pato', pontuacao: 5 }, { palavra: 'gatr', dica: 'mia' }],
            dica: palavraRecebida.dica,
            quantidadeSubstituicoes: 0
        }
    }

    send = (event) => {
        event.preventDefault()

        const { palavraDigitada, idPalavra } = this.state
        const data = {
            palavraDigitada,
            idPalavra
        }
        console.log(data)
    }

    updateDados = data => {

        const { listDePalavrasJaFeitas } = this.state
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
        return palavra_busca_interrogacao.indexOf('?') + 1
    }

    limpaPalavra = () => {
        let palavra_limpa = window.localStorage.getItem('palavra_recebida_stored');
        const { palavraRecebida } = this.state
        this.setState({ palavraDigitada: palavra_limpa, palavraRecebida: { ...this.state.palavraRecebida, valor: palavra_limpa } })
    }

    trocaLetra = (letra) => {
        //posicao que possui o ponto de interrogacao
        //state para renderizar novamente
        var pos_interrogacao = this.buscaInterrogacao()
        //pode continuar inserindo letras
        if (pos_interrogacao > 0) {
            const { palavraRecebida } = this.state

            var palavra_final =
                palavraRecebida.valor.substr(0, pos_interrogacao) +
                letra +
                palavraRecebida.valor.substr(pos_interrogacao, palavraRecebida.valor.length)

            palavraRecebida.valor = palavra_final.replace('?', '');
            this.setState({ palavraDigitada: { ...this.state.palavraRecebida, valor: palavraRecebida } })
        }
    }

    renderSimpleCard = e => {
        if (e.dica) {
            return (
                <SimpleCard name={e.palavra} dica={e.dica} qtde={0} error />
            )
        } else {
            return (
                <SimpleCard name={e.palavra} qtde={e.pontuacao} />
            )
        }
    }

    render() {
        const { classes } = this.props
        const { palavrasPassada, pontuacao } = this.state
        return (
            //set de acordo com this.props
            <Grid container style={this.props.hidden ? {} : { display: "none" }}>
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

                <Grid item xs={3} className={classes.Padding}>
                    {palavrasPassada.map(this.renderSimpleCard)}
                </Grid>

                <Grid item xs={9}>
                    <Grid container>
                        <Grid container direction="row" className={classes.Input}>
                            <Grid item xs={12}>
                                <Letras click={this.trocaLetra}></Letras>
                            </Grid>
                            <Grid item xs={12} className={classes.PalavrasParaFormar}>
                                Forme o maior numero de palavras
                        </Grid>
                        </Grid>
                        <Grid container direction="row">
                            <Grid item xs={12} lg={9} className={classes.Palavra}>
                                {this.state.palavraRecebida.valor.replace('?', '_')}
                            </Grid>
                            <Grid xs={12} lg={2} item justify="flex-end" className={classes.Pontuacao}>
                                {`PONTUAÇÃO: ${pontuacao}`}
                            </Grid>
                        </Grid>
                        <Grid container direction="row" className={classes.BotoesLimparEnviar}>
                            <Grid item xs={6} sm={6} className={classes.MarginRight}>
                                <Button variant="outlined" size="large" className={classes.BotaoLimpar} onClick={this.limpaPalavra}>
                                    Limpar
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={5} className={classes.MarginRight}>
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

const mapStateToProps = (state) => {
    return {
        palavraAtual: state.palavra.get.record
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = { ...palavraActions }
    return bindActionCreators(actions, dispatch)
}

Jogo.propTypes = {
    palavraAtual: PropTypes.string.isRequired,
    findPalavra: PropTypes.func.isRequired,
    sendPalavra: PropTypes.func.isRequired
};

const JogoWithStyle = withStyles(All)(Jogo)

export default connect(mapDispatchToProps, mapStateToProps)(JogoWithStyle);