export const withForwardProps = (props: string[]) => {
  return {
    shouldForwardProp: (prop: unknown) => !props.includes(prop as string),
  };
};
