import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';

const Overlay = styled(LinearGradient)`
  position: absolute;
  height: ${({ height }) => height};
  width: 100%;
  ${({ type }) => type}: 0;
  border-radius: 20;
`;

Overlay.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['top', 'bottom'])
};

Overlay.defaultProps = {
  height: '30%',
  type: 'top'
};

export default Overlay;
