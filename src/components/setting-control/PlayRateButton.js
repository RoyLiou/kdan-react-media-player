import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import ClickableComponent from '../ClickableComponent';

const propTypes = {
  playbackRate: PropTypes.number,
  clickCallback: PropTypes.func
}

const defaultProps = {
  playbackRate: 1
}

class PlayRateButton extends Component {
  constructor (props, content) {
    super(props, content)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.clickCallback(true)
  }

  render () {
    const { player } = this.props

    const displayRate = () => {
      if (player) {
        switch (player.playbackRate) {
          case 1:
            return 'Normal';
            break;
          default:
            return `${player.playbackRate}x`;
        }
      }
      return 'Normal';
    }

    return (
      <ClickableComponent
        className={classNames('PlayRateButton')}
        onClick={this.handleClick}
      >{displayRate()}</ClickableComponent>
    )
  }
}

PlayRateButton.propTypes = propTypes
PlayRateButton.displayName = 'PlayRateButton'
PlayRateButton.defaultProps = defaultProps

export default PlayRateButton