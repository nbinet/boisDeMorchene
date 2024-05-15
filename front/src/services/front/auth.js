import { request } from "../../utils/request";

export const login = async (email, password) => {
    return await request({
        route: '/login',
        method: 'post',
        body: {
            email,
            password
        }
    });
}