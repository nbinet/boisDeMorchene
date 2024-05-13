import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { racesAtom } from '../../atoms/races';
import { getAllRaces } from '../../services/backOffice/races';

const useRaces = () => {
    const [races, setRaces] = useAtom(racesAtom);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (races)
            return;

        const fetchAllSocialNetworks = async () => {
            setLoading(true);
            const { races } = await getAllRaces();
            setRaces(races);
            setLoading(false);
        }

        fetchAllSocialNetworks();
    }, [races, setRaces]);

    return {
        races,
        loading
    }
}

export default useRaces;