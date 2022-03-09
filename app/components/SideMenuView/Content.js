import { ScrollView } from 'react-native';
import styled from 'styled-components';

const Content = styled(ScrollView)`
  background-color: ${props => props.theme.COLORS.PRIMARY_BG};
  border: 0.8px solid ${props => props.theme.COLORS.BORDER};
`;

export default Content;
