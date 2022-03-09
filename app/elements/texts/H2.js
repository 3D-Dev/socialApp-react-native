import styled from 'styled-components';

import { fontSizes } from 'constants/fonts';
import normalizeFont from 'utils/normalizeFont';

import Text from './Text';

export default styled(Text)`
  font-size: ${normalizeFont(fontSizes.h2)};
`;
