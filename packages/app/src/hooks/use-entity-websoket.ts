import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { getAuthStore, selectAuthToken } from 'store/slices/auth/authSlice';

const PING_INTERVAL = 10 * 1000;

const useEntityWebsoket = <WSData>(entityWS: string) => {
  const userToken = useAppSelector(selectAuthToken)?.access_token;
  const { tenant } = useAppSelector(getAuthStore);
  const [data, setData] = useState<WSData[]>([]);
  const isBrowser = typeof window !== 'undefined';
  const websocketURL = process.env.NEXT_PUBLIC_API_WEBSOCKET_URL;
  const [websocket, setWebsocket] = useState<null | WebSocket>(null);
  const [pingInterval, setPingInterval] = useState<NodeJS.Timeout | null>(null);

  const closeWebsocket = useCallback((): void => {
    pingInterval && clearInterval(pingInterval);
    console.log({ status: 'try close', condition: websocket && websocket.readyState === (0 || 1) });

    if (websocket && websocket.readyState === (0 || 1)) {
      websocket.send(`UNSUBSCRIBE /${entityWS}`);
      websocket.close();

      console.log(`UNSUBSCRIBE /${entityWS}`);
    }
  }, [entityWS, pingInterval, websocket]);

  useEffect(() => {
    if (websocketURL && isBrowser && !websocket && userToken) {
      const ws = new WebSocket(`${websocketURL}websocket?tenant=${tenant}&token=${userToken}`);

      ws.addEventListener('open', () => {
        ws.send(`SUBSCRIBE /${entityWS}`);
        console.log(`SUBSCRIBE /${entityWS}`);
      });

      ws.addEventListener('message', (event) => {
        const isPong = event.data.match(/PONG/i);

        if (!isPong) {
          const WSmessage = JSON.parse(event.data || JSON.stringify(''));
          setData([...data, WSmessage]);
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
  }, [isBrowser, websocket, websocketURL, userToken, tenant, pingInterval, entityWS]);

  return data;
};

export default useEntityWebsoket;
