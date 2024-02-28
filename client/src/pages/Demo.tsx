import React from "react";
import Header from "../components/shared/Header";
import PurchasesList from "../components/shared/PurchasesList";
import PurchasesDemoContextProvider from "../context/PurchasesDemoContext";

const Demo = () => {
  return (
    <PurchasesDemoContextProvider>
      <Header />
      <PurchasesList />
    </PurchasesDemoContextProvider>
  );
};

export default Demo;
