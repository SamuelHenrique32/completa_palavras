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

    componentDidMount() {
        // const { findPalavra } = this.props
        // findPalavra()
    }

    // Faz o envio da palavra para validação no back end
    send = (event) => {
        event.preventDefault()
        const {
            palavraDigitada,
            palavraAtual,
            sendPalavra
        } = this.props
        const at = palavraAtual.valor.replace('?', palavraDigitada)
        /*
        sendPalavra(
            {id: palavraAtual.id, palavra: at}, 
            this.onSuccess,
            this.onError
        )
        */
    }

    // Atualiza os dados caso sucesso no envio da palavra
    onSuccess = (data) => {
        const { addListPalavrasVistas } = this.props
        let { pontuacao, dica } = this.state
        pontuacao = data.pontuacao ? pontuacao + data.pontuacao : pontuacao
        dica = data.dica || ''
        this.setState({ pontuacao, dica })
        addListPalavrasVistas(data)
    }

    // Deu ruin volta pro debugger
    onError = (error) => {
        console.error('Temos um bug Yeajajkjdk', error)
    }

    // Limpa a string digitada
    limpaPalavra = () => {
        const { changePalavraDigitada } = this.props
        changePalavraDigitada(' ')
    }

    trocaLetra = event => {
        const { changePalavraDigitada, palavraDigitada } = this.props
        let digitado = (palavraDigitada + event).toLowerCase()
        digitado = digitado.replace(' ', '')
        changePalavraDigitada(digitado)
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
            <Grid
                container
                className={classes.PaddingBotton}
                style={this.props.hidden ? {} : { display: "none" }}>

                <Grid container spacing={4} xs={12} sm={12} md={12} lg={12}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Typography variant="button" gutterBottom className={classes.Jogador}>
                            Jogador: {this.props.nome}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <Typography variant="button" className={classes.Jogador}>
                            {'Forme o maior numero de palavras'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <Typography variant="button" className={classes.Jogador}>
                            Palavras Formadas:
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >

                    <Grid item xs={12} sm={12} md={3} lg={3} className={classes.Padding}>
                        {listPalavrasVistas.length && listPalavrasVistas.map(this.renderSimpleCard)}
                    </Grid>

                    <Grid item xs={12} sm={12} md={9} lg={9}>
                        <Grid container>
                            <Grid container direction="row" className={classes.Input}>
                                <Grid item xs={12}>
                                    <Letras
                                        click={this.trocaLetra}>
                                    </Letras>
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
                            <Grid container direction="row" spacing={3} className={classes.BotoesLimparEnviar}
                                xs={12} sm={12} md={12} lg={12}
                            >
                                <Grid item xs={4} sm={4} md={4} xlg={4} className={classes.MarginRight}>
                                    <Button variant="outlined" size="large" className={classes.BotaoLimpar} onClick={this.limpaPalavra}>
                                        {'Limpar'}
                                    </Button>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4} className={classes.MarginRight}>
                                    <Button variant="outlined" size="large" className={classes.BotaoEnviar} onClick={this.send}>
                                        {'Enviar'}
                                    </Button>
                                </Grid>
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