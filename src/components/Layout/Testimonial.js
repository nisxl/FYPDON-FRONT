import React from "react";

function Testimonial() {
  return (
    <div className="flex flex-col pb-[60px] items-center">
      <div className="text-[#4A1D1F] text-[16px] dark:text-[#FBEDCD]">
        TESTIMONIALS
      </div>
      <div className="">
        <p className="flex items-end text-[36px] font-medium">
          <span className="text-[#FBEDCD] text-[150px] self-start">" </span>
          Really Liked the cakes ordered from here. The butterscotch cake is a
          must have.
          <span className="text-[#FBEDCD] text-[150px] self-end">"</span>
        </p>
      </div>
      <img src="../../images/userp.png" className="w-[29px] h-[29px]" />
      <div className="text-[#4A1D1F] font-semibold text-[16px] dark:text-[#FBEDCD]">
        Nischal Maharjan
      </div>
      <div className="text-[14px]">Gwarko, Lalitpur</div>
    </div>
  );
}

export default Testimonial;
