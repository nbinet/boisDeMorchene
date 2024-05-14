import { useCallback, useEffect, useState } from 'react';
import { getSocialNetworks } from '../../services/front/contact';
import { useAtom } from 'jotai';
import { socialNetworksAtom } from '../../atoms/tmp/contactAtoms';

const useSocialNetworks = () => {
    const [socialNetworks, setSocialNetworks] = useAtom(socialNetworksAtom);
    const [loading, setLoading] = useState(false);

    const fetchSocialNetworks = useCallback(async () => {
        setLoading(true);
        const { socialNetworks } = await getSocialNetworks();
        setSocialNetworks(socialNetworks);
        setLoading(false);
    }, [setSocialNetworks]);

    useEffect(() => {
        if (socialNetworks)
            return;

        fetchSocialNetworks();
    }, [socialNetworks, setSocialNetworks, fetchSocialNetworks]);

    return {
        socialNetworks,
        setSocialNetworks,
        fetchSocialNetworks,
        loading
    }
}

export default useSocialNetworks;