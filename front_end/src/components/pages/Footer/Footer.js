import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer
        className="bg-cover bg-center text-white py-8 h-[200px]"
        style={{
          backgroundImage: "url('/images/foot.png')", // Corrected path to the image
        }}
      >
        <div className="flex justify-around items-center justify-center">
          <fot1 className="flex flex-col justify-center ">
            <div className="font-bold text-lg mb-2">CONTACT INFO</div>
            <div className="w-[200px]">
              <div>Corporate Office</div>
              <div className="text-[13px]">
                Address,Plot No. C-001/A/1, 1st Floor, ShivDarshan,411009
              </div>
            </div>
            <div className="flex text-sm items-center gap-1">
              <MdOutlineEmail />
              <div>assherkhane32@gmail.com</div>
            </div>
            <div className="text-sm flex items-center gap-1">
              <MdLocalPhone />
              <div>9657698135</div>
            </div>
          </fot1>
          <fot1 className="flex flex-col  justify-center ">
            <div className="font-bold  text-lg mb-2">DOOGEE</div>
            <div className="text-md">ABOUT US</div>
            <div className="text-md ">CONTACT US</div>
            <div className="text-md">TERMS OF USE</div>
          </fot1>
          <fot1 className="flex flex-col justify-center  ">
            <div className="font-bold text-lg mb-2 text-center">Social</div>
            <div className="text-md flex items-center gap-1">
              <img src="/images/facebook.png" className="h-5 w-5" alt="" />
              <div>FaceBook</div>
            </div>
            <div className="text-md flex items-center gap-1 ">
              <img src="/images/twitter.png" className="h-5 w-5" alt="" />
              <div>Twitter</div>
            </div>
            <div className="text-md flex items-center  gap-1 ">
              <img src="/images/youtube.png" className="h-5 w-5" alt="" />
              <div>Youtube</div>
            </div>
            <div className="text-md flex items-center gap-1">
              <img src="/images/instagram (1).png" className="h-5 w-5" alt="" />
              <div>Instagram</div>
            </div>
            <div className="text-md flex items-center gap-1 ">
              <img src="images/linkedin.png" className="h-5 w-5" alt="" />
              <div>Linkdin</div>
            </div>
          </fot1>
          <foot1 className="flex flex-col justify-center">
            <label htmlFor="subscribe">Newsletter Subscription</label>
            <div className="flex">
              <input
                type="email"
                id="subscribe"
                placeholder="Enter your email"
                className="border text-black border-gray-300 rounded-md px-3 py-2 w-full"
              />
              <button className="bg-orange-500 rounded-md w-[100px] p-1 h-10 text-white ml-2">
                Subscribe
              </button>
            </div>
          </foot1>
        </div>
      </footer>
      <div className="h-[7vh] bg-[#26395B] flex items-center justify-center justify-around text-white text-[13px]">
        <div className="flex ">
          <div>Privacy Policy</div>
          <div class="w-[2px] h-5 bg-white mx-4"></div>

          <div>Terms of uses</div>
          <div class="w-[2px] h-5 bg-white mx-4"></div>

          <div> GDPR</div>
          <div class="w-[2px] h-5 bg-white mx-4"></div>

          <div>Sitemap</div>
        </div>
        <div className="flex">
          <div>© 2024 INDIAN ENERGY EXCHANGE LIMITED </div>
          <div class="w-[2px] h-5 bg-white mx-4"></div>
          <div>Disclaimer</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
