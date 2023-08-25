import { PlusIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import AuthLayout from "../layout";
import TextInput from "../ui/text-input";
import { useContext, useState } from "react";
import { Dialog, Label, Pane } from "evergreen-ui";
import FileInput from "../ui/file-input";
import CreateProjectLevel from "../layout/create-project-level";
import { useNavigate } from "react-router-dom";
import { handleUploadImage } from "../functions";
import { UserContext } from "../app";
import { createCampaign } from "../utils/DecentRaise";

const AddNFtPage = () => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [nftSymbol, setNftSymbol] = useState('');
  const [progress, setProgress] = useState();
  const [image, setImage] = useState();
  const {account, connectWallet} = useContext(UserContext);


  const handleChangeImage = (file) => {
    handleUploadImage(file[0], setProgress)
    .then((res) => setUploadResponse(res));
  };

  const create = async() => {
    const campaign = JSON.parse(localStorage.getItem('user_project'));
    campaign.token_symbol = nftSymbol;
    await createCampaign(campaign);
  }

  return (
    <AuthLayout>
      <div className="mt-8 px-[400px] h-[90vh]">
        <h1 className="text-center underline underline-offset-8">
          Create a project
        </h1>
        <CreateProjectLevel />
        <div className="mt-14">
          <h1 className="font-bold text-[22px]">NFTs(Optional)</h1>
          <p className="text-[12px] mt-2 pr-12">
            Reward your supporters with custom NFTs.
          </p>

          <div className="mt-8 border border-fuchsia-500 rounded-lg p-4 flex items-center justify-center h-[120px] w-full">
            <Pane>
              <Dialog
                isShown={isShown}
                onCloseComplete={() => setIsShown(false)}
                hasFooter={false}
                title="Add NFT"
              >
                <Label htmlFor="upload" className="mt-4 text-sm">
                  Upload NFT Image *
                </Label>
                <div className="-mt-14">
                <FileInput handleChangeFile={handleChangeImage} setFiles={setImage} files={image} progress={progress} fileName={uploadResponse && uploadResponse.original_filename || ''} progressClassName="text-black" />
                </div>

                <TextInput
                  name="name"
                  label="Name *"
                  placeholder="Enter a symbol for your NFT"
                  className="text-black bg-fuchsia-white placeholder:text-black"
                  labelClassName="text-black"
                  value={nftSymbol}
                  onChange={({ target }) => setNftSymbol(target.value)}
                />

                <div className="flex justify-between w-full my-10">
                  <Button className="px-12 text-black bg-transparent border border-fuchsia-500" onClick={() => setIsShown(false)}>
                    Cancel
                  </Button>
                  <Button className="px-12 bg-fuchsia-500" disabled={ !nftSymbol || !uploadResponse} onClick={create}>Add NFT</Button>
                </div>
              </Dialog>

              <button className="flex" onClick={() => setIsShown(true)}>
                <PlusIcon />
                <p className="ml-2">Add NFT</p>
              </button>
            </Pane>
          </div>

          <div className="flex justify-between w-full my-10">
            <Button className="px-12 bg-transparent border border-fuchsia-500" onClick={() => navigate(-1)}>
              Back
            </Button>
            {
              account ? 
              <Button className="px-12 bg-fuchsia-500" onClick={() => create()}>Create campaign</Button> :
              <Button className="px-12 bg-fuchsia-500" onClick={() => connectWallet()}>Connect wallet to create</Button>
            }
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AddNFtPage;
