/* eslint-disable react/display-name */
import { AuthContext, IAuthContext, initialValues } from 'contexts/AuthContext';

export const authDecorator = (value: Partial<IAuthContext>) => {
  const context = {
    ...initialValues,
    ...value,
  } as IAuthContext;

  return (story: any) => <AuthContext.Provider value={context}>{story()}</AuthContext.Provider>;
};
