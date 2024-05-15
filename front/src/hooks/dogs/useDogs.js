import { useAtom } from "jotai";
import { dogsAtom } from "../../atoms/dogsAtoms";
import { getAllDogs } from "../../services/backOffice/dogs";
import { useEffect } from "react";
import { useCallback, useState } from "react";

const useDogs = () => {
    const [dogs, setDogs] = useAtom(dogsAtom);
    const [loading, setLoading] = useState(false);

    const fetchDogs = useCallback(async () => {
        setLoading(true);
        const { dogs } = await getAllDogs();
        setDogs(dogs);
        setLoading(false);
    }, [setDogs]);

    useEffect(() => {
        if (dogs)
            return;
            
        fetchDogs();
    }, [fetchDogs, dogs, setDogs]);

    return {
        dogs,
        fetchDogs,
        loading
    }
}

export default useDogs;