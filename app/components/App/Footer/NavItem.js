import React from 'react';
import PropTypes from 'prop-types';

import { H6, H5 } from 'elements';

const NavItem = ({ Icon, active, label, isIphoneX }, { currentTheme }) => {
  return (
    <>
      <Icon size={active ? 35 : 28} color={currentTheme.COLORS.NAVBAR} />
      {active ? (
        <H5 mb={isIphoneX ? 7 : 0} color={currentTheme.COLORS.NAVBAR} bolder>
          {label}
        </H5>
      ) : (
        <H6 mb={isIphoneX ? 7 : 0} color={currentTheme.COLORS.NAVBAR}>
          {label}
        </H6>
      )}
    </>
  );
};

NavItem.propTypes = {
  active: PropTypes.bool,
  Icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isIphoneX: PropTypes.bool
};

NavItem.defaultProps = {
  active: false,
  isIphoneX: false
};

NavItem.contextTypes = {
  currentTheme: PropTypes.shape({
    COLORS: PropTypes.shape({
      NAVBAR: PropTypes.string
    })
  })
};

export default NavItem;
