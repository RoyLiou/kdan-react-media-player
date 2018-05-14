import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
  player: PropTypes.object,
  className: PropTypes.string
};

export default function Warning({ player, className }) {
  if (!player.error) {
    return null
  }

  return (
    <div
      className={classNames(
        'video-react-warning',
        className
      )}
    >
      <p className={classNames('warning-label')}>{player.error}</p>
    </div>
  );
}

Warning.propTypes = propTypes;
Warning.displayName = 'Warning';
