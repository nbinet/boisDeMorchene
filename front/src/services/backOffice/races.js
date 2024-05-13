import { request } from "../../utils/request"

export const getAllRaces = async () => {
    return await request({
        route: '/admin/races',
    });
}

export const setRace = async body => {
    return await request({
        route: '/admin/races',
        method: 'post',
        body,
        preventJson: true
    })
}

export const deleteRace = async id => {
    return await request({
        route: `/admin/races/${id}`,
        method: 'delete',
    });
}