import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useExpensesDemo } from "@/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FilterByDateButton = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { filterByDate } = useExpensesDemo();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  React.useEffect(() => {
    filterByDate(date);
  }, [date]);

  return (
    <div className="flex flex-row">
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[250px] clear-date-range-select-button justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={1985}
              toYear={new Date().getFullYear()}
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="clear-date-range-x-container ">
        <FontAwesomeIcon
          icon={faXmark}
          className="p-3 ml-auto bg-white border rounded-r-lg cursor-pointer border-input clear-date-range-x"
          onClick={() => {
            setDate({ from: undefined, to: undefined });
          }}
        />
      </div>
    </div>
  );
};
export default FilterByDateButton;
