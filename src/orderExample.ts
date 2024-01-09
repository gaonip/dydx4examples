import {
  Network,
  ValidatorClient,
  BECH32_PREFIX,
  LocalWallet,
  OrderFlags,
  SubaccountClient,
  Order_Side,
  Order_TimeInForce,
} from '@dydxprotocol/v4-client-js';
import Long from 'long';

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function test(): Promise<void> {

  const client = await ValidatorClient.connect(Network.testnet().validatorConfig);
  console.log('**Client**');
  console.log(client);

  const mnemonic = 'mirror actor skill push coach wait confirm orchard lunch mobile athlete gossip awake miracle matter bus reopen team ladder lazy list timber render wait';
  const wallet = await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX);
  console.log(wallet);

  const subaccount = new SubaccountClient(wallet, 0);
  const clientId = 123; // set to a number, can be used by the client to identify the order
  const clobPairId = 0; // perpertual market id
  const side = Order_Side.SIDE_BUY; // side of the order
  const quantums = Long.fromNumber(10_000_000); // quantums are calculated by the size if the order
  // subticks are calculated by the price of the order
  const subticks = Long.fromNumber(40_000_000_000);
  // TimeInForce indicates how long an order will remain active before it is executed or expires
  const timeInForce = Order_TimeInForce.TIME_IN_FORCE_UNSPECIFIED;
  const orderFlags = OrderFlags.LONG_TERM; // either SHORT_TERM, LONG_TERM or CONDITIONAL
  const reduceOnly = false; // if true, the order will only reduce the position size
  // const height = await client.get.latestBlockHeight();
  // const goodTilBlock = height + 3;
  const now = new Date();
  const millisecondsPerSecond = 1000;
  const interval = 60 * millisecondsPerSecond;
  const future = new Date(now.valueOf() + interval);
  const goodTilBlockTime = Math.round(future.getTime() / 1000);

  try {
    const tx = await client.post.placeOrder(
      subaccount,
      clientId,
      clobPairId,
      side,
      quantums,
      subticks,
      timeInForce,
      orderFlags,
      reduceOnly,
      undefined,
      goodTilBlockTime,
    );
    console.log('**Order Tx**');
    console.log(tx);
  } catch (error) {
    console.log(error.message);
  }

  await sleep(5000);  // wait for placeOrder to complete

}

test().then(() => {
}).catch((error) => {
  console.log(error.message);
});
