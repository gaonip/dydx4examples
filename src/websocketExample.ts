import { Network } from '@dydxprotocol/v4-client-js';
import { IncomingMessageTypes, SocketClient } from '@dydxprotocol/v4-client-js/build/src/clients/socket-client';

function test(): void {
  const mySocket = new SocketClient(
    Network.testnet().indexerConfig,
    () => {
      console.log('socket opened');
    },
    () => {
      console.log('socket closed');
    },
    (message) => {
      console.log(message);
      if (typeof message.data === 'string') {
        const jsonString = message.data as string;
        try {
          const data = JSON.parse(jsonString);
          if (data.type === IncomingMessageTypes.CONNECTED) {
            // mySocket.subscribeToMarkets(); // Check market prices
            mySocket.subscribeToSubaccount('dydx14zzueazeh0hj67cghhf9jypslcf9sh2n5k6art', 0);
            console.log(data);
          }
        } catch (e) {
          console.error('Error parsing JSON message:', e);
        }
      }
    },
  );
  mySocket.connect();
}

test();
