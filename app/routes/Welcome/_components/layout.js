import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
`;

export const VerticalCentered = styled.View`
  padding: ${({ paddingSize }) => paddingSize || '20px 40px'};
`;
