import { useEffect } from "react";
import "./App.css";
import { SearchBox } from "./components/SearchBox/SearchBox";

function App() {
  useEffect(() => {
    console.log("App");
  }, []);
  return <SearchBox />;
}

export default App;
