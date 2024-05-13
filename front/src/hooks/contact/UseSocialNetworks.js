import { useEffect, useState } from 'react';
import { getSocialNetworks } from '../../services/front/contact';
import { useAtom } from 'jotai';
import { socialNetworksAtom } from '../../atoms/contactAtoms';

const useSocialNetworks = () => {
    const [socialNetworks, setSocialNetworks] = useAtom(socialNetworksAtom);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (socialNetworks)
            return;

        const fetchSocialNetworks = async () => {
            setLoading(true);
            const { socialNetworks } = await getSocialNetworks();
            setSocialNetworks(socialNetworks);
            setLoading(false);
        }

        fetchSocialNetworks();
    }, [socialNetworks, setSocialNetworks]);

    return {
        socialNetworks,
        setSocialNetworks,
        loading
    }
}

export default useSocialNetworks;