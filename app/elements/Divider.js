import styled from 'styled-components';

const Divider = styled.View`
  border-bottom-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-bottom-width: 1.1px;
  margin: 0px;
  width: 100%;
`;

export default Divider;
