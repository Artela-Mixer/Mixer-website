export const Timer = () => {
  return (
    <div className=" bg-slate-50 h-full p-5">
      <div>
        <p className="text-4xl">Withdraw:</p>
      </div>
      <div className="flex items-center justify-center h-full">
        <input className="border rounded text-5xl h-[76px] w-full transition-all focus:border-black outline-none p-5 mr-4"></input>
        <button className="border border-gray hover:bg-gray-300 hover:border-black transition-all w-4/6 p-2 text-2xl rounded border-black">Withdraw</button>
      </div>
    </div>
  );
};
