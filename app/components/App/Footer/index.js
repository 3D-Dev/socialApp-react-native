import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import { Grid, Col } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';
import { get as lodashGet } from 'lodash';

import { getSelector } from 'redux/selectors';
import { PlusSVG, UsersSVG, UserSolidSVG } from 'elements/icons';

import GradientBGWrapper from '../../GradientBGWrapper';
import NavItem from './NavItem';

const footerItems = [
  { key: 'feed', icon: UsersSVG },
  { key: 'add', icon: PlusSVG },
  { key: 'profile', icon: UserSolidSVG }
];

const FooterWrapper = styled.View`
  width: 100%;
  height: ${({ isIphoneX }) => (isIphoneX ? 80 : 65)};
  background-color: ${({ theme }) => theme.COLORS.NAVBAR_BG || 'transparent'};
`;

const NavItemWrapper = styled(Col)`
  align-items: center;
  justify-content: center;
`;

const Footer = (
  { sceneKey, isIphoneX },
  { formatMessage, currentTheme, profileData }
) => {
  // console.log('====>profileData', profileData);
  const FooterContents = (
    <FooterWrapper isIphoneX={isIphoneX}>
      <Grid>
        {footerItems.map(({ key, icon }) => (
          <NavItemWrapper
            key={key}
            onPress={() => {
              if (key === 'feed') {
                const token = lodashGet(global.localStorage, 'tokenInfo.token');
                if (token === undefined) {
                  Actions['auth.signup']();
                } else if (!profileData.name || !profileData.user_id) {
                  Actions['auth.profile']({
                    requireComplete: true
                  });
                } else {
                  Actions.reset('feed');
                }
              } else {
                Actions.reset(key);
              }
            }}
          >
            <NavItem
              isIphoneX={isIphoneX}
              Icon={icon}
              active={sceneKey.startsWith(key)}
              label={formatMessage(`footer.${key}`)}
            />
          </NavItemWrapper>
        ))}
      </Grid>
    </FooterWrapper>
  );
  if (currentTheme.COLORS.NAVBAR_BG) {
    return FooterContents;
  }
  return <GradientBGWrapper>{FooterContents}</GradientBGWrapper>;
};

Footer.propTypes = {
  sceneKey: PropTypes.string,
  isIphoneX: PropTypes.bool
};

Footer.defaultProps = {
  sceneKey: '',
  isIphoneX: false
};

Footer.contextTypes = {
  formatMessage: PropTypes.func.isRequired,
  currentTheme: PropTypes.shape(),
  profileData: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  sceneKey: getSelector('ui', 'sceneKey')(state)
});

export default compose(
  setDisplayName('Footer'),
  connect(mapStateToProps)
)(Footer);
