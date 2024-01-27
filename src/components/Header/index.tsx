import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    //  className="flex flex-col items-center w-full px-4 pt-5"
    <header className="container flex flex-row justify-between">
      <h1 className="text-4xl text-white text-center font-semibold cursor-pointer select-none">
        Mixer
      </h1>

      {/* 放置全局头部内容 */}
      <div className="flex text-white items-center">
        <ConnectButton showBalance></ConnectButton>
      </div>
    </header>
  );
};
