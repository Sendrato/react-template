import styled from 'styled-components';

const BaseButton = styled.a`
  display: inline-block;
  box-sizing: border-box;
  padding: 18px 64px;
  border: 1px solid ${(props) => props.theme.colors.main};
  border-radius: 5px;
  transition: 0.3s all;
  cursor: pointer;
  outline: none;

  &:active,
  &:focus {
    opacity: 0.8;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.white};

  &:hover {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.main};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.main};

  &:hover {
    background: ${(props) => props.theme.colors.main};
    color: ${(props) => props.theme.colors.white};
  }
`;
