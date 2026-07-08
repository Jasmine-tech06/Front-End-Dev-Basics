import { useState } from "react";
import Welcome from "./pages/Welcome";
import Catalogue from "./pages/Catalogue";
import Checkout from "./pages/Checkout";
import "./styles/App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");

  return (
    <>
      {currentPage === "welcome" && (
        <Welcome
          onExplore={() => setCurrentPage("catalogue")}
        />
      )}

      {currentPage === "catalogue" && (
        <Catalogue
          onCheckout={() => setCurrentPage("checkout")}
        />
      )}

      {currentPage === "checkout" && (
        <Checkout
          onBackToShop={() => setCurrentPage("catalogue")}
        />
      )}
    </>
  );
}

export default App;