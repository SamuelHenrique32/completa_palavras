import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//Material UI
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

const styles = {};

class Formulario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //recebe o nome digitado
            //objeto com string vazia
            nome: ""
        }
        this.props = props;
    }

    changeNome = event => {
        //evento de alteracao qualquer, le e atualiza nome
        this.setState({ nome: event.target.value })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container>
                {/* necessita ficar dentro de container */}
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={9}>
                            <TextField
                                label="Coloque seu nome para jogar"
                                className={classes.textField}
                                margin="normal"
                                value={this.state.nome}
                                onChange={this.changeNome}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button>
                                Jogar
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>


        )
    }
}

export default withStyles(styles)(Formulario);