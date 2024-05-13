import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { racesAtom } from '../../atoms/races';
import { getAllRaces } from '../../services/backOffice/races';

const useRaces = () => {
    const [races, setRaces] = useAtom(racesAtom);
    const [loading, setLoading] = useState(false);

    const fetchRaces = useCallback(async () => {
        setLoading(true);
        const { races } = await getAllRaces();
        setRaces(races);
        setLoading(false);
    }, [setRaces]);

    useEffect(() => {
        if (races)
            return;
            
        fetchRaces();
    }, [fetchRaces, races, setRaces]);

    return {
        races,
        fetchRaces,
        loading
    }
}

export default useRaces;