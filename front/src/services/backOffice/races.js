import { request } from "../../utils/request"

export const getAllRaces = async (token) => {
    return await request({
        route: '/admin/races',
        token
    });
}

export const setRace = async (body, token) => {
    return await request({
        route: '/admin/races',
        method: 'post',
        body,
        preventJson: true,
        token
    })
}

export const deleteRace = async (id, token) => {
    return await request({
        route: `/admin/races/${id}`,
        method: 'delete',
        token
    });
}