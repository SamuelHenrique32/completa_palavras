import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = {
    //css do paper
    Paper: {
        width: "40vw",
        height: "27vh",
        marginTop: "30vh",
        marginLeft: "30vw"
    },
    Input: {
        width: "100%",
        marginLeft: "15px"
    },
    Title: {
        marginTop: "20px",
        fontSize: "30px",
        color: "#2196f3"
    },
    Page: {
        backgroundImage: "url(https://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=923354307)",
        backgroundPosition: "center top",
        backgroundSize: "100% auto",
        height: "99vh"
    }
};

class Formulario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //recebe o nome digitado
            //objeto com string vazia
            nome: ""
        }
        this.props = props;

        //retornar ao contexto apos o evento
        this.changeNome = this.changeNome.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeNome = event => {
        //evento de alteracao qualquer, le e atualiza nome
        this.setState({ nome: event.target.value })
    }

    //submit form, responsavel por fazer troca do form inicial para jogo
    //quando clicar botao
    onSubmit() {
        //se estiver setado
        if (this.state.nome) {
            // passa nome para o app
            this.props.submit(this.state.nome)
        }
    }

    render() {
        const { classes } = this.props
        return (
            //set de acordo com this.props
            <Grid container style={this.props.hidden ? {} : {display:"none"}} className={classes.Page}>
                {/* necessita ficar dentro de container */}
                <Grid item xs={12}>
                    <Paper className={classes.Paper}>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={12}>
                                <Grid container justify="center">
                                    <Typography variant="button" gutterBottom className={classes.Title}>
                                        Completa Palavras
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    label="Coloque seu nome para jogar"
                                    className={classes.Input}
                                    margin="normal"
                                    value={this.state.nome}
                                    onChange={this.changeNome}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                {/* clica no botao chama on Submit */}
                                <Button onClick={this.onSubmit} variant="outlined" color="primary">
                                    Jogar
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>


        )
    }
}

export default withStyles(styles)(Formulario);