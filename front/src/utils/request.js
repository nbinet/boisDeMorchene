import { API_URL } from "../consts/api";

export const request = async ({ route, method, body, token }) => {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...token && {'Authorization': `Bearer ${token}`}
        },
        ...body && { body: JSON.stringify(body) }
    };
    
    try {
        const res = await fetch(`${API_URL}${route}`, options);
        
        return await res.json();
    } catch (err) {
        
        return { error: true }
    }
}