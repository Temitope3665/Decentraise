import { useState } from "react";
import AuthLayout from "../layout";
import TextInput from "../ui/text-input";
import { Button } from "../components/ui/button";

const Project = () => {
    const [supportAmount, setSupportAmount] = useState('');
  return (
    <AuthLayout>
      <div className="mt-20 px-24">
        <div className="w-[200px] h-[200px] border-fuchsia-300 rounded-lg border">
          <img
            src="https://jbm.infura-ipfs.io/ipfs/QmRXMCbe7MvhvabciTVCenLknNeTjoH1hHUGhjrfjFuGnU"
            alt="logo"
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-between">
          <div className="w-[35vw]">
            <h1 className="my-8 text-[44px] font-bold">Edu3Labes</h1>
            <p className="text-[14px] -mt-2">
              Supports projects built using the Juicebox protocol, and the
              development of the protocol itself. All projects withdrawing funds
              from their treasury pay a 2.5% membership fee and receive JBX at
              the current issuance rate. JBX members govern the NFT that
              represents ownership over this treasury.
            </p>
            <p className="text-[12px] text-fuchsia-500 font-semibold mt-2">
              owned by: @temi...
            </p>
          </div>
          <div className="flex justify-between items-end w-[35vw]">
            <div className="text-center">
              <p className="text-sm text-fuchsia-300">PAYMENTS</p>
              <h2 className="font-bold text-[30px] mt-3">1000</h2>
            </div>
            <div className="text-center">
              <p className="text-sm text-fuchsia-300">TOTAL VOLUME</p>
              <h2 className="font-bold text-[30px] mt-3">Ξ75.33</h2>
            </div>
            <div className="text-center">
              <p className="text-sm text-fuchsia-300">PAYMENTS</p>
              <h2 className="font-bold text-[30px] mt-3">1000</h2>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
            <div className="bg-fuchsia-500 h-fit mt-24 rounded-lg p-6 w-[40vw]">
            <p className="text-primary font-bold">Support Project</p>
            <div className="flex items-center">
                <TextInput
                    name="support_amount"
                    type="text"
                    placeholder="0"
                    className="-mt-4 w-[25vw] h-[50px]"
                    value={supportAmount}
                    onChange={({ target }) => setSupportAmount(target.value)}
                />
                <Button className="h-[50px] mt-4 ml-4 hover:bg-white hover:text-fuchsia-500" disabled={!supportAmount || isNaN(parseFloat(supportAmount)) && !isFinite(supportAmount)}>Add Payment</Button>
            </div>
            </div>
            <div className="bg-fuchsia-500 mt-24 rounded-lg p-6 w-[40vw]">
                <p className="text-primary font-bold">Deadline date:</p>
                <p className="text-[30px] font-bold mt-4 text-primary">00d 04h 09m 40s</p>
            </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Project;
