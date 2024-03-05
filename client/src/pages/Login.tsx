import React from "react";

const Login = () => {
  let array = [
    {
      id: "2",
      date: "2/23/2120",
      category: "red",
      descriptionOrLocation: "living room",
      cost: 5.55,
    },
    {
      id: "3",
      date: "2/24/2120",
      category: "green",
      descriptionOrLocation: "dining room",
      cost: 7.66,
    },
    {
      id: "4",
      date: "2/25/2120",
      category: "purple",
      descriptionOrLocation: "bed room",
      cost: 8.22,
    },
  ];

  let expense = {
    id: "2",
    date: "2/23/2120",
    category: "red",
    descriptionOrLocation: "living rsoom",
    cost: 5.55,
  };

  let updatedExpense = {
    id: "2",
    date: "2/23/2120",
    category: "red",
    descriptionOrLocation: "living room",
    cost: 10.22,
  };

  // let thirdExspense = expense.id === updatedExpense.id ? {
  // expense = { ...expense, category: "red", date: "2/22/2120", descriptionOrLocation: "living room", cost:10.22 } :
  // expense
  // }

  const id = "3";
  const date = "2/28/2120";
  const category = "grey";
  const descriptionOrLocation = "kitchen";
  const cost = 23.65;

  const updatedArray = array.map((expense) => {
    return expense.id === id
      ? { ...expense, date, category, descriptionOrLocation, cost }
      : expense;
  });

  console.log(array);
  console.log(updatedArray);

  return <div>Login</div>;
};

export default Login;
