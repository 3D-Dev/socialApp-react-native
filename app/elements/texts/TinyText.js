import styled from 'styled-components';
import normalizeFont from 'utils/normalizeFont';

import { fontSizes } from 'constants/fonts';
import Text from './Text';

export default styled(Text)`
  font-size: ${normalizeFont(fontSizes.tiny)};
`;
