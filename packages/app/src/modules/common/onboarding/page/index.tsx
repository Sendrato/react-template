import { useEntityWebsoket } from 'hooks';
import DashboardLayout from 'layouts/DashboardLayout';
import { ReactElement, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { getAuthStore, getUserEmail } from 'store/slices/auth/authSlice';

import PageHeader from '@components/common/PageHeader';
import { PageTitle } from '@components/styled-mui';

interface IChat {
  FormattedTimestamp: string;
  Id: number;
  Message: string;
  Recipient: string;
  Sender: string;
  Timestamp: string;
}

interface IChatWsMessage {
  Chat: IChat;
  _mete_: unknown;
}

const OnboardingPage = () => {
  const email = useAppSelector(getUserEmail);
  const { tenant, token } = useAppSelector(getAuthStore);
  const [messages, setMessages] = useState<IChat[]>([]);
  const websocketURL =
    token && tenant
      ? `${process.env.NEXT_PUBLIC_API_WEBSOCKET_URL}websocket?tenant=${tenant}&token=${token?.access_token}`
      : null;

  const saveWsMessages = (value: IChatWsMessage) => {
    setMessages((prev) => [...prev, value.Chat]);
  };

  useEntityWebsoket<IChatWsMessage>({
    websocketURL,
    entity: `common/backoffice/chat/Chat?Recipient=${email}`,
    handleWsMessage: saveWsMessages,
  });

  console.log(messages);

  return (
    <>
      <PageHeader withRecord>
        <PageTitle variant="h4">Onboarding</PageTitle>
      </PageHeader>
    </>
  );
};

OnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default OnboardingPage;
