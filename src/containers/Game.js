import React from 'react';
import Menu from '../containers/Menu';
import Record from '../containers/Record';
import GameBoard from '../containers/GameBoard';
import Grid from '@material-ui/core/Grid';

const styles = {
  game: {
    marginRight: 'auto',
    marginLeft: 'auto',
    position: 'relative',
  },
}

export default class Game extends React.Component {
  render() {
    let menuButtons = ['Reset'];
    let boardSize = 5;
    let records = [100, 10, 30, 40, 50, 70];
    return (
      <div>
        <Menu buttons={menuButtons}/>
        <Grid container justify='center' style={styles.game}>
          <GameBoard size={boardSize}/>
          <Record records={records}/>
        </Grid>
      </div>
    );
  }
}