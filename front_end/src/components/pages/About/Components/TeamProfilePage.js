import React from "react";

const TeamProfileCard = ({ name, role, img, linkdin, About }) => {
  return (
    <div className="bg-teal-50 p-6 rounded-lg shadow-lg w-[60%] mx-auto">
      <div className="flex items-center gap-6">
        {/* Dynamic Image */}
        <img
          src={img}
          alt={name}
          className="h-[150px] w-[150px] rounded-lg object-cover border border-gray-300"
        />

        <div>
          <div className="flex flex-row">
            <div>
              {/* Dynamic Name and Role */}
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <p className="text-teal-700 font-medium">{role}</p>
            </div>

            {/* Dynamic LinkedIn Link */}
            <a
              href={linkdin}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto p-[10px]"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-8 h-8"
              />
            </a>
          </div>
          <hr className="my-2 border-teal-400" />
          
          {/* Dynamic About Section */}
          <p className="text-gray-600 text-sm leading-relaxed">{About}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamProfileCard;
