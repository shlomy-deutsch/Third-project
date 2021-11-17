import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="layout-container">
        <Header />
        <main>
          <Routing />
        </main>
      </div>
    </BrowserRouter>
  );
}
