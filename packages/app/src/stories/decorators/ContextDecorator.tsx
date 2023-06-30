import ContextProvider from 'contexts';

export const ContextDecorator = (story: any) => <ContextProvider>{story()}</ContextProvider>;
