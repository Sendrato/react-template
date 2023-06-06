import styled from 'styled-components';

export const TableTitleContainer = styled.div<{
  $direction?: 'row' | 'column';
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  flex-direction: ${({ $direction }) => $direction || 'row'};
`;
