import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export const Header = () => {
  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>Radix Wallet Integration</div>

      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={"/non-fungibles"}
      >
        Non-Fungibles
      </Link>

      <div>
        <radix-connect-button />
      </div>
    </Layout.Header>
  );
};
