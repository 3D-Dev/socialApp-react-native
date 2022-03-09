import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontFamilies, fontSizes } from 'constants/fonts';

const Text = styled.Text`
  font-family: ${props => {
    if (props.bolder) {
      return fontFamilies.Bolder;
    }
    if (props.bold) {
      return fontFamilies.Bold;
    }
    if (props.semiBold) {
      return fontFamilies.SemiBold;
    }
    if (props.italic) {
      return fontFamilies.Italic;
    }
    return fontFamilies.Regular;
  }};

  font-size: ${({ fontSize }) => fontSize};
  color: ${props => props.color || props.theme.COLORS.PRIMARY};

  flex-shrink: 1;

  text-align: ${({ align }) => align};

  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ underline, theme }) =>
    underline &&
    `
    text-decoration: underline;
    text-decoration-color: ${theme.COLORS.PRIMARY}
  `};

  background-color: ${({ background }) => background};
  margin-bottom: ${({ mb }) => mb};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};
`;

Text.propTypes = {
  bolder: PropTypes.bool,
  bold: PropTypes.bool,
  semiBold: PropTypes.bool,
  fontSize: PropTypes.number,
  padding: PropTypes.string,
  align: PropTypes.string,
  underline: PropTypes.bool,
  background: PropTypes.string,
  mb: PropTypes.number,
  mt: PropTypes.number,
  mr: PropTypes.number,
  ml: PropTypes.number
};

Text.defaultProps = {
  bolder: false,
  bold: false,
  semiBold: false,
  fontSize: fontSizes.normal,
  padding: '0',
  align: 'center',
  underline: false,
  background: 'transparent',
  mb: 5,
  mt: 0,
  mr: 0,
  ml: 0
};

export default Text;
