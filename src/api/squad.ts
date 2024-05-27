import axios from 'axios';
import { leaderboard, user } from '../store/leaderboard';

interface CreateResponse {
    success: boolean;
}
interface SquadResponse {
    squad: any;
}
interface SquadListResponse {
    squadList: any;
}
interface BotnameResponse {
    botname: any;
}
interface LinkResponse {
    link: any;
}
export async function joinSquad(jwt: string, squadId: string): Promise<CreateResponse> {
    const res = await axios.post(
        `/api/squad/join?squadId=${squadId}`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return {
        success: res.data.success
    };
}
export async function leaveSquad(jwt: string): Promise<CreateResponse> {
    const res = await axios.post(
        `/api/squad/leave`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return {
        success: res.data.success
    };
}
export async function createSquad(jwt: string, title: string, originalName: string): Promise<CreateResponse> {
    const res = await axios.post(
        '/api/squad',
        {
            title: title,
            link: originalName
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );

    return {
        success: res.data.success
    };
}
export async function getGameBotName(jwt: string): Promise<string> {
    const res = await axios.get(`/api/botname`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });
    console.log('botname', res.data)
    return res.data.botname;
}
export async function verifySquad(jwt: string, channelLink: string): Promise<CreateResponse> {
  if (channelLink.includes('t.me/+')) {
    return {success: false}
  }
  const link = channelLink.includes('t.me/') ? channelLink.split('t.me/')[1] : channelLink
  const res = await axios.post(
    '/api/squad/verification',
    {
      link: link,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }
  );
  return {
    success: res.data.success
  };
}
export async function getLink(jwt: string): Promise<LinkResponse> {
    const res = await axios.get('/api/links', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        link: res.data
    };
}
export async function getBotname(jwt: string): Promise<BotnameResponse> {
    const res = await axios.get('/api/botname', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        botname: res.data
    };
}
export async function getSquad(jwt: string): Promise<SquadResponse> {
    try {
        const res = await axios.get('/api/squad', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        });

        return {
            squad: res.data
        };
    } catch (e) {
        return {
            squad: null
        };
    }
}
export async function getRandomSquads(jwt: string): Promise<SquadListResponse> {
    const res = await axios.get('/api/squad/list', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    return {
        squadList: res.data.squads
    };
}
