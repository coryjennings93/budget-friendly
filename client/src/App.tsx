import Routes from "./Routes";
import { ExpensesDemoContextProvider } from "./context";
import { AuthContextProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
    <AuthContextProvider>
      <ExpensesDemoContextProvider>
        {/* <ScrollToTop /> */}
        <Routes />
      </ExpensesDemoContextProvider>
    </AuthContextProvider>
  );
}

export default App;
