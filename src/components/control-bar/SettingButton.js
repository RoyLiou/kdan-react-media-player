import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames'

import PopupButton from '../popup/PopupButton';
import SettingBar from '../setting-control/SettingBar'

import MobileDetect from 'mobile-detect';

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

class SettingButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
      os: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount () {
    const md = new MobileDetect(window.navigator.userAgent);
    this.setState({
      os: md.os()
    })
  }

  handleClick() {
    this.setState({
      active: !this.state.active,
    });
  }

  handleBlur() {
    this.setState({
      active: false,
    });
  }

  render () {
    const { player, className } = this.props

    return (
      this.state.os !== 'iOS' && this.state.os !== 'AndroidOS' ?
      <PopupButton
        className={classNames(className, {
          'video-react-setting-active': this.state.active,
          'video-react-lock-showing': this.state.active,
        },'video-react-setting-button')}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        inline={false}>
        <SettingBar 
          {...this.props}
        />
      </PopupButton> : ''
    )
  }
}

SettingButton.propTypes = propTypes;
SettingButton.displayName = 'SettingButton';

export default SettingButton;