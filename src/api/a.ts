import axios from 'axios';
import { leaderboard, user } from '../store/leaderboard';

export async function addPoints(jwt: string, tgId: number, coins: number) {
    const res = await axios.post(
        '/api/admin/changekebab',
        { tgId: tgId, coins: coins },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return res.status;
}

export async function banUser(jwt: string, tgId: number) {
    const res = await axios.post(
        `/api/admin/ban`,
        {
            tgId: tgId
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return res.status;
}
export async function findUser(jwt: string, name: string) {
    const res = await axios.get(`/api/admin/search?fullname=${name}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return res.data;
}
export async function findAllUsers(jwt: string) {
    const res = await axios.get(`/api/admin/users`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return res.data;
}
export async function addAdmin(jwt: string, tgId: number) {
    const res = await axios.post(
        '/api/admin/promote',
        { tgId: tgId },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return res.status;
}
export async function changeRefLink(jwt: string, tgId: number, name: string) {
    const res = await axios.post(
        `/api/admin/addchromosome`,
        { tgId: tgId, username: name },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return res.data;
}
export async function init(jwt: string) {
    const res = await axios.post(
        `/api/admin/init`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return res.data;
}
