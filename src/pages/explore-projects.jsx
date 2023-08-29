import { useCampaignContext } from "../context/CampaignContext";
import AuthLayout from "../layout";
import ProjectCard, { ReasonCard } from "../ui/card";
import { reasons } from "../utils";

const ExploreProjects = () => {
  const { campaigns } = useCampaignContext();
  console.log({ campaigns });
  return (
    <AuthLayout>
      <h1 className="text-[70px] font-bold mt-36 mx-auto text-center">
        Explore amazing projects
      </h1>
      <h3 className="mt-12 w-[50%] text-center mx-auto text-[14px] text-fuchsia-200">
        View thousands of projects using Decentrainse to fund, operate, and
        scale their ideas & communities transparently on Ethereum.
      </h3>

      <div className="px-24 mt-12">
        <h3 className="mb-6 underline cursor-pointer underline-offset-8 hover:text-fuchsia-500">
          Explore Ideas
        </h3>
        <div className="flex-row flex-wrap block w-full md:flex">
          {campaigns &&
            campaigns.map((project, index) => (
              <ProjectCard
                key={index}
                desc={project.description}
                title={project.name}
                volume={project.goal}
                payment={project.totalContributions}
                imgUrl={project.logo}
                projectId={index}
              />
            ))}
        </div>
      </div>

      <div className="flex justify-between px-[200px] mt-16 bg-fuchsia-500 py-20">
        <div className="text-center">
          <h2 className="text-[50px] font-bold">515</h2>
          <p className="mt-6">Projects created</p>
        </div>
        <div className="text-center">
          <h2 className="text-[50px] font-bold">$515, 000</h2>
          <p className="mt-6">Total raised</p>
        </div>
        <div className="text-center">
          <h2 className="text-[50px] font-bold">1,050</h2>
          <p className="mt-6">Payment made</p>
        </div>
      </div>

      <div className="my-20 text-center">
        <h1 className="font-bold text-[50px]">Why Decentraise ?</h1>
        <p className="mt-8">
          Open a full-featured Ethereum treasury with programmable spending in
          minutes.
        </p>

        <div className="mt-12 flex flex-wrap justify-between w-full px-[200px]">
          {reasons.slice(0, 3).map((reason) => (
            <ReasonCard
              key={reason.title}
              icon={reason.icon}
              title={reason.title}
              desc={reason.desc}
              color={reason.color}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center flex-wrap w-full px-[200px]">
          {reasons.slice(3, 5).map((reason) => (
            <div className="mx-10" key={reason.title}>
              <ReasonCard
                icon={reason.icon}
                title={reason.title}
                desc={reason.desc}
                color={reason.color}
              />
            </div>
          ))}
        </div>
      </div>
    </AuthLayout>
  );
};

export default ExploreProjects;
