import { useContext } from "react";
import { PurchasesDemoContext } from "../../context/PurchasesDemoContext";

const PurchasesList = () => {
  const { purchases } = useContext(PurchasesDemoContext);

  return (
    <div className="flex items-center justify-center ">
      <table className="">
        <thead className="">
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Location</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.date}</td>
              <td>{purchase.category}</td>
              <td>{purchase.location}</td>
              <td>{purchase.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasesList;
