import { useEffect, useState } from "react";
import useAxiosAuthInstance from "./useAxiosAuthInstance";

export const useBudgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const axiosPrivate = useAxiosAuthInstance();


    useEffect(() => {
        const fetchBudgets = async () => {
        try {
            console.log("Hi")
            const response = await axiosPrivate.get("/api/v1/budgets");
            setBudgets(response.data);
            console.log("budgets in hook: ", response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        };
    
        fetchBudgets();
    }, []);

    const setBudgetsData = (data) => {
        setBudgets(data);
    };
    
    return { budgets, loading, error, setBudgets: setBudgetsData };
    };  