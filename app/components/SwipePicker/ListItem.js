import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text } from 'elements';

const ListItem = styled(Text)`
  height: ${({ height }) => height};
`;

ListItem.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

ListItem.defaultProps = {
  height: 50
};

export default ListItem;
