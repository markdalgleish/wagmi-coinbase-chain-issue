import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          To see the issue, switch to Polygon and then refresh the page.
        </div>
        <div>Chain ID: {chain?.id}</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => switchNetwork?.(1)}>
            Switch to mainnet (1)
          </button>
          <button onClick={() => switchNetwork?.(137)}>
            Switch to Polygon (137)
          </button>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          Connect with {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { chain } = useNetwork();

  return (
    <div style={{ padding: 12 }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {mounted ? <Profile /> : null}
    </div>
  );
};

export default Home;