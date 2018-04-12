import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'

import Menu from '../menu/Menu'
import MenuItem from '../menu/MenuItem'

const propTypes = {
  player: PropTypes.object,
  actions: PropTypes.object,
  rates: PropTypes.array,
  showRateMenu: PropTypes.bool,
  clickCallback: PropTypes.func
}

const defaultProps = {
  rates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
};

class PlayRateMenu extends Component {
  constructor (props, content) {
    super(props, content)

    this.state = {
      activateIndex: 0
    }

    this.handleIndexChange = this.handleIndexChange.bind(this)
    this.handleSelectItem = this.handleSelectItem.bind(this)
    this.commitSelection = this.commitSelection.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { showRateMenu, player, rates } = this.props;
    
    if (nextProps.player !== player) {
      const selectedIndex = rates.indexOf(nextProps.player.playbackRate) || 0;
      
      this.setState({
        activateIndex: selectedIndex
      });
    }
  }

  commitSelection(index) {
    this.setState({
      activateIndex: index
    });
    this.handleIndexChange(index);
    this.handleClose()
  }

  handleIndexChange(index) {
    const { rates, actions } = this.props;
    if (index >= 0 && index < rates.length) {
      actions.changeRate(rates[index]);
    }
  }

  handleSelectItem(i) {
    this.commitSelection(i);
  }

  handleClose () {
    this.props.clickCallback(false)
  }

  render () {
    const { className, showRateMenu, player, rates } = this.props
    const items = rates.map(rate => (
      {
        label: `${rate === 1 ? 'Normal' : rate + 'x'}`,
        value: rate,
      }
    ));

    return (
      <div
        className={classNames(className, {
          'video-react-rate-menu-active': showRateMenu
        }, 'video-react-rate-menu')}
      >
        <Menu>
          <li 
            className={classNames(
              'video-react-menu-item', 
              'video-react-icon-left-mark', 
              'title'
            )}
            onClick={this.handleClose}
            > Speed</li>
          {items.map((item, i) => (
            <MenuItem
              item={item}
              index={i}
              onSelectItem={this.handleSelectItem}
              activateIndex={this.state.activateIndex}
              key={`item-${i++}`}
            />
          ))}
        </Menu>
      </div>
    )
  }
}

PlayRateMenu.propTypes = propTypes
PlayRateMenu.displayName = 'PlayRateMenu'
PlayRateMenu.defaultProps = defaultProps

export default PlayRateMenu