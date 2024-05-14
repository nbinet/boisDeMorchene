import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { allSocialNetworksAtom } from '../../../atoms/contactAtoms';
import { getAllSocialNetworks } from '../../../services/backOffice/contact';

const useAllSocialNetworks = () => {
    const [allSocialNetworks, setAllSocialNetworks] = useAtom(allSocialNetworksAtom);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (allSocialNetworks)
            return;

        const fetchAllSocialNetworks = async () => {
            setLoading(true);
            const { socialNetworks } = await getAllSocialNetworks();
            setAllSocialNetworks(socialNetworks);
            setLoading(false);
        }

        fetchAllSocialNetworks();
    }, [allSocialNetworks, setAllSocialNetworks]);

    return {
        allSocialNetworks,
        loading
    }
}

export default useAllSocialNetworks;