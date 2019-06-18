import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

//Material UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = {
    Letras: {
        color: "#2196f3",
        marginTop: '15px',
        marginRight: '25px',
        borderColor: "#2196f3"
    }
};

const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z']

class Letras extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        this.props = props;

    }

    render() {
        const { classes } = this.props
        return (
            //set de acordo com this.props
            <Grid container>
                {/* map e foreach que retornara botoes */}
                {alfabeto.map((letra) => {
                    let val = letra;
                    return (
                    <Grid>
                        <Button className={classes.Letras} variant="outlined" onClick={()=>this.props.click(val)}>
                            <strong>{val}</strong>
                        </Button>
                    </Grid>);
                })}
            </Grid>
        )
    }
}

export default withStyles(styles)(Letras);