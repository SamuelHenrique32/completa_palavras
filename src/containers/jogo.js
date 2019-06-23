import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import Letras from '../components/letras'
import SimpleCard from '../components/cards'

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { All } from '../css/style'
import * as palavraActions from '../actions/palavrasActions'

class Jogo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pontuacao: 0
        }
    }

    componentDidMount(){
        const { findPalavra } = this.props
        findPalavra()
    }

    // Faz o envio da palavra para validação no back end
    send = (event) => {
        event.preventDefault()
        const { palavraDigitada, palavraAtual, sendPalavra} = this.props
        sendPalavra({id: palavraAtual.id, palavra: palavraDigitada})
    }

    // Limpa a string digitada
    limpaPalavra = () => {
        const { changePalavraDigitada } = this.props
        changePalavraDigitada(' ')
    }

    trocaLetra = event => {
        const { changePalavraDigitada, palavraDigitada } = this.props
        let digitado = (palavraDigitada + event).toLowerCase() 
        digitado = digitado.replace(' ','')
        changePalavraDigitada( digitado)
        console.log(event)
    }

    // Renderiza uma SImpleCard
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
        const { classes, listPalavrasVistas, palavraAtual, palavraDigitada } = this.props
        const { pontuacao } = this.state
        return (
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
                    {listPalavrasVistas.length && listPalavrasVistas.map(this.renderSimpleCard)}
                </Grid>

                <Grid item xs={9}>
                    <Grid container>
                        <Grid container direction="row" className={classes.Input}>
                            <Grid item xs={12}>
                                <Letras 
                                click={this.trocaLetra}>
                                </Letras>
                            </Grid>
                            <Grid item xs={12} className={classes.PalavrasParaFormar}>
                                {'Forme o maior numero de palavras'}
                        </Grid>
                        </Grid>
                        <Grid container direction="row">
                            <Grid item xs={12} lg={9} className={classes.Palavra}>
                                {palavraAtual.valor.replace('?', palavraDigitada)}
                            </Grid>
                            <Grid xs={12} lg={2} item justify="flex-end" className={classes.Pontuacao}>
                                {`PONTUAÇÃO: ${pontuacao}`}
                            </Grid>
                        </Grid>
                        <Grid container direction="row" className={classes.BotoesLimparEnviar}>
                            <Grid item xs={6} sm={6} className={classes.MarginRight}>
                                <Button variant="outlined" size="large" className={classes.BotaoLimpar} onClick={this.limpaPalavra}>
                                    {'Limpar'}
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={5} className={classes.MarginRight}>
                                <Button variant="outlined" size="large" className={classes.BotaoEnviar} onClick={this.send}>
                                    {'Enviar'}
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
    console.log(state)
    return {
        palavraAtual: state.palavra.get.data,
        palavraDigitada: state.palavra.palavraDigitada,
        listPalavrasVistas: state.palavra.palavrasVista.list
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = { ...palavraActions }
    return bindActionCreators(actions, dispatch)
}

Jogo.propTypes = {
    palavraAtual: PropTypes.object.isRequired,
    findPalavra: PropTypes.func.isRequired,
    sendPalavra: PropTypes.func.isRequired,
    addListPalavrasVistas: PropTypes.func.isRequired,
    changePalavraDigitada: PropTypes.func.isRequired
};

export default compose(
    withStyles(All),
    connect(mapStateToProps, mapDispatchToProps)
  )(Jogo);