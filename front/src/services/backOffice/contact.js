import { request } from "../../utils/request"

export const setContactInfos = async (body, token) => {
    return await request({
        route: '/admin/contact/infos',
        method: 'post',
        body,
        token
    });
}

export const getAllSocialNetworks = async token => {
    return await request({
        route: '/admin/contact/reseaux-sociaux/tout',
        token
    });
}

export const setSocialNetwork = async (body, token) => {
    return await request({
        route: '/admin/contact/reseaux-sociaux',
        method: 'post',
        body,
        token
    });
}

export const deleteSocialNetwork = async (id, token) => {
    return await request({
        route: `/admin/contact/reseaux-sociaux/${id}`,
        method: 'delete',
        token
    });
}