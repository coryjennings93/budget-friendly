import { SITE_NAME } from "../../utils/constants";
import DemoNavBar from "../shared/DemoNavBar";
import LogoIcon from "../icons/LogoIcon";

const DemoHeader = () => {
  return (
    <>
      <DemoNavBar />
      <div className={"flex flex-col items-center justify-center "}>
        <h1 className="pb-1 m-1text-4xl text-slate-800 md:text-7xl gradient-text">
          {SITE_NAME}
        </h1>
        <p className="mb-3 md:text-2xl md:p-2">A friend for your wallet.</p>
        <LogoIcon />
      </div>
    </>
  );
};

export default DemoHeader;
