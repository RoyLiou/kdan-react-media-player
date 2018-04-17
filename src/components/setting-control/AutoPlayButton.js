import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import ClickableComponent from '../ClickableComponent';

const propTypes = {
  actions: PropTypes.object,
  className: PropTypes.string,
};

class AutoPlayButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
      isloop: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { actions, } = this.props;
    const { isloop, } = this.state;
    
    actions.loop()
    this.setState({
      isloop: !isloop,
    });
  }

  render () {
    const { className, } = this.props;
    const { isloop, } = this.state;

    return (
      <ClickableComponent
        className={classNames(className, 'AutoPlayButton', {
          'on': isloop,
          'off': !isloop
        })}
        onClick={this.handleClick}
      >
      </ClickableComponent>
    );
  }
}

AutoPlayButton.propTypes = propTypes;
AutoPlayButton.displayName = 'AutoPlayButton';

export default AutoPlayButton;