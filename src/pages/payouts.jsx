import { useState } from "react";
import { Button } from "../components/ui/button";
import AuthLayout from "../layout";
import CreateProjectLevel from "../layout/create-project-level";
import TextInput from "../ui/text-input";
import { useNavigate } from "react-router-dom";

const PayoutsPage = () => {
  const navigate = useNavigate();
  const [payoutAddress, setPayoutAddress] = useState('');
  const [amount, setAmout] = useState('');
  return (
    <AuthLayout>
      <div className="mt-8 px-[400px]">
        <h1 className="text-center underline underline-offset-8">
          Create a project
        </h1>
        <CreateProjectLevel />
        <div className="mt-14">
          <h1 className="font-bold text-[22px]">Payouts</h1>
          <p className="text-[12px] mt-2 pr-12">
            Pay out ETH from your project to the Ethereum wallets or Juicebox
            projects of your choice. ETH which isn&apos;t paid out will be available
            for token redemptions, or for use in future cycles. Payouts reset
            each cycle.
          </p>

          <div className="p-4 mt-8 border rounded-lg border-fuchsia-500">
            <h1 className="font-bold">Payout recipients</h1>
            <p className="mt-2 text-xs">Add wallet addresses to your Decentraise projects to receive payouts.</p>

            <form>
              <TextInput
                name="duation"
                label="Wallet Address"
                type="text"
                placeholder="00xxxxxxxxx"
                value={payoutAddress}
                onChange={({ target }) => setPayoutAddress(target.value)}
              />
              <p className="mt-2 text-xs">Fill your payouts wallet address to the input field or connect your wallet</p>
              <Button className="w-full px-12 mt-8 bg-fuchsia-500">Add payout wallet +</Button>

              <TextInput
                name="amount"
                label="Amount to payout"
                type="text"
                placeholder="100"
                value={amount}
                onChange={({ target }) => setAmout(target.value)}
              />
              <p className="mt-2 text-xs">Input the amout you want to withdraw</p>
            </form>
          </div>

          <div className="flex justify-between w-full my-8">
            <Button className="px-12 bg-transparent border border-fuchsia-500" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button className="px-12 bg-fuchsia-500" disabled={!payoutAddress || !amount || isNaN(parseFloat(amount)) && !isFinite(amount)}>Next</Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PayoutsPage;
