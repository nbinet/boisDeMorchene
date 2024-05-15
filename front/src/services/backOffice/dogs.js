import { request } from "../../utils/request"

export const getAllDogs = async () => {
    return await request({
        route: '/admin/dogs',
    });
}

export const setDog = async body => {
    return await request({
        route: '/admin/dogs',
        method: 'post',
        body,
        preventJson: true
    })
}

export const deleteDog = async id => {
    return await request({
        route: `/admin/dogs/${id}`,
        method: 'delete',
    });
}

