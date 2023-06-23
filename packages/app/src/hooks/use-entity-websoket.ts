import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { getAuthStore } from 'store/slices/auth/authSlice';

const PING_INTERVAL = 10 * 1000;

interface IProps<WSData> {
  entity: string;
  handleWsMessage: (value: WSData) => void;
}

type Response = [WebSocket | null];

const useEntityWebsoket = <WSData>({ entity, handleWsMessage }: IProps<WSData>): Response => {
  const isBrowser = typeof window !== 'undefined';
  const [websocket, setWebsocket] = useState<null | WebSocket>(null);
  const [pingInterval, setPingInterval] = useState<NodeJS.Timeout | null>(null);
  const { tenant, token } = useAppSelector(getAuthStore);
  const websocketURL =
    token && tenant
      ? `${process.env.NEXT_PUBLIC_API_WEBSOCKET_URL}websocket?tenant=${tenant}&token=${token?.access_token}`
      : null;

  const closeWebsocket = useCallback((): void => {
    pingInterval && clearInterval(pingInterval);

    if (websocket && websocket.readyState === (0 || 1)) {
      websocket.send(`UNSUBSCRIBE /${entity}`);
      websocket.close();
    }
  }, [entity, pingInterval, websocket]);

  useEffect(() => {
    if (websocketURL && isBrowser && !websocket) {
      const ws = new WebSocket(websocketURL);

      ws.addEventListener('open', () => {
        ws.send(`SUBSCRIBE /${entity}`);
      });

      ws.addEventListener('message', (event) => {
        const isPong = event.data.match(/PONG/i);

        if (!isPong) {
          const WSmessage = JSON.parse(event.data || JSON.stringify(''));
          handleWsMessage(WSmessage);
        }
      });

      ws.addEventListener('close', () => {
        setWebsocket(null);
        pingInterval && clearInterval(pingInterval);
        setPingInterval(null);
      });

      const ping = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send('PING');
        }
      }, PING_INTERVAL);

      setPingInterval(ping);

      setWebsocket(ws);
    }

    return closeWebsocket;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser, websocket, websocketURL, pingInterval, entity]);

  return [websocket];
};

export default useEntityWebsoket;
