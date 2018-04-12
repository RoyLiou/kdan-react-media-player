import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames'

import PopupButton from '../popup/PopupButton';
import SettingBar from '../setting-control/SettingBar'

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

class SettingButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {

  }

  handleFocus() {
    this.setState({
      active: true,
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
      <PopupButton
        className={classNames(className, {
          'video-react-setting-active': this.state.active,
          'video-react-lock-showing': this.state.active,
        },'video-react-setting-button')}
        onClick={this.handleClick}
        inline={false}>
        <SettingBar 
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...this.props}
        />
      </PopupButton>
    )
  }
}

SettingButton.propTypes = propTypes;
SettingButton.displayName = 'SettingButton';

export default SettingButton;