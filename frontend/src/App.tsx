import React from "react";
import { RdtProvider } from "./rdt/RdtProvider";
import { rdt } from "./rdt/rdt";
import {
  BrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Header } from "./layout/Header";
import { HomePage } from "./home/HomePage";
import { NonFungiblesPage } from "./nonfungibles/NonFungiblesPage";

function App() {
  return (
    <RdtProvider value={rdt}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/non-fungibles" element={<NonFungiblesPage />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </RdtProvider>
  );
}

export default App;
