import { useEffect, useState } from "react";
import AuthLayout from "../layout";
import TextInput from "../ui/text-input";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useCampaignContext } from "../context/CampaignContext";
import { useAccount } from "wagmi";
import { HOME_URL } from "../helper/paths";

const Project = () => {
  const [project, setProject] = useState();
  const [supportAmount, setSupportAmount] = useState("");
  const { projectId } = useParams();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { contribute, getCampaign } = useCampaignContext();
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const campaign = await getCampaign(projectId);
    } catch (err) {
      navigate(HOME_URL);
    }
    setProject(campaign);
    timestampToDateCountdown(new Date(campaign.deadline));
  };

  function timestampToDateCountdown(targetTimestamp) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
    const _timeRemaining = targetTimestamp - currentTimestamp;

    if (_timeRemaining <= 0) {
      return;
    }

    const days = Math.floor(_timeRemaining / (60 * 60 * 24));
    const hours = Math.floor((_timeRemaining % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((_timeRemaining % (60 * 60)) / 60);
    const seconds = _timeRemaining % 60;

    setTimeRemaining({ days, hours, minutes, seconds });
  }

  const support = async () => {
    await contribute(projectId, supportAmount.toString());
    setProject(await getCampaign(projectId));
  };

  return (
    <AuthLayout>
      <div className="px-24 mt-20">
        <div className="w-[200px] h-[200px] border-fuchsia-300 rounded-lg border">
          <img
            src={project ? project.logo : ""}
            alt="logo"
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <div className="w-[35vw]">
            <h1 className="my-8 text-[44px] font-bold">
              {project ? project.name : ""}
            </h1>
            <p className="text-[14px] -mt-2">
              {project ? project.description : ""}
            </p>
            <p className="text-[12px] text-fuchsia-500 font-semibold mt-2">
              {project ? project.twitter : "https://twitter.com"}
            </p>
          </div>
          <div className="flex justify-between items-end w-[35vw]">
            <div className="text-center">
              <p className="text-sm text-fuchsia-300">Target</p>
              <h2 className="font-bold text-[30px] mt-3">
                {project ? project.goal : 0.0}ETH
              </h2>
            </div>
            <div className="text-center">
              <p className="text-sm text-fuchsia-300">Raise</p>
              <h2 className="font-bold text-[30px] mt-3">
                {project ? project.totalContributions : 0.0}ETH
              </h2>
            </div>
            <div className="text-center">
              <p className="text-sm text-fuchsia-300">NFT Reward</p>
              <h2 className="font-bold text-[30px] mt-3">
                {project && project.nftAddress ? "True" : "False"}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="bg-fuchsia-500 h-fit mt-24 rounded-lg p-6 w-[40vw]">
            <p className="font-bold text-primary">Support Project</p>
            <div className="flex items-center">
              <TextInput
                name="support_amount"
                type="text"
                placeholder="0"
                className="-mt-4 w-[25vw] h-[50px]"
                value={supportAmount}
                onChange={({ target }) => setSupportAmount(target.value)}
              />
              <Button
                onClick={support}
                className="h-[50px] mt-4 ml-4 hover:bg-white hover:text-fuchsia-500"
                disabled={
                  !isConnected ||
                  !supportAmount ||
                  (isNaN(parseFloat(supportAmount)) && !isFinite(supportAmount))
                }
              >
                Add Payment
              </Button>
            </div>
          </div>
          <div className="bg-fuchsia-500 mt-24 rounded-lg p-6 w-[40vw]">
            <p className="font-bold text-primary">Deadline date:</p>
            <p className="text-[30px] font-bold mt-4 text-primary">
              {timeRemaining.days}d {timeRemaining.hours}h{" "}
              {timeRemaining.minutes}m {timeRemaining.seconds}s
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Project;
