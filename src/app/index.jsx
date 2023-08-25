import { Route, Routes } from "react-router-dom";
import { ADD_NFT, CREATE_CYCLE, CREATE_PAYOUTS, CREATE_STAGE_1, EXPLORE_PROJECTS, HOME_URL } from "../helper/paths";
import Home from "../pages";
import CreateProjectPage from "../pages/create-project";
import CreateCyclePage from "../pages/create-cycle";
import PayoutsPage from "../pages/payouts";
import AddNFtPage from "../pages/add-nft";
import ExploreProjects from "../pages/explore-projects";
import Project from "../pages/project";
import { createContext, useState } from "react";
import { connectWallet } from "../utils/DecentRaise";

export const UserContext = createContext();

const App = () => {
  const [account, setAccount] = useState("");
  const user =  {account, connectWallet: connect}

  async function connect() {
    const _account = await connectWallet();
    setAccount(_account);
  }

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path={HOME_URL} index element={<Home />} />
        <Route path={EXPLORE_PROJECTS} index element={<ExploreProjects />} />
        <Route path={CREATE_STAGE_1} element={<CreateProjectPage />} />
        <Route path={CREATE_CYCLE} element={<CreateCyclePage />} />
        <Route path={CREATE_PAYOUTS} element={<PayoutsPage />} />
        <Route path={ADD_NFT} element={<AddNFtPage />} />
        <Route path={`${EXPLORE_PROJECTS}/:projectId`} element={<Project />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;