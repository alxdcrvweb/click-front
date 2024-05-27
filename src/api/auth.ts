import { profile } from '@/store/profile';
import axios from 'axios';
interface AuthResponse {
    success: boolean;
    token: string;
    error?: string;
}
interface userInfo {
    success: boolean;
    user: profile;
}
export async function checkServerStatus(jwt:string): Promise<{serverIsOpen:boolean}> {
  try {
    const res = await axios.get('/api/server/status');
    return {serverIsOpen:res.data.serverIsOpen};
  } catch (error:any) {
    return {serverIsOpen:false};
  }
}
export async function validateUser(initData: string): Promise<AuthResponse> {
    try {
      const req = { hash: initData };
      const data = await axios.post('/api/validate', req, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return {
        success: data.data.success,
        token: data.data.token,
        error: data.data.error
      };
    } catch (error:any) {
      console.log('error.response',error.response);
      if (error.response.status>=500) {
        return {
          success: false,
          token: '',
          error: 'server unavailable'
        }
      }
      return {
        success: false,
        token: '',
        error: error.response.data.error
      };
    }
}
export async function disconnectUser(): Promise<AuthResponse> {
    // const req = { hash: initData };
    const data = await axios.post(
        '/api/disconnect',
        {},
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return {
        success: data.data.success,
        token: data.data.token
    };
}
export async function userInfo(jwt: string): Promise<userInfo> {
    const data = await axios.get('/api/info', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });
    console.log(data.data);
    return {
        success: data.data.success,
        user: data.data.user
    };
}
export async function userSubscribeX(jwt: string): Promise<any> {
    const data = await axios.get('/api/checksub/tw', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });
    console.log(data.data);
    return {
        success: data.data.status
    };
}
export async function userTwitted(jwt: string): Promise<any> {
  const data = await axios.get('/api/checksub/postw', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  });
  console.log(data.data);
  return {
    success: data.data.status
  };
}
export async function userSubscribe(jwt: string): Promise<any> {
    const data = await axios.get('/api/checksub/tg', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });
    console.log(data.data);
    return {
        success: data.data.status
    };
}
export interface ethBalanceResp {
    status: boolean;
    balance: number;
    error?: any;
}

export async function getEthBalanceApi(jwt: string): Promise<ethBalanceResp> {
    const data = await axios.get('/api/ethBalance', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    const body = data.data as ethBalanceResp;

    return body;
}
export interface nLevelResp {
    next: boolean;
    level: {
        tokensOnClick: number;
        energy: number;
        price: number;

        // num: number;
    };
}

export async function userNextLevel(jwt: string): Promise<nLevelResp | null> {
    const data = await axios.get('/api/nlevel', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
        }
    });

    const body = data.data as nLevelResp;

    return body;
    // return {
    //     success: data.data.success,
    //     user: {
    //         id: data.data.user.id,
    //         username: data.data.user.username,
    //         coins: data.data.user.coins,
    //         clicks: data.data.user.clicks,
    //         level: data.data.user.level,
    //         energy: data.data.user.energy,
    //         maxEnergy: data.data.user.maxEnergy
    //     }
    // };
}

export interface upgradeLevelResponse {
    status: boolean;
    error?: any;
    user: {
        level: number;
        coins: number;
    };
    boostSize?: number;
}
export async function activateBoost(jwt: string): Promise<any> {
    const res = await axios.post(
        '/api/boosts/clicks',
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );
    console.log('activateBoost res.data,',res.data);
    return res.data;
}
export async function kickDisbeliever(jwt: string): Promise<upgradeLevelResponse> {
    const data = await axios.post(
        '/api/disbeliever/kick',
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        }
    );
    return {
        status: data.data.status,
        user: data.data.user,
        error: data.data.error
    };
}
