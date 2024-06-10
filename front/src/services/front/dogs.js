import { request } from "../../utils/request";

export const getDog = async id => {
    return await request({
        route: `/dogs/${id}`,
    });
};
