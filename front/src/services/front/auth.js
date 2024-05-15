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

export const forgotPassord = async email => {
    return await request({
        route: '/mot-de-passe-oublie',
        method: 'post',
        body: { email }
    });
}

export const verifyResetPassword = async token => {
    return await request({
        route: '/mot-de-passe-oublie/verification',
        method: 'post',
        body: { token }
    });
}

export const resetPassword = async (token, password) => {
    return await request({
        route: '/mot-de-passe-oublie/reinitialisation',
        method: 'post',
        body: {
            token,
            password
        }
    });
}