import { useMemo } from "react";

const { useLocation } = require("react-router-dom")

const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQuery;