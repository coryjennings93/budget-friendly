import EditExpenseButton from "./EditExpenseButton";
import DeleteExpenseButton from "./DeleteExpenseButton";
import { currencyFormatter, dateFormatter } from "@/utils/utils";

const ExpenseCard = ({ expense }) => {
  // date gets strigified and parsed back as string through saving in local storage and it needs to be in Date format
  if (typeof expense.date === "string") {
    expense.date = new Date(expense.date);
  }
  return (
    <>
      <div className="flex justify-between gap-1 p-2 bg-white" key={expense.id}>
        <div className="flex-initial">
          <p>
            <span className="font-bold">Date:</span>{" "}
            {dateFormatter(expense.date)}
          </p>
          <p>
            <span className="font-bold">Category:</span> {expense.category}
          </p>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {expense.transactionDescription}
          </p>
          <p>
            <span className="font-bold">Cost:</span>{" "}
            {currencyFormatter.format(expense.cost)}
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
