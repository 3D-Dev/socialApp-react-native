import React from 'react';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Col, Grid } from 'react-native-easy-grid';
import styled from 'styled-components';

import { Text } from 'elements';
import { ClearLocalData } from 'components';
import pages from 'constants/pages';

import App from 'components/App';
import themes from 'constants/themes';

const Container = styled.View`
  flex: 1;
  padding-horizontal: 50;
  padding-vertical: 50;
`;

const GridWrap = styled(Grid)`
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

const LinkWrapper = styled.TouchableOpacity`
  padding: 10px;
  width: 100%;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 5px;
`;

const LinkText = styled.Text`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-size: 20;
`;

const PaletteWrapper = styled(Col)`
  height: 40;
  width: 45%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 7;
  margin-top: 15;
  ${({ active }) => active && 'border-width: 2;'}
`;

const PaletteButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Palette = styled.Text`
  color: ${({ color }) => color};
  ${({ active }) => active && 'font-weight: bold; font-size: 16;'}
`;

const palettes = Object.keys(themes).map(key => ({ key, theme: themes[key] }));

const MainList = ({}, { formatMessage, appSettings, setAppSettings }) => {
  const themeKey = appSettings.theme;
  return (
    <App hasHeader={false} hasFooter={false}>
      <ClearLocalData title="users" />
      <ClearLocalData title="networks" />
      <ClearLocalData title="contacts" />
      <ClearLocalData title="reflections" />
      <ClearLocalData title="reflection" />
      <ClearLocalData title="feedbacks" />
      <Container>
        <Text>This is the temporary page to list all other pages</Text>
        {pages.map(page => (
          <LinkWrapper key={page.key} onPress={() => Actions[page.key]()}>
            <LinkText underline>{formatMessage(`${page.key}.title`)}</LinkText>
          </LinkWrapper>
        ))}
        <Text>Following are themes you can switch</Text>
        <GridWrap>
          {palettes.map(({ key, theme }) => (
            <PaletteWrapper
              key={key}
              backgroundColor={theme.COLORS.PRIMARY_BG}
              active={themeKey === key}
            >
              <PaletteButton
                onPress={() => {
                  setAppSettings({
                    ...appSettings,
                    theme: key
                  });
                }}
              >
                <Palette color={theme.COLORS.PRIMARY} active={themeKey === key}>
                  {formatMessage(`themes.${key}`)}
                </Palette>
              </PaletteButton>
            </PaletteWrapper>
          ))}
        </GridWrap>
      </Container>
    </App>
  );
};

MainList.contextTypes = {
  formatMessage: PropTypes.func,
  appSettings: PropTypes.shape(),
  setAppSettings: PropTypes.func
};

export default MainList;
