"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  useConnect,
  useWalletClient,
  sepolia,
} from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";

const avalanche = {
  id: 11822,
  name: "Artela",
  network: "artela",
  // iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Artela",
    symbol: "ART",
  },
  rpcUrls: {
    public: { http: ["https://betanet-rpc2.artela.network"] },
    default: { http: ["https://betanet-rpc2.artela.network"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  contracts: {
    multicall3: {
      address: "0xd3F51f2Dff074a6A49e64B38b3946E91f677965b",
    },
  },
  testnet: false,
};

const { chains, publicClient } = configureChains(
  [avalanche],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Mixer",
  projectId: "1ccec3ccb174cbc68532d4cb04e5efae",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              accentColor: "#7b3fe4",
              accentColorForeground: "white",
              borderRadius: "medium",
            })}
          >
            {/* Your App */}
            <div className="flex flex-col w-full items-center py-5 px-4">
              <Header></Header>
              {children}
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
