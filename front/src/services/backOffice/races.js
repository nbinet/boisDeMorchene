import { request } from "../../utils/request"

export const getAllRaces = async () => {
    return await request({
        route: '/admin/races',
    });
}

export const deleteRace = async id => {
    return await request({
        route: '/admin/race',
        method: 'delete',
        body: { id }
    });
}