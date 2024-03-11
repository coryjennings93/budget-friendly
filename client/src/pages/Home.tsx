/// <reference types="vite-plugin-svgr/client" />
import { SITE_NAME } from "../utils/constants";
import { Link } from "react-router-dom";
import LogoIcon from "@/components/icons/LogoIcon";
import NavBar from "@/components/shared/NavBar";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-[url('../src/assets/img/abstract-background.jpg')] bg-no-repeat  ">
        <NavBar />
        <div className="flex gap-10 p-24">
          <div className="flex flex-col items-center justify-center basis-2/3">
            <h1 className="gradient-text">Welcome to Budget Friendly</h1>
            <h2 className="mb-3 md:text-2xl md:p-2">
              Your Wallet's Best Friend!
            </h2>
            <p>
              Are you tired of overspending and constantly feeling stressed
              about your finances? Look no further! Budget Friendly is here to
              revolutionize the way you manage your money. With our intuitive
              app, you'll take control of your finances like never before.
            </p>

            <Link to="/login">
              <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded bg-amber-500 hover:bg-amber-600">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded bg-lime-500 hover:bg-lime-700">
                Sign Up
              </button>
            </Link>
            <Link to="/demo">
              <button className="w-48 px-4 py-2 mt-4 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700">
                Demo
              </button>
            </Link>
          </div>
          <div className="basis-1/3">
            <img
              src="../src/assets/img/budgeting-calculator-2.png"
              alt="smiling calculator"
            />
          </div>
        </div>
      </div>
      <section className="flex gap-20 px-16 bg-[rgb(249,249,249)] py-36">
        <img
          src="../src/assets/img/business-report.png"
          alt="budgeting tools"
        />
        <div className="">
          <h1>Features That Make a Difference:</h1>
          <p>
            <b>Expense Tracking Made Easy:</b> Say goodbye to manual
            calculations and spreadsheets! With Budget Friendly, simply input
            your expenses through our user-friendly form and watch as they
            seamlessly populate into a neatly organized table.
          </p>
          <p>
            <b>Filter and Sort:</b> Need to review your spending habits for a
            specific time period or category? Our app allows you to filter
            expenses effortlessly, giving you valuable insights into where your
            money is going.
          </p>
          <p>
            <b>Budgeting Tools:</b> Take charge of your financial future with
            our budgeting tools. Set personalized budgets for different
            categories and track your progress with ease.
          </p>
          <p>
            <b>Visual Analytics:</b> Visualize your spending patterns with our
            intuitive graphs and charts. Gain valuable insights into your habits
            and make informed decisions about your finances.
          </p>
          <p>
            <b>Secure and Private: </b> Your financial data is precious, and we
            treat it as such. Budget Friendly employs state-of-the-art security
            measures to ensure your information remains safe and private at all
            times.
          </p>
        </div>
      </section>
      <section className="flex flex-row gap-20 p-16 px-16 text-white bg-teal2 py-36">
        <div>
          <h1>Why Choose Budget Friendly?</h1>
          <ul>
            <li>
              <b>Simplicity:</b> Our app is designed with simplicity in mind,
              making it easy for anyone to start managing their finances
              effectively.
            </li>
            <li>
              <b>Affordability:</b> Just like our name suggests, Budget Friendly
              is accessible to everyone. No hidden fees or premium tiers – just
              straightforward financial management tools.
            </li>
            <li>
              <b>Support:</b> We're here for you every step of the way. Have a
              question or need assistance? Our dedicated support team is always
              ready to help.
            </li>
          </ul>
        </div>
        <img
          src="../src/assets/img/lady-who-budgets.png"
          alt="lady who budgets"
        />
      </section>
      <section className="p-16 bg-[rgb(255,246,210)] flex gap-5">
        <img
          src="../src/assets/img/satisfied-person.png"
          alt="satisfied person"
        />
        <div>
          <h1>Join Thousands of Satified Users Today!</h1>
          <p>
            Ready to take control of your finances and start saving money? Sign
            up for Budget Friendly now and experience the difference for
            yourself. Your wallet will thank you!
          </p>
        </div>
      </section>
      <footer className="bg-sky-900">
        <h3>Smiling Calculator:</h3>
        <p>
          <a
            href="https://www.flaticon.com/free-stickers/people"
            title="people stickers"
          >
            People stickers created by Stickers - Flaticon
          </a>
        </p>
        <h3>Satisfied Person Image:</h3>
        <a
          href="https://www.flaticon.com/free-icons/satisfaction"
          title="satisfaction icons"
        >
          Satisfaction icons created by Freepik - Flaticon
        </a>
        <h3>Landing Page Background Image:</h3>
        <p>
          <a href="https://www.vecteezy.com/free-photos/landing-page-background">
            Landing Page Background Stock photos by Vecteezy
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
