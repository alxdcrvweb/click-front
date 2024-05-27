import axios from 'axios';
import { leaderboard, user } from '../store/leaderboard';

interface EnergyResponse {
    energy: any;
    maxLevel?: boolean;
}
interface ClickResponse {
    clicks: any;
    maxLevel?: boolean;
}
export async function clickNew(jwt: string, coins: number): Promise<ClickResponse> {
    const res = await axios.post(
        '/api/klick/myself/click',
        { clicks: coins },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return {
        clicks: res.data
    };
}
export async function getEnergyBoostLvl(jwt: string): Promise<EnergyResponse> {
    const res = await axios.get('/api/energy/nlevel', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        energy: res.data,
        maxLevel: !res.data.next
    };
}
export async function getClickBoostLvl(jwt: string): Promise<ClickResponse> {
    const res = await axios.get('/api/clicks/nlevel', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });
  console.log('resclicks', res.data)
    return {
        clicks: res.data,
        maxLevel: !res.data.next
    };
}
export async function energyRefill(jwt: string): Promise<any> {
    const res = await axios.post(
        '/api/boosts/energy',
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );
  console.log('resenergy', res)
    return {
        energy: res.data.user

    };
}
export async function upEnergyLvl(jwt: string): Promise<any> {
    const res = await axios.post(
        '/api/level/energy',
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return {
        energy: res
    };
}
export async function upClickLvl(jwt: string): Promise<ClickResponse> {
    const res = await axios.post(
        '/api/level/clicks',
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );
    return {
        clicks: res
    };
}
