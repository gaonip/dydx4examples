Examples for the v4-Client Typescript client to place an order and query the dYdX chain.
For more information, on a step-by-step guide, check here: https://zinc-bongo-636.notion.site/DYDX-Orders-74952ac102584dfcbed8542cb9506b64?pvs=4

## Development

`v4-client-js` uses node `v18` for development. You can use `nvm` to manage different versions of node.

```
nvm install
nvm use
nvm alias default $(nvm version) # optional
```

You can run the following commands to ensure that you are running the correct `node` and `npm` versions.

```
node -v # expected: v18.x.x (should match .nvmrc)
npm -v  # expected: 8.x.x
```

## Quickstart

# 1. Clone or fork the examples repo

```
git clone git@github.com:gaonip/dydx4examples.git
```

# 2. Setup your mnemonic and define your orders

- Go to `/src/orderExample.ts` and fill out a mnemonic for testnet. Feel free to use `DYDX_TEST_MNEMONIC` from the official TS client library under `v4-client-js/examples/constants` for development purposes

- Now modify or add your orders in the `/src/human_readable_orders.json` file.

# 3a. Run the scripts with node

```
npm install
npm run build
```

You should now see a `/build` dir generated with JS files. We will use node to run these scripts

- Run the websocket first to see orders for a given subaccount

```
node build/websocketExample.js
```

- Open a separate terminal to run the example orders. The first order is a BTC limit sell order.
- The second order is an order that is not expected to be filed immediately, in that case the cancel order will cancel if not executed within 5 minutes.
- See example outputs in the `/output` dir

```
node build/orderExample.js
```

# 3b. Run the scripts with ts-node

Alternatively you can run directly with ts-node for development purpose.

```
npm install
npm install typescript ts-node
```

- Run the websocket first to see orders for a given subaccount

```
npx ts-node build/websocketExample.ts
```

- Open a separate terminal to run the example orders. The first order is a BTC limit sell order.
- The second order is an order that is not expected to be filed immediately, in that case the cancel order will cancel if not executed within 5 minutes.

```
npx ts-node build/orderExample.ts
```
