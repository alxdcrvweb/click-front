import axios from 'axios';
import { leaderboard, user } from '../store/leaderboard';
interface League {
    league: {
        totalCount: number;
        id: number;
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
    };
    me: {
        userRank: number;
        _id: string;
        clicks: number;
        tgId: number;
        coins: number;
    };
    energy: {
        my: number;
        total: number;
    };
}
interface LeagueResponse {
    leagueId: number;
    userRank: number;
}
interface AuthResponse {
    success: boolean;
    leaderboard: leaderboard;
}

export async function getGlobalTop(jwt: string): Promise<AuthResponse> {
    const res = await axios.get('/api/global/rate', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        success: res.data.success,
        leaderboard: res.data,
    };
}
export async function getLeagueTop(jwt: string): Promise<AuthResponse> {
    const res = await axios.get('/api/league/rate', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        success: res.data.success,
        leaderboard: res.data
    };
}
export async function getLeague(jwt: string): Promise<LeagueResponse> {
    const res = await axios.get('/api/league', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        leagueId: res.data.league.id,
        userRank: res.data.me.userRank
    };
}
