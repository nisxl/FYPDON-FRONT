import React from "react";
import { BiCopyright } from "react-icons/bi";
import { AiOutlinePhone, AiOutlineHome } from "react-icons/ai";
import { Button } from "antd";

function Footer() {
  return (
    <section className="bg-[#FBEDCD] flex h-[265px]">
      <div className="flex flex-col mt-[80px] px-[70px] items-center  ">
        <p className="font-semibold">Stay Connected</p>
        <div className="flex gap-[14px] mb-[57px]">
          <img src="../../images/instagram.png" className="w-[19px]" />
          <img src="../../images/facebook.png" className="w-[19px]" />
          <img src="../../images/tik-tok.png" className="w-[19px]" />
        </div>
        <div className="flex items-center text-[14px]">
          <BiCopyright /> 2022 Rollers Bakery House, All rights reserved.
        </div>
      </div>

      <div className="flex items-center  grow  justify-evenly">
        <div className="flex flex-col gap-3">
          <span>Cakes</span>
          <span>About Us</span>
          <span>FAQ</span>
          <span>Privacy</span>
        </div>
        <div className="flex flex-col   gap-6">
          <Button className="bg-[#4A1D1F] h-[60px] w-[250px] text-white ">
            Events and specials
          </Button>
          <div className="flex flex-col">
            <span className="self-center mb-[10px]">Contact Us</span>
            <div className="ml-5 flex items-center">
              <AiOutlineHome />
              Rollers Bakery House
            </div>
            <div className="ml-5 flex items-center">
              <AiOutlinePhone />
              9808772881
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
