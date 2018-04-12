import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import ClickableComponent from '../ClickableComponent';

const propTypes = {
  actions: PropTypes.object,
  className: PropTypes.string,
  autoPlay: PropTypes.bool
};

const defaultProps = {
  autoPlay: false
}

class AutoPlayButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
      isloop: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { actions, player } = this.props
    const { isloop } = this.state
    const videoEle = document.getElementsByClassName('video-react-video')[0]
    
    videoEle.loop = !isloop

    this.setState({
      isloop: !isloop
    })
  }

  render () {
    const { className } = this.props
    const { isloop } = this.state

    return (
      <ClickableComponent
        className={classNames(className, 'AutoPlayButton', {
          'on': isloop,
          'off': !isloop
        })}
        onClick={this.handleClick}
      >
      </ClickableComponent>
    )
  }
}

AutoPlayButton.propTypes = propTypes
AutoPlayButton.displayName = 'AutoPlayButton'
AutoPlayButton.defaultProps = defaultProps

export default AutoPlayButton