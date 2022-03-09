import React from 'react';
import PropTypes from 'prop-types';

import { SideMenuItem, SideMenuContent } from 'components';
import { H4 } from 'elements';

import { menus } from 'constants/mocha';

const SubMenuContent = ({}, { formatMessage, currentTheme }) => {
  const feedMenus = menus.feed;
  return (
    <SideMenuContent theme={currentTheme}>
      {feedMenus.map(item => (
        <SideMenuItem link={item.link} key={item.id}>
          <H4 align="left">{formatMessage(item.id)}</H4>
        </SideMenuItem>
      ))}
    </SideMenuContent>
  );
};

SubMenuContent.contextTypes = {
  formatMessage: PropTypes.func,
  currentTheme: PropTypes.shape()
};

export default SubMenuContent;
