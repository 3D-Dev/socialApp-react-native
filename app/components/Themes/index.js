import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid } from 'react-native-easy-grid';
import styled from 'styled-components';

import themes from 'constants/themes';

const GridWrap = styled(Grid)`
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin: 0px auto 0px auto;
  max-width: 280px;
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

const Themes = ({}, { formatMessage, appSettings, setAppSettings }) => {
  const themeKey = appSettings.theme;
  return (
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
  );
};

Themes.contextTypes = {
  formatMessage: PropTypes.func,
  appSettings: PropTypes.shape(),
  setAppSettings: PropTypes.func
};

export default Themes;
