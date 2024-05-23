import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { allSocialNetworksAtom } from '../../atoms/contactAtoms';
import { getAllSocialNetworks } from '../../services/backOffice/contact';
import { tokenAtom } from '../../atoms/authAtom';

const useAllSocialNetworks = () => {
    const [allSocialNetworks, setAllSocialNetworks] = useAtom(allSocialNetworksAtom);
    const [loading, setLoading] = useState(false);
    const token = useAtomValue(tokenAtom);

    useEffect(() => {
        if (allSocialNetworks)
            return;

        const fetchAllSocialNetworks = async () => {
            setLoading(true);
            const { socialNetworks } = await getAllSocialNetworks(token);
            setAllSocialNetworks(socialNetworks);
            setLoading(false);
        }

        fetchAllSocialNetworks();
    }, [allSocialNetworks, setAllSocialNetworks, token]);

    return {
        allSocialNetworks,
        loading
    }
}

export default useAllSocialNetworks;