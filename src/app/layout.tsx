"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

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
