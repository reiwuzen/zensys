import { invoke } from "@tauri-apps/api/core";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Workspace from "./workspace/workspace";
import { useEffect } from "react";
function App() {

  
  useEffect(() => {
    invoke("page_store_dir");
  }, []);
  return (
    <main className="container">
      <Navbar />
      <Workspace />
    </main>
  );
}

export default App;
