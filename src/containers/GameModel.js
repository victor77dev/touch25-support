import React from 'react';
import { connect } from  'react-redux';
import { startGame, endGame } from '../actions/gameActions';

const mapStateToProps = (state) => {
  return {
    gameStarted: state.game.gameStarted,
    gameEnd: state.game.gameEnd,
    blocks: state.game.blocks,
  }
}

const mapDispatchToProps = dispatch => ({
  startGame: (size) => dispatch(startGame(size)),
  endGame: () => dispatch(endGame()),
});

export class GameModel extends React.PureComponent {
  componentDidMount() {
    let { startGame, size } = this.props;
    startGame(size);
  }

  checkBlocks = (blocks, size) => {
    let { endGame } = this.props;
    let completed = true;
    let nextCheck = 1;
    while ((nextCheck < size * size) && (completed &= blocks[nextCheck]['completed']))
      nextCheck++;
    blocks[nextCheck]['completed'] = blocks[nextCheck]['clicked'];
    if (blocks[size * size]['completed'])
      endGame();

    //Reset all clicks
    for (let i = 0; i < size * size; i++)
      blocks[i + 1]['clicked'] = false;
  }

  componentWillReceiveProps(nextProps) {
    let { blocks, size, gameEnd, startGame } = nextProps;
    if (Object.keys(blocks).length !== 0)
      this.checkBlocks(blocks, size);

    // Reset game
    if (gameEnd)
      startGame(size);
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameModel);