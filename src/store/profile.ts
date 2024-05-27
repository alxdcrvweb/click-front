import { defineStore } from 'pinia';
export interface profile {
    isConnected: boolean;
    coins: number;
    fullName: string;
    clicks: number;
    level: number;
    energy: number;
    hasBoost: boolean;
    maxEnergy: number;
    hasDisbeliever: boolean;
    leagueId: number;
    userRank: number;
    energyLevel: number;
    dailyEnergyRefill: number;
    clickLevel: number;
    isAdmin: boolean;
    isFirstTime: boolean;
    referals: number;
    isUpdated: boolean;
    tgId: number;
    tooFastClicker: boolean;
}
export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: {
            isConnected: false,
            coins: 0,
            fullName: '/me',
            clicks: 0,
            level: 0,
            energy: 0,
            maxEnergy: 0,
            hasBoost: false,
            hasDisbeliever: false,
            leagueId: 0,
            userRank: 0,
            dailyEnergyRefill: 0,
            energyLevel: 0,
            clickLevel: 0,
            isAdmin: false,
            isFirstTime: false,
            referals: 0,
            tgId: 0,
            tooFastClicker: false
        },
        stage: 0,
        isUpdated: false,

    }),
    actions: {
        setProfile(profile: profile) {
            this.profile = profile;
        },
        setStage(st: number) {
            this.stage = st;
        },
        setUpdated(up: boolean) {
            console.log('aaaaa');
            this.isUpdated = up;
        },
        setIsConnected(isConnected: boolean) {
            this.profile.isConnected = isConnected;
        },
        setCoins(coins: number) {
            this.profile.coins = coins;
        },
        setClicks(clicks: number) {
            this.profile.clicks = clicks;
        },
        setBoost(hasBoost: boolean) {
            this.profile.hasBoost = hasBoost;
        },
        setLevel(level: number) {
            this.profile.level = level;
        },
        setEnergy(energy: number) {
            this.profile.energy = energy;
        },
        setMaxEnergy(maxEnergy: number) {
            this.profile.maxEnergy = maxEnergy;
        },
        setLeagueId(leagueId: number) {
            this.profile.leagueId = leagueId;
        },
        setUserRank(userRank: number) {
            this.profile.userRank = userRank;
        },
        setTooFastClicker(tooFastClicker: boolean) {
            this.profile.tooFastClicker = tooFastClicker;
        }
    },
    getters: {
        getProfile: (state) => state.profile,
        getLevel: (state) => state.profile.level,
        getEnergy: (state) => state.profile.energy,
        getMaxEnergy: (state) => state.profile.maxEnergy,
        getClicks: (state) => state.profile.clicks,
        getCoins: (state) => state.profile.coins,
        getIsConnected: (state) => state.profile.isConnected,
        getLeagueId: (state) => state.profile.leagueId,
        getUserRank: (state) => state.profile.userRank,
        getStage: (state) => state.stage,
        getUpdated: (state) => state.isUpdated,
        getTgId: (state) => state.profile.tgId,
        getTooFastClicker: (state) => state.profile.tooFastClicker
    }
});
