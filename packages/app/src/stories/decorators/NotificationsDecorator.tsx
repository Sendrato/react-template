/* eslint-disable react/display-name */
import {
  initialState,
  INotificationsContext,
  NotificationsContext,
} from 'contexts/NotificationsContext';

export const notificationsDecorator = (value: Partial<INotificationsContext>) => {
  const context = {
    ...initialState,
    ...value,
  } as INotificationsContext;

  return (story: any) => (
    <NotificationsContext.Provider value={context}>{story()}</NotificationsContext.Provider>
  );
};
