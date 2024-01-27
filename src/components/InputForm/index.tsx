import { Step } from "../Step"

export const InputForm = () => {
    return (
        <div className=" bg-slate-50 h-full">
            <form className="h-full flex flex-col justify-around p-5">
              <div style={{ borderBottom:'1px solid black'}}></div>
              <div className="flex flex-col p-4 gap-10">
                <div>
                  <p>Address:</p>
                  <input className="border rounded text-5xl h-[76px] w-full transition-all focus:border-black outline-none p-5"></input>
                </div>
                <div>

                </div>
                <div>
                  <p>Amount:</p>
                  {/* <Step value={value} onChange={setValue}></Step> */}
                </div>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="border border-gray hover:bg-gray-300 hover:border-black transition-all w-4/6 p-2 text-2xl rounded border-black">
                  <p className="text-4xl">mix</p>  
                </button>
              </div>
            </form>
          </div>
    )
}