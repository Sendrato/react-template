import styled from 'styled-components';
import { withForwardProps } from 'utils';

type ContainerProps = { direction?: string };
const props = ['direction'];

export const TableTitleContainer = styled.div.withConfig(withForwardProps(props))<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  flex-direction: ${({ direction }) => direction || 'row'};
`;
