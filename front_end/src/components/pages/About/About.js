import React from "react";
import TeamProfileCard from "./Components/TeamProfilePage";

const About = () => {
  var arr = [
    {
      name: "Anant Sherkhane",
      role: "Blockchain Developer / Developer",
      img: "/images/Anant.png",
      linkdin: "https://www.linkedin.com/in/anant-sherkhane-778ab8264/",
      About:
        "I am a fourth-year student with strong problem-solving skills and a passion for technology. I thrive in collaborative environments and enjoy working with diverse teams. Eager to learn and take on new challenges, I aim to contribute effectively to projects. My goal is to apply my skills to create meaningful solutions.",
    },
    {
      name: "Suraj Gaikwad (Patil)",
      role: "Developer",
      img: "/images/Suraj.jpg",
      linkdin: "https://www.linkedin.com/in/suraj-gaikwad-10028b249",
      About:
        "I am a fourth-year undergraduate passionate about technology and committed to solving real-world challenges using innovative tools. I thrive in dynamic environments and aim to drive growth and success through my programming skills and dedication.",
    },
    {
      name: "Imran Shaikh",
      role: "Developer",
      img: "/images/Imran.jpg",
      linkdin: "https://www.linkedin.com/in/shaikh-imran-b34249248/",
      About:
        "As a software engineer focused on delivering impactful solutions, I specialize in creating systems that are efficient, accessible, and sustainable. My mission is to revolutionize energy trading with secure, scalable, and user-friendly systems.",
    },
    {
      name: "Vivek Mangle",
      role: "Chief Information Security Officer (CISO)",
      img: "/images/Vivekk.jpg",
      linkdin: "https://www.linkedin.com/in/vivek-mangale-656394201/",
      About:
        "With an innovative mindset and expertise in cybersecurity, I protect digital landscapes and ensure the safety of our platform and user data. As a CISO, I am dedicated to building secure systems that empower the future.",
    },
  ];

  return (
    <>
      <div className="w-[85%] bg-[#faf9faa0] ml-[7.5vw] mr-[7.5vw] mt-5 p-5 overflow-auto">
        <div className="text-center text-[#0F4C6E] text-5xl font-bold">
          Company Overview
        </div>
        <div className="text-left text-[#0F4C6E] text-2xl font-bold flex flex-col gap-6 p-10">
          <h2 className="text-3xl text-black">
            Welcome to P2P Energy Trading Platform
          </h2>
          <p>
            We are transforming the energy landscape with a peer-to-peer energy
            trading platform, based in Pune. Our platform fosters sustainable
            practices by connecting energy producers and consumers directly.
          </p>

          <h3 className="text-2xl text-black">Our Belief:</h3>
          <p>
            Energy should be accessible, sustainable, and equitable. We are
            dedicated to empowering individuals to produce, share, and trade
            energy fairly.
          </p>

          <h3 className="text-2xl text-black">Our Mission:</h3>
          <p>
            To revolutionize the energy market through technology and innovation
            by enabling direct, transparent, and efficient peer-to-peer energy
            transactions. We strive to create a greener and more sustainable
            future.
          </p>

          <h3 className="text-2xl text-black">Our Vision:</h3>
          <p>
            To lead the transition toward renewable energy adoption and provide
            a seamless platform for individuals to trade energy while reducing
            reliance on traditional energy suppliers.
          </p>

          <h3 className="text-2xl text-black">Disclaimer:</h3>
          <p>
            Laxmi Chief Fund is a technology-driven platform that facilitates
            energy trading between users. We are not an energy supplier but act
            as an intermediary promoting renewable energy adoption.
          </p>

          <h2 className="text-3xl text-black">What We Do:</h2>
          <p>
            We empower individuals to take control of their energy needs through
            our flagship product, the Energy Exchange Platform (EEP). This
            blockchain-powered platform enables secure, decentralized energy
            trading with transparent pricing.
          </p>

          <h3 className="text-2xl text-black">How It Works:</h3>
          <ul className="list-disc ml-5">
            <li>
              Register on the platform and provide details about your energy
              consumption or production.
            </li>
            <li>
              Our blockchain-based system connects producers and consumers in
              real time using smart contracts.
            </li>
            <li>
              Seamlessly trade energy, ensuring fairness, transparency, and a
              step toward sustainability.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-lg">
          <h2 className="text-3xl font-bold text-[#0F4C6E]">Meet the Team</h2>
          <div className="flex flex-col gap-5">
            {arr.map(({ name, role, img, linkdin, About }) => (
              <TeamProfileCard
                key={name}
                name={name}
                role={role}
                img={img}
                linkdin={linkdin}
                About={About}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
