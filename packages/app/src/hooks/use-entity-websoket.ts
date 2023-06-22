import { useCallback, useEffect, useState } from 'react';

const PING_INTERVAL = 10 * 1000;

interface IProps<WSData> {
  websocketURL: string | null;
  entity: string;
  handleWsMessage: (value: WSData) => void;
  closeAfterUnmount?: boolean;
}

type Response = [WebSocket | null, () => void];

const useEntityWebsoket = <WSData>({
  websocketURL,
  entity,
  handleWsMessage,
  closeAfterUnmount = true,
}: IProps<WSData>): Response => {
  const isBrowser = typeof window !== 'undefined';
  const [websocket, setWebsocket] = useState<null | WebSocket>(null);
  const [pingInterval, setPingInterval] = useState<NodeJS.Timeout | null>(null);

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

    return closeAfterUnmount ? closeWebsocket : () => null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser, websocket, websocketURL, pingInterval, entity]);

  return [websocket, closeWebsocket];
};

export default useEntityWebsoket;
