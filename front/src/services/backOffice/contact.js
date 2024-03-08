import { request } from "../../utils/request"

export const setContactInfos = async (body) => {
    return await request({
        route: '/admin/contact/infos',
        method: 'post',
        body
    });
}