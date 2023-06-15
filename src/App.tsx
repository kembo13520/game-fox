import { useEffect } from "react";
import "./App.css";
import { SearchBox } from "./components/SearchBox/SearchBox";

function App() {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log("App", apiKey);
  }, []);
  return <SearchBox />;
}

export default App;
