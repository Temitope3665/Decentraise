/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './app';
import '@rainbow-me/rainbowkit/styles.css';

import { publicProvider } from 'wagmi/providers/public';
import { WagmiConfig, configureChains, createConfig, } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  optimism,
  goerli,
  arbitrum, arbitrumGoerli, arbitrumNova,
  bscTestnet,
} from 'wagmi/chains';

const { chains, publicClient } = configureChains(
  [mainnet, optimism, goerli, bscTestnet, arbitrum, arbitrumGoerli, arbitrumNova],
  [publicProvider()]
);


const { connectors } = getDefaultWallets({
  appName: 'Decentraise',
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>,
)
