import EditExpenseButton from "./EditExpenseButton";
import DeleteExpenseButton from "./DeleteExpenseButton";

const ExpenseCard = ({ expense }) => {
  return (
    <>
      <div className="flex justify-between gap-1 p-2 bg-white" key={expense.id}>
        <div className="flex-initial">
          <p>
            <span className="font-bold">Date:</span> {expense.date}
          </p>
          <p>
            <span className="font-bold">Category:</span> {expense.category}
          </p>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {expense.transactionDescription}
          </p>
          <p>
            <span className="font-bold">Cost:</span> {expense.cost}
          </p>
        </div>
        <div className="flex flex-col flex-initial gap-2">
          <EditExpenseButton expense={expense} />
          <DeleteExpenseButton expense={expense} />
        </div>
      </div>
    </>
  );
};

export default ExpenseCard;
