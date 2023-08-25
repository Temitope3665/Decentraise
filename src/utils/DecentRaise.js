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
        decentRaiseAddress: "0x34CbBf023c65dbFeAf19AeFe49ed22F621A375C9",
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
        const {project_name, tagline, project_description, logo, cover_image, website_link, twitter, token_symbol, goal, duration} = campaign;
        const tx = await decentRaise.createCampaign(
            project_name,
            tagline,
            project_description,
            logo,
            cover_image,
            website_link,
            twitter,
            token_symbol,
            goal,
            duration
        );
        await tx.wait();
        window.alert("Campaign created successfully!");
    } catch (err) {
        window.alert(`Error: ${err.message}`);
    }
}

export async function getDecentRaise() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const decentRaise = new ethers.Contract(config.OptimisticGoerli.decentRaiseAddress, decentRaiseAbi, signer);
    return decentRaise;
}
