import support from "../Media/customer_service.png";

const Footer = () => {
    return ( 
        <div className="bg-black text-white h-screen px-5 md:px-10 flex items-center">
       <div className="md:mb-8">
        <p className="mb-1 crimson-font text-2xl">Quick help</p>
        <div className=" grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-4">
            <p className="text-xs">
              Reach out and let us assist you! Explore our support resources and
              connect with our team for any assistance you need.
            </p>
            <form action="" className="mt-8 grid gap-6 w-full">
              <div className="text-xs grid">
                <label className="mb-1">Your email address:</label>
                <input
                  type="email"
                  className="p-4 rounded bg-white/10 text-xs border border-white/20"
                  placeholder="samplemail@gmail.com"
                />
              </div>
              <div className="text-xs grid">
                <label className="mb-1">Your message:</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="p-4 rounded bg-white/10 text-xs border border-white/20"
                  placeholder="start typing..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#71CB90] text-xs p-4 text-black rounded font-semibold"
              >
                Send
              </button>
            </form>
          </div>
          <div className="col-span-8 hidden md:block">
            <img
              src={support}
              alt=""
              className="rounded-md h-80 w-full object-cover"
            />
          </div>
        </div>
        <div className="text-xs flex justify-between fixed bottom-0 left-0 px-5 md:px-10 py-8 md:py-6 bg-black right-0 w-full">
          <div>2023 Trnsfr</div>
          <div className="gap-8 flex">
            <span>Terms</span>
            <span>Privacy</span>
          </div>
        </div>
       </div>
      </div>
     );
}
 
export default Footer;