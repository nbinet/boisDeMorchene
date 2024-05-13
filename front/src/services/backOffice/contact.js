import { request } from "../../utils/request"

export const setContactInfos = async (body) => {
    return await request({
        route: '/admin/contact/infos',
        method: 'post',
        body
    });
}

export const getAllSocialNetworks = async () => {
    return await request({
        route: '/admin/contact/reseaux-sociaux/tout',
    });
}

export const deleteSocialNetwork = async label => {
    return await request({
        route: '/admin/contact/reseaux-sociaux',
        method: 'delete',
        body: { label }
    });
}