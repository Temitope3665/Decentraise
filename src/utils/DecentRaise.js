// import { toaster } from "evergreen-ui/types";
import {ethers} from "ethers";
import decentRaiseJson from "./DecentRaise.json"
const decentRaiseAbi = decentRaiseJson.abi;

const config =  {
    OptimisticGoerli: {
        chainId: '0x1A4',
        chainName: 'Optimism Goerli testnet',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH', // 2-6 characters long
            decimals: 18
        },
        blockExplorerUrls: ['https://calibration.filscan.io/'],
        rpcUrls: ['https://goerli.optimism.io'],
        decentRaiseAddress: "0xF18320CCC06598e5496B7f3F57f33B6CaEf41686",
    },
    // OptimisticEthereum: {
    //     decentRaiseAddress: "",
    //     rpc: "https://mainnet.optimism.io",
    // }
}



export async function connectWallet() {
    let account = ""; 
    try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            localStorage.setItem("isConnected", accounts[0]);
            account = accounts[0];
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x1A4' }], // chainId must be in hexadecimal numbers
            });
        } else {
            window.alert("Wallet not detected!");
        }
        return account;
    } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
            try {
                const {chainId, chainName, nativeCurrency, blockExplorerUrls, rpcUrls} = config.OptimisticGoerli;
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId,
                            chainName,
                            nativeCurrency,
                            blockExplorerUrls,
                            rpcUrls,
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
                window.alert('failed to add network to metamask');
            }
        }
        window.alert("Error: " + error.message);
        return account;
    }
}

export async function createCampaign(campaign) {
    try {
        const decentRaise = await getDecentRaise();
        console.log(decentRaise);
        const {project_name, tagline, project_description, logo, cover_image, website_link, twitter_handle, token_symbol="", goal, duration} = campaign;
        console.log(campaign);
        const tx = await decentRaise.createCampaign(
            project_name,
            tagline,
            project_description,
            logo,
            cover_image,
            website_link,
            twitter_handle,
            token_symbol,
            ethers.utils.parseEther(goal),
            duration
        );
        console.log(tx);
        await tx.wait();
        window.alert("Campaign created successfully!");
    } catch (err) {
        console.log(err)
        window.alert(`Error: ${err.message}`);
    }
}

export async function getCampaigns() {
    let campaigns = []
    let totalCampaigns = 0;
    const decentRaise = await getReadOnlyDecentRaise();
    try {
        totalCampaigns = Number(await decentRaise.totalCampaigns());
    } catch (err) {
        window.alert(`Error: ${err.message}`);
        return campaigns
    }
    for(let i = 0; i < totalCampaigns; i++) {
        try {
            const campaign = await getCampaign(i);
            campaigns.push(campaign);
        } catch (err) {
            console.log({err});
        }
    }
    // console.log(campaigns);
    return campaigns;
}

export async function getCampaign(campaignId) {
    try {
        const decentRaise = await getReadOnlyDecentRaise();
        const {cover, deadline, description, goal, isCampaignActive, logo, name, nftAddress, projectLink, tagline, totalContributions, twitter } = await decentRaise.campaigns(campaignId);
        const campaign = {id: campaignId, cover, deadline: Number(deadline), description, goal: ethers.utils.formatEther(goal), isCampaignActive, logo, name, nftAddress, projectLink, tagline, totalContributions: ethers.utils.formatEther(totalContributions), twitter };
        return campaign;
    } catch (err) {
        window.alert(`Error: ${err.message}`);
    }
}

export async function contribute(campaignId, amount) {
    try {
        const decentRaise = await getDecentRaise();
        console.log(ethers.utils.parseEther(amount));
        const tx = await decentRaise.contribute(campaignId, {value: ethers.utils.parseEther(amount)});
        await tx.wait();
        window.alert("Contributed successfully!");
    } catch (err) {
        window.alert(`Error: ${err.message}`);
    }
}

export async function getDecentRaise() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const decentRaise = new ethers.Contract(config.OptimisticGoerli.decentRaiseAddress, decentRaiseAbi, signer);
    return decentRaise;
}

export async function getReadOnlyDecentRaise() {
    const provider = new ethers.providers.JsonRpcProvider(config.OptimisticGoerli.rpcUrls[0]);
    const decentRaise = new ethers.Contract(config.OptimisticGoerli.decentRaiseAddress, decentRaiseAbi, provider);
    return decentRaise;
}
