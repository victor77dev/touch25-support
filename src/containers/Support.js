import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const styles = (theme) => ({
  overlay: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 5,
    textAlign: 'center',
  },
  overlayDetail: {
    width: '60%',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(150,150,150,0.7)',
    zIndex: 6,
    textAlign: 'center',
  },
  captcha: {
    width: 300,
    margin: 'auto',
    zIndex: 6,
  },
  textCen: {
    textAlign: 'center',
    color: grey['300'],
    display: 'block',
    margin: theme.spacing.unit,
  },
  closeButton: {
    float: 'right',
    margin: theme.spacing.unit,
    display: 'block',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Support extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    showDetail: true,
    solved: false,
    message: 'Please Support us by Solving the Captcha!',
  }

  componentDidMount() {
    this.genPuzzle();
  }

  closeDetail = () => {
    this.setState({ showDetail: false });
  }

  genPuzzle = () => {
    if (window.ACPuzzle) {
      window.ACPuzzle.create('6DkFTFO7QCtwg.jciNoHGmLk4aryktjf', 'solvemedia', { lang: 'en', size: 'standard' });
    } else {
      setTimeout(()=> {
        this.genPuzzle();
      }, 1000);
    }
  }

  reGenPuzzle = () => {
    if (window.ACPuzzle) {
      window.ACPuzzle.destroy();
      window.ACPuzzle.create('6DkFTFO7QCtwg.jciNoHGmLk4aryktjf', 'solvemedia', { lang: 'en', size: 'standard' });
    } else {
      setTimeout(()=> {
        this.reGenPuzzle();
      }, 1000);
    }
  }

  checkResult = () => {
    let findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
    let userIp = null;
    findIP.then((ip) => {
      userIp = ip;
      let challenge = window.ACPuzzle.get_challenge();
      let response = window.ACPuzzle.get_response();
      axios.post('https://protean-iridium-213913.appspot.com/solvemedia', {
        site: 'victor77dev.github.io',
        challenge: challenge,
        response: response,
        remoteip: userIp,
      }).then((response) => {
        const [result, error, authenticator] = response.data.split("\n");
        if (result === 'true') {
          window.ACPuzzle.destroy();
          this.setState({message: 'Thanks for your support!', solved: true});
        } else {
          this.reGenPuzzle();
          console.log(error);
        }
      }).catch((error) => {
        console.log(error);
      });
    }).catch((e) => {
      console.error(e);
    })
  }

  skipPuzzle = () => {
    window.ACPuzzle.destroy();
    this.setState({message: 'Enjoy the Game! Please Support Us Next Time!', solved: true});
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.checkResult();
    }
  }

  render() {
    const { classes } = this.props;
    const { showDetail, message, solved } = this.state;
    if (showDetail) {
      return (
        <Card className={classes.overlay} onKeyPress={this.onKeyPress}>
          <Card className={classes.overlayDetail}>
            {
              solved &&
              <IconButton className={classes.closeButton} aria-label="Close" onClick={this.closeDetail}>
                <CloseIcon />
              </IconButton>
            }
            <Typography variant="display2" component="h2" className={classes.textCen}>
              {message}
            </Typography>
            <div id="solvemedia" className={classes.captcha}></div>
            {!solved && <Button variant="contained" className={classes.button} onClick={this.checkResult}>Submit</Button>}
            {!solved && <Button variant="contained" className={classes.button} onClick={this.skipPuzzle}>Skip this time</Button>}
          </Card>
        </Card>
      );
    } else {
      return null;
    }
  }
}

Support.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Support);
