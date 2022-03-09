import styled from 'styled-components';

export const SceneContainer = styled.View`
  padding: 20px 15px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;

export const UserListWrapper = styled.View`
  width: 330px;
  max-height: 400px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 10px;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FullWidthFlatList = styled.FlatList`
  width: 100%;
`;
