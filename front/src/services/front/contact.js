import { request } from "../../utils/request"

export const getContactInfos = async () => {
    return await request({
        route: '/contact/infos',
    });
}