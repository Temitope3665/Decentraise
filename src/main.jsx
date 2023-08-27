/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "@rainbow-me/rainbowkit/styles.css";

import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { avalancheFuji, avalanche, goerli } from "wagmi/chains";

const { chains, publicClient } = configureChains(
  [avalancheFuji, avalanche, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Decentraise",
  projectId: `${process.env.VITE_REACT_APP_CLOUDINARY_PRESET}`,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
