import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListWrapper = styled.View`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-width: 1;
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-style: solid;
  border-radius: 20;
  overflow: hidden;
`;

ListWrapper.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

ListWrapper.defaultProps = {
  width: '100%',
  height: 300
};

export default ListWrapper;
