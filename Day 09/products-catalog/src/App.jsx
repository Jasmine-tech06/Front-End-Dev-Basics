import { useState } from "react";
import Welcome from "./pages/Welcome";
import Catalogue from "./pages/Catalogue";
import "./styles/App.css";

function App() {
  const [showCatalogue, setShowCatalogue] = useState(false);

  return (
    <>
      {showCatalogue ? (
        <Catalogue />
      ) : (
        <Welcome onExplore={() => setShowCatalogue(true)} />
      )}
    </>
  );
}

export default App;