import { useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { dogAtom } from '../../atoms/dogsAtoms';
import { getDog } from '../../services/front/dogs';

const useDog = () => {
    const [dog, setDog] = useAtom(dogAtom);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);

    const fetchDog = useCallback(async id => {
        setLoading(true);
        const { dog, error } = await getDog(id);
        setDog(dog);
        setError(error);
        setLoading(false);
    }, [setDog]);

    return {
        dog,
        fetchDog,
        loading,
        error
    }
}

export default useDog;