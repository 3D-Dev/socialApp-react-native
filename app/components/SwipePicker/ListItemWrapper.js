import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListItemWrapper = styled.TouchableOpacity`  
  justify-content: space-between;
  flex-direction: row;
  margin: ${({ isForSentence }) => (isForSentence ? '0px 5px' : '0px 20px')};
  ${({ isForSentence, bColor }) =>
    isForSentence && `border: 1px solid ${bColor};`}
  border-radius: 5;
  ${({ isForSentence }) => isForSentence && 'padding: 5px;'}
  ${({ isForSentence }) => !isForSentence && 'width: 100%;'}  
  height: ${({ height, isForSentence }) =>
    isForSentence ? height + 10 : height};
      
`;

ListItemWrapper.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isForSentence: PropTypes.bool,
  bColor: PropTypes.string
};

ListItemWrapper.defaultProps = {
  height: 30,
  isForSentence: PropTypes.bool,
  bColor: PropTypes.string
};

export default ListItemWrapper;
