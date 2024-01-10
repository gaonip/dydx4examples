import {
  Network,
  CompositeClient,
  BECH32_PREFIX,
  LocalWallet,
  OrderFlags,
  SubaccountClient,
  OrderSide,
  OrderType,
  OrderExecution,
  OrderTimeInForce,
} from '@dydxprotocol/v4-client-js';

import ordersParams from './human_readable_orders.json';

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function test(): Promise<void> {

  const client = await CompositeClient.connect(Network.testnet());
  console.log('**Client**');
  console.log(client);

  // Set mnemonic here
  const mnemonic = 'mirror actor skill push coach wait confirm orchard lunch mobile athlete gossip awake miracle matter bus reopen team ladder lazy list timber render wait';
  const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
  console.log(wallet);

  const subaccount = new SubaccountClient(wallet, 0);

  for (const orderParams of ordersParams) {

    const clientId = 123; // set to a number, can be used by the client to identify the order
    const market = orderParams.market ?? 'BTC-USD';
    const type = OrderType[orderParams.type as keyof typeof OrderType]; // order type
    const side = OrderSide[orderParams.side as keyof typeof OrderSide]; // side of the order
    // TimeInForce indicates how long an order will remain active before it is executed or expires
    const timeInForce = OrderTimeInForce[orderParams.timeInForce as keyof typeof OrderTimeInForce];
    const timeInForceSeconds = (timeInForce === OrderTimeInForce.GTT) ? 60 : 0;
    const execution = OrderExecution.DEFAULT;
    const price = orderParams.price ?? 10000;
    const size = orderParams.size ?? 0.01;
    const postOnly = orderParams.postOnly ?? false; // If true, order is post only
    const reduceOnly = orderParams.reduceOnly ?? false; // if true, the order will only reduce size

    try {
      const tx = await client.placeOrder(
        subaccount,
        market,
        type,
        side,
        price,
        size,
        clientId,
        timeInForce,
        timeInForceSeconds,
        execution,
        postOnly,
        reduceOnly,
      );
      console.log('**Order Tx**');
      console.log(tx);
    } catch (error) {
      console.log(error.message);
    }

    await sleep(5000);  // wait for placeOrder to complete

    const goodTillTimeInSeconds = 300;
    const orderFlags = OrderFlags.LONG_TERM;
    const goodTillBlock = 0;

    try {
      const tx = await client.cancelOrder(
        subaccount,
        clientId,
        orderFlags,
        market,
        goodTillBlock,
        goodTillTimeInSeconds,
      );
      console.log('**Cancel Order Tx**');
      console.log(tx);

    } catch (error) {
      console.log(error.message);
    }
  }
}

test().then(() => {
}).catch((error) => {
  console.log(error.message);
});
