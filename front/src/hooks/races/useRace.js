import { useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { raceAtom } from '../../atoms/racesAtoms';
import { getRace } from '../../services/front/races';

const useRace = () => {
    const [race, setRace] = useAtom(raceAtom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);

    const fetchRace = useCallback(async slug => {
        setLoading(true);
        const { race, error } = await getRace(slug);
        setRace(race);
        setError(error);
        setLoading(false);
    }, [setRace]);

    return {
        race,
        fetchRace,
        loading,
        error
    }
}

export default useRace;