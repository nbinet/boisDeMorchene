import { API_URL } from "../consts/api";

export const request = async ({ route, method, body, headers, token, preventJson }) => {
    const options = {
        method,
        headers: {
            ...headers,
            ...token && {'Authorization': `Bearer ${token}`}
        },
        ...body && { body: preventJson || (headers && headers['Content-Type']?.includes('multipart/form-data')) ? body : JSON.stringify(body) }
    };
    
    try {
        const res = await fetch(`${API_URL}${route}`, options);
        
        return await res.json();
    } catch (err) {
        
        return { error: true }
    }
}