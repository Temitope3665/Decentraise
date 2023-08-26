import { Link, useLocation } from "react-router-dom";
import { CREATE_STAGE_1, EXPLORE_PROJECTS, HOME_URL } from "../helper/paths";
import { useContext} from "react";
import { UserContext } from "../app";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "../components/ui/button";

const navlinks = [
  { title: "Explore", href: EXPLORE_PROJECTS },
  { title: "Start a project", href: CREATE_STAGE_1 },
];

const Navbar = () => {
  const { ensName } = useContext(UserContext);
  const { pathname } = useLocation();


  return (
    <nav className="px-20 -mt-2">
      <div className="flex items-center justify-between w-full">
        <div className="w-[40vw] flex items-center">
          <Link to={HOME_URL}>
            <div className="flex items-center w-[22vw]">
              <img src="/decent-logo.svg" alt="logo" width={40} />
              <h1 className="text-[24px] font-medium ml-2">Decentraise</h1>
            </div>
          </Link>

          {navlinks.map((link) => (
            <div
              className="flex text-sm w-[10vw] justify-between font-medium"
              key={link.title}
            >
              <Link to={link.href}>
                <p
                  className={`${
                    pathname.includes(link.href) ? "text-fuchsia-500" : "text-white"
                  } cursor-pointer hover:text-fuchsia-500`}
                >
                  {link.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex">
          <ConnectButton accountStatus="avatar" />
          {/* {ensName && ( */}
            <div className="ml-4">
              <Button disabled className="border items-center">
                <p className="text-[10px] text-white mr-2">Ens name:</p>
                {ensName || '-'}
                </Button>
            </div>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
