import { useCallback, useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { racesAtom } from '../../atoms/racesAtoms';
import { getAllRaces } from '../../services/backOffice/races';
import { tokenAtom } from '../../atoms/authAtom';

const useRaces = () => {
    const [races, setRaces] = useAtom(racesAtom);
    const [loading, setLoading] = useState(false);
    const token = useAtomValue(tokenAtom);

    const fetchRaces = useCallback(async () => {
        setLoading(true);
        const { races } = await getAllRaces(token);
        setRaces(races);
        setLoading(false);
    }, [setRaces, token]);

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