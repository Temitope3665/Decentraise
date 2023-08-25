import { Link } from "react-router-dom";
import { EXPLORE_PROJECTS } from "../helper/paths";

/* eslint-disable react/prop-types */
const ProjectCard = ({ desc, title, volume, payment, imgUrl, projectId }) => {
  return (
    <Link to={`${EXPLORE_PROJECTS}/${projectId}`}>
      <div className="rounded-lg border-fuchsia-200 border w-[18vw] cursor-pointer mr-12 my-8 bg-gray-700">
        <img
          src={imgUrl}
          alt="project"
          className="h-[180px] w-full object-cover rounded-lg"
        />
        <div className="px-5 py-4">
          <h2 className="font-bold text-[18px] overflow-hidden capitalize whitespace-nowrap text-ellipsis w-[80%] shadow-lg">
            {title}
          </h2>
          <p className="text-[11px] mt-2">{desc}</p>

          <div className="flex w-full justify-between">
            <div className="mt-4">
              <p className="text-fuchsia-200 font-semibold text-[12px]">VOLUME</p>
              <p className="font-bold">ETH {volume}</p>
            </div>
            <div className="mt-4">
              <p className="text-fuchsia-200 font-semibold text-[12px]">
                PAYMENT
              </p>
              <p className="font-bold">{payment}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

export const ReasonCard = ({ icon, title, desc, color }) => {
  return (
    <div className={`${color} w-[20vw] rounded-lg py-8`}>
      <div className="bg-[#17141D] rounded-full w-[50px] h-[50px] items-center justify-center flex mx-auto mb-4">{icon}</div>
      <h3 className="font-bold text-primary text-[22px]">{title}</h3>
      <p className="text-primary text-[12px] px-3">{desc}</p>
    </div>
  );
};
