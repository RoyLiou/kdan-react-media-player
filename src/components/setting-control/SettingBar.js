import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import PlayRateButton from './PlayRateButton'
import AutoPlayButton from './AutoPlayButton'
import PlayRateMenu from './PlayRateMenu'

const propTypes = {
  className: PropTypes.string,
  actions: PropTypes.object,
};

class SettingBar extends Component {
  constructor (props, content) {
    super(props, content)
    
    this.state = {
      showRateMenu: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(isDisplayed) {
    this.setState({
      showRateMenu: isDisplayed
    })
  }

  render () {
    const { showRateMenu } = this.state

    return (
      <div>
        <div className={classNames('item-wrapper', {
          'hidden': showRateMenu
        })}>
          <span className={classNames('rate-label')}>Speed</span>
          <PlayRateButton 
            clickCallback={this.handleClick}
            {...this.props}
          />
        </div>
        <div className={classNames('item-wrapper', {
          'hidden': showRateMenu
        })}>
          <span>Auto Play</span>
          <AutoPlayButton 
            {...this.props}
          />
        </div>
        <PlayRateMenu
          showRateMenu={showRateMenu}
          clickCallback={this.handleClick}
          {...this.props}
        />
      </div>
    )
  }
}

SettingBar.propTypes = propTypes;
SettingBar.displayName = 'SettingBar';

export default SettingBar;