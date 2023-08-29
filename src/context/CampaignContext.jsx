import { createContext, useContext, useEffect, useState } from "react";
import { formatEther, getContract, parseEther } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";
import { DecentRaiseAbi } from "./DecentRaiseAbi";

const CampaignContext = createContext();

export const useCampaignContext = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
  const [walletClient, setWalletClient] = useState();
  const [campaigns, setCampaigns] = useState([]);
  const publicClient = usePublicClient();
  useWalletClient({
    onSuccess: (data) => setWalletClient(data),
  });

  useEffect(() => {
    const chainId = publicClient.chain.id;
    console.log("chain", chainId);
    const contractAddress =
      chainId == 43113
        ? "0x4F3fC920d14229ECF6eD13E2c5ea75AbBc396FE9"
        : chainId == 421613
        ? "0x3e0c58Cc54C3199DB05d6937D26905c3Cb346c91"
        : "0x14FF86D5f1A63B8d2bbEd252B2ee24E04877cDA5";
    console.log(contractAddress);
    getCampaigns();
  }, [publicClient]);

  const getCampaign = async (campaignId) => {
    const chainId = publicClient.chain.id;
    const decentRaise = getContract({
      abi: DecentRaiseAbi,
      address:
        chainId == 43113
          ? "0x4F3fC920d14229ECF6eD13E2c5ea75AbBc396FE9"
          : chainId == 421613
          ? "0x3e0c58Cc54C3199DB05d6937D26905c3Cb346c91"
          : "0x14FF86D5f1A63B8d2bbEd252B2ee24E04877cDA5",
      publicClient,
      walletClient,
    });
    const _campaign = await decentRaise.read.campaigns([campaignId]);
    const campaign = {
      id: campaignId,
      name: _campaign[0],
      tagline: _campaign[1],
      description: _campaign[2],
      logo: _campaign[3],
      projectLink: _campaign[4],
      cover: _campaign[5],
      twitter: _campaign[6],
      goal: formatEther(_campaign[7]),
      deadline: Number(_campaign[8]),
      totalContributions: formatEther(_campaign[9]),
      isCampaignActive: _campaign[10],
      nftAddress: _campaign[11],
    };
    // console.log({ campaign });
    return campaign;
  };

  const getCampaigns = async () => {
    const chainId = publicClient.chain.id;
    const decentRaise = getContract({
      abi: DecentRaiseAbi,
      address:
        chainId == 43113
          ? "0x4F3fC920d14229ECF6eD13E2c5ea75AbBc396FE9"
          : chainId == 421613
          ? "0x3e0c58Cc54C3199DB05d6937D26905c3Cb346c91"
          : "0x14FF86D5f1A63B8d2bbEd252B2ee24E04877cDA5",
      publicClient,
      walletClient,
    });
    let _campaigns = [];
    let totalCampaigns = 0;
    try {
      totalCampaigns = Number(await decentRaise.read.totalCampaigns());
    } catch (err) {
      window.alert(`Error: ${err.message}`);
      return _campaigns;
    }
    for (let i = 0; i < totalCampaigns; i++) {
      try {
        const campaign = await getCampaign(i);
        _campaigns.push(campaign);
      } catch (err) {
        console.log({ err });
      }
    }
    console.log({ _campaigns });
    setCampaigns(_campaigns);
  };

  const createCampaign = async (campaign) => {
    const chainId = publicClient.chain.id;
    const decentRaise = getContract({
      abi: DecentRaiseAbi,
      address:
        chainId == 43113
          ? "0x4F3fC920d14229ECF6eD13E2c5ea75AbBc396FE9"
          : chainId == 421613
          ? "0x3e0c58Cc54C3199DB05d6937D26905c3Cb346c91"
          : "0x14FF86D5f1A63B8d2bbEd252B2ee24E04877cDA5",
      publicClient,
      walletClient,
    });
    try {
      const {
        project_name,
        tagline,
        project_description,
        logo,
        cover_image,
        website_link,
        twitter_handle,
        token_symbol = "",
        goal,
        duration,
      } = campaign;
      const txHash = await decentRaise.write.createCampaign([
        project_name,
        tagline,
        project_description,
        logo,
        cover_image,
        website_link,
        twitter_handle,
        token_symbol,
        parseEther(goal),
        duration,
      ]);
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      getCampaigns();
      window.alert("Campaign created successfully!");
    } catch (err) {
      console.log(err);
      window.alert(`Error: ${err.message}`);
    }
  };

  const contribute = async (campaignId, amount) => {
    const chainId = publicClient.chain.id;
    const decentRaise = getContract({
      abi: DecentRaiseAbi,
      address:
        chainId == 43113
          ? "0x4F3fC920d14229ECF6eD13E2c5ea75AbBc396FE9"
          : chainId == 421613
          ? "0x3e0c58Cc54C3199DB05d6937D26905c3Cb346c91"
          : "0x14FF86D5f1A63B8d2bbEd252B2ee24E04877cDA5",
      publicClient,
      walletClient,
    });
    try {
      const txHash = await decentRaise.write.contribute([campaignId], {
        value: parseEther(amount),
      });
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      window.alert("Contributed successfully!");
    } catch (err) {
      window.alert(`Error: ${err.message}`);
    }
  };

  return (
    <CampaignContext.Provider
      value={{ campaigns, getCampaign, createCampaign, contribute }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
