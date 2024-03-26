import Routes from "./Routes";
import { ExpensesDemoContextProvider } from "./context";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <ExpensesDemoContextProvider>
        <Routes />
      </ExpensesDemoContextProvider>
    </AuthContextProvider>
  );
}

export default App;
