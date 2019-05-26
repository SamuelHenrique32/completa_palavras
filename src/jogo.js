import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Letras from './letras'

//Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = {
    Jogador: {
        marginTop: "20px",
        marginRight: "20px",
        fontSize: "20px",
        fontWeight: "700",
        fontFamily: "Impact, Charcoal, sans-serif"
    },
    Palavra: {
        fontSize: "180px",
        marginTop: "80px",
        marginRight: "100px"
    }
};

// TODO vem do banco de dados
const palavras = [{valor: 'PA?O', correta: undefined, possibilidades: [1,2,2,2,3]},
                  {valor: 'CA?A', correta: undefined},
                  {valor: 'ABACA?I', correta: undefined}];

class Jogo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //state recebe palavras const
            palavras: palavras
        }
        this.props = props;

        this.trocaLetra = this.trocaLetra.bind(this);
    }

    trocaLetra(letra){
        //posicao que possui o ponto de interrogacao
        //state para renderizar novamente
        var pos_interrogacao = this.state.palavras[0].valor.indexOf('?')
        if(pos_interrogacao > 0){
           var p = this.state.palavras
           var palavra_atual = p[0]
           var replace = palavra_atual.valor.substr(0,pos_interrogacao)+letra+palavra_atual.valor.substr(pos_interrogacao,palavra_atual.valor.length);
           palavra_atual.valor = replace.replace('?','');
           console.log(replace)
          
           //atualizar state, renderiza sozinho
           this.setState({palavras: p})
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
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Jogo);