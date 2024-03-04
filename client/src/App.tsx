import Routes from "./Routes";
import { ExpensesDemoContextProvider } from "./context";

function App() {
  return (
    <ExpensesDemoContextProvider>
      <Routes />
    </ExpensesDemoContextProvider>
  );
}

export default App;
