"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Transport, Chain } from "viem";
import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";


const crossfiChain: Chain = {
  id: 4157,
  name: 'CrossFi Blockchain',
  nativeCurrency: {
    name: 'XFI',
    symbol: 'XFI',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.ms'],
    },
  },
  blockExplorers: {
    default: { name: 'XFI Explorer', url: 'https://test.xfiscan.com' },
  },
  testnet: true,
};

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables.",
  );
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        // walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "TokenTreat", projectId: walletConnectProjectId },
);

// Fix missing icons

const transports: Record<number, Transport> = {
  [crossfiChain.id]: http(),
};

console.log(baseSepolia);
export const wagmiConfig = createConfig({
  chains: [crossfiChain],
  connectors,
  transports,
  ssr: true,
});
