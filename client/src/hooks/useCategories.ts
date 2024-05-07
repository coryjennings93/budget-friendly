import { useEffect, useState } from "react";
import useAxiosAuthInstance from "./useAxiosAuthInstance";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const axiosPrivate = useAxiosAuthInstance();


    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response = await axiosPrivate.get("/api/v1/categories");
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        };
    
        fetchCategories();
    }, []);

    const setCategoriesData = (data) => {
        setCategories(data);
    };
    
    return { categories, loading, error, setCategories: setCategoriesData};
    };  