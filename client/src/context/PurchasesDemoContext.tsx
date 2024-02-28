import React, { Children, createContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface PurchasesDemoContextProviderProps {
  children: ReactNode;
  // any props that come into the component
}

export const PurchasesDemoContext = createContext([]);

const PurchaseDemoContextProvider = ({
  children,
}: PurchasesDemoContextProviderProps) => {
  const [purchases, setPurchases] = useState([
    {
      id: uuidv4(),
      date: "7/15/2021",
      category: "Transportation",
      location: "Speedway @ Middletown",
      cost: 23.64,
    },
    {
      id: uuidv4(),
      date: "7/15/2021",
      category: "Groceries",
      location: "Walmart @ Westport rd",
      cost: 112.78,
    },
    {
      id: uuidv4(),
      date: "7/17/2021",
      category: "Restaurant",
      location: "Chipotle",
      cost: 8.06,
    },
    {
      id: uuidv4(),
      date: "7/17/2021",
      category: "Wardrobe",
      location: "Macys",
      cost: 31.44,
    },
    {
      id: uuidv4(),
      date: "7/17/2021",
      category: "Pet",
      location: "PetCo @ Middletown",
      cost: 26.11,
    },
    {
      id: uuidv4(),
      date: "7/21/2021",
      category: "Entertainment",
      location: "Bought Fishing Poles",
      cost: 64.36,
    },
    {
      id: uuidv4(),
      date: "7/21/2021",
      category: "Groceries",
      location: "Costco @ HW42",
      cost: 112.78,
    },
    {
      id: uuidv4(),
      date: "7/21/2021",
      category: "Restaurant",
      location: "Panera",
      cost: 10.09,
    },
    {
      id: uuidv4(),
      date: "7/23/2021",
      category: "Wardrobe",
      location: "Amazon",
      cost: 42.11,
    },
    {
      id: uuidv4(),
      date: "7/24/2021",
      category: "Pet",
      location: "Catnip Toy",
      cost: 3.06,
    },
    {
      id: uuidv4(),
      date: "7/24/2021",
      category: "Groceries",
      location: "Fresh Time",
      cost: 65.78,
    },
    {
      id: uuidv4(),
      date: "7/25/2021",
      category: "Groceries",
      location: "Costco",
      cost: 200.36,
    },
    {
      id: uuidv4(),
      date: "7/25/2021",
      category: "Groceries",
      location: "Tea from Online",
      cost: 96.22,
    },
    {
      id: uuidv4(),
      date: "7/25/2021",
      category: "Transportation",
      location: "Gas @ Costco",
      cost: 21.65,
    },
    {
      id: uuidv4(),
      date: "7/26/2021",
      category: "Entertainment",
      location: "Spotify Prescription",
      cost: 12.99,
    },
    {
      id: uuidv4(),
      date: "7/26/2021",
      category: "Wardrobe",
      location: "Shoe Carnival",
      cost: 62.78,
    },
    {
      id: uuidv4(),
      date: "7/26/2021",
      category: "Wardrobe",
      location: "TJMaxx",
      cost: 45.74,
    },
    {
      id: uuidv4(),
      date: "7/26/2021",
      category: "Restaurant",
      location: "Chipotle",
      cost: 8.06,
    },
    {
      id: uuidv4(),
      date: "7/28/2021",
      category: "Insurance",
      location: "Car",
      cost: 107.36,
    },
    {
      id: uuidv4(),
      date: "7/28/2021",
      category: "Groceries",
      location: "Kroger @ Clifton",
      cost: 32.28,
    },
  ]);

  const value = {
    purchases,
    setPurchases,
  };

  return (
    <PurchasesDemoContext.Provider value={value}>
      {children}
    </PurchasesDemoContext.Provider>
  );
};
export default PurchaseDemoContextProvider;
