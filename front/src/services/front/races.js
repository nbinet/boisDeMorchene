import { request } from "../../utils/request"

export const getRace = async slug => {
    return await request({
        route: `/races/${slug}`,
    });
}