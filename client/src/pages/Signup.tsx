import SignupForm from "@/components/forms/SignupForm";
import LogoIcon from "@/components/icons/LogoIcon";
import { SITE_NAME } from "@/utils/constants";

const Signup = () => {
  return (
    <>
      <div className={"flex flex-col items-center justify-center "}>
        <h1 className="pb-1 m-2 text-4xl text-slate-800 sm:text-7xl gradient-text">
          {SITE_NAME}
        </h1>

        <LogoIcon />
      </div>
      <section className="flex flex-col items-center justify-center flex-1 py-6">
        <SignupForm />
      </section>
    </>
  );
};

export default Signup;
