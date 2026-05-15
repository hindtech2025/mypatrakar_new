import React from "react";
import { FaPenNib, FaMapMarkedAlt, FaMagic } from "react-icons/fa";
import InfoCard from "../components/InfoCard";
import choose_AI_tone from "../../../../assets/aiShorts/choose-ai-tone.png"
import select from "../../../../assets/aiShorts/select.png"
import click_generate_icon from "../../../../assets/aiShorts/click-generate-icon.png"

export default function HowItWorks() {
  return (
    <div className="mt-16 w-full max-w-6xl mx-auto">
      <h2 className="text-center text-[35px] font-extrabold  md:text-3xl font-sans text-[#16274E]">
        How It Works
      </h2>

      <div className="flex flex-wrap  gap-[32px] items-center justify-center mx-auto mt-8">
        <InfoCard
          icon={choose_AI_tone}
          title="1. Choose AI Tone / Writing Style"
          description="Select the personality for your AI-generated content."
        />
        <InfoCard
          icon={select}
          title="2. Select Category & Optional Location"
          description="Define the topic and narrow down the geographical focus if needed."
        />
        <InfoCard
          icon={click_generate_icon}
          title="3. Click Generate"
          description="Let our AI work its magic and create a unique Short for you."
        />
      </div>
    </div>
  );
}
