import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SideMenuItem, SideMenuContent, Themes } from 'components';
import { H4 } from 'elements';

import { menus } from 'constants/mocha';

const ThemeItem = styled.View`
  padding: 15px 10px 10px 10px;
  background-color: transparent;
`;

const SubMenuContent = ({}, { formatMessage, currentTheme }) => {
  const profileMenus = menus.profile;
  return (
    <SideMenuContent theme={currentTheme}>
      {profileMenus.map(item => (
        <SideMenuItem link={item.link} key={item.id}>
          <H4 align="left">{formatMessage(`profile.menu.${item.id}`)}</H4>
        </SideMenuItem>
      ))}
      <ThemeItem>
        <H4 mt={15} align="center">
          {formatMessage('welcome.theme.displayText')}
        </H4>
        <Themes />
      </ThemeItem>
    </SideMenuContent>
  );
};

SubMenuContent.contextTypes = {
  formatMessage: PropTypes.func,
  currentTheme: PropTypes.shape()
};

export default SubMenuContent;
