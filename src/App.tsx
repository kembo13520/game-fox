import { useEffect } from "react";
import "./App.css";
import { SearchBox } from "./components/SearchBox/SearchBox";

function App() {
  useEffect(() => {
    console.log("App", import.meta.env.VITE_API_KEY);
  }, []);
  return <SearchBox />;
}

export default App;
