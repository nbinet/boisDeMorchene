import { useEffect, useState } from 'react';
import { getContactInfos } from '../../../services/front/contact';

const useInfos = () => {
    const [infos, setInfos] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!infos)
            fetchInfos();
    }, [infos]);

    const fetchInfos = async () => {
        setLoading(true);
        const { infos } = await getContactInfos();
        setInfos(infos);
        setLoading(false);
    }

    return {
        infos,
        loading
    }
}

export default useInfos;