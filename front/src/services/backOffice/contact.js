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

export const setSocialNetwork = async body => {
    return await request({
        route: '/admin/contact/reseaux-sociaux',
        method: 'post',
        body,
    });
}

export const deleteSocialNetwork = async id => {
    return await request({
        route: `/admin/contact/reseaux-sociaux/${id}`,
        method: 'delete',
    });
}