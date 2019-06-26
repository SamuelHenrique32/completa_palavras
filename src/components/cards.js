import React, { Component } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { All } from '../css/style'

class SimpleCard extends Component {
  render() {
    const { classes, name, qtde, error, dica } = this.props
    const abc = error ? classes.ErrorCard : classes.SuccessCard
    return (
      < Card className={abc} >
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography color="textSecondary">
            {`Pontuação: ${qtde || 0}`}
          </Typography>
          {dica &&
            <Typography color="textSecondary">
                {`Dica:: ${dica || ''}`}
            </Typography>}
        </CardContent>
      </Card >
    );
  }
}


SimpleCard.propTypes = {
  name: PropTypes.string.isRequired,
  dica: PropTypes.string.isRequired,
  qtde: PropTypes.number.isRequired,
  error: PropTypes.bool
};

export default withStyles(All)(SimpleCard);