<template class="template">

    <div class="boostContainer">

        <div class="allBoosts">
            <!-- {{ cd }} -->

            <name name="BOOST" />
            <div :class="(profile.maxEnergy == profile.energy || refilled || profile.dailyEnergyRefill == 0) ? 'updateLoading' : 'update'"
                v-on:click="() => restoreEnergy()">

                <div>
                    <div class="updateTitle">
                        🔋RESTORE ENERGY</div>
                    <div class="updateSubtitle">Restore your energy once in a day</div>
                </div>
                <div>
                    <div class="updateSubtitle">
                        daily bonus </div>
                    <div class="updatePoints">FREE<img src="../../assets/back.svg" /></div>
                </div>
            </div>
            <div>
                IMPROVEMENTS
                <!-- <div v-if="clicks && !clicks?.next" class="max">Max level reached</div>
                <div v-if="clicks && profile?.coins < clicks.level.upgradeCost" class="max">Not enough points</div> -->
                <div :class="(clicksMaxLvl || blockedClicks || !clicks?.next || (profile.coins < clicks.level.upgradeCost)) ? 'updateLock' : 'update'"
                    v-if="clicks" v-on:click="() => upClick()">
                    <div v-if="blockedClicks || profile?.coins < clicks.level.upgradeCost || !clicks?.next"
                        class="updateLockTop">LOCKED</div>
                    <div v-if="!clicksMaxLvl" class="updateSmall">
                        <div>
                            <div class="updateTitle">⛓
                                BASED CLICKS</div>
                            <div class="updateSubtitle">Increase points per click to {{ profile?.clickLevel + 1 }}</div>
                        </div>
                        <div>
                            <div class="updateSubtitle">⛓
                                lvl {{ profile?.clickLevel + 1 }} </div>
                            <div class="updateTitle">{{ clicks.level.upgradeCost }}<img src="../../assets/back.svg" />
                            </div>
                        </div>
                    </div>
                  <div v-else class="updateSmall">
                    <div>
                      <div class="updateTitle">⛓
                        BASED CLICKS</div>
                      <div class="updateSubtitle">You reached max level</div>
                    </div>
                    <div>
                      <div class="updateSubtitle">⛓
                        lvl {{ profile?.clickLevel }} </div>
                      <div class="updateTitle">MAX</div>
                    </div>
                  </div>
                </div>
                <!-- <div v-if="energy && profile?.coins < energy.level.upgradeCost" class="max">Not enough points</div> -->
                <div v-if="energy"
                    :class="(energyMaxLvl || blockedEnergy || !energy?.next || (profile?.coins < energy.level.upgradeCost)) ? 'updateLock' : 'update'"
                    v-on:click="() => upEnergy()">
                    <div v-if="blockedEnergy || profile?.coins < energy.level.upgradeCost || !energy?.next"
                        class="updateLockTop">LOCKED</div>
                    <div v-if="!energyMaxLvl" class="updateSmall">
                        <div>
                            <div class="updateTitle">⚡️
                                ENERGY</div>
                            <div class="updateSubtitle">Increase energy limit to {{ energy.level.maxEnergy }}</div>
                        </div>
                        <div>
                            <div class="updateSubtitle">⛓
                                lvl {{ enPoints + 1 }}</div>
                            <div class="updateTitle">{{ energy.level.upgradeCost }}<img src="../../assets/back.svg" />
                            </div>
                        </div>
                    </div>
                  <div v-else class="updateSmall">
                    <div>
                      <div class="updateTitle">⚡️
                        ENERGY</div>
                      <div class="updateSubtitle">You reached max energy</div>
                    </div>
                    <div>
                      <div class="updateSubtitle">⛓
                        lvl {{enPoints}}</div>
                      <div class="updateTitle">MAX</div>
                    </div>
                  </div>
                </div>
                QUESTS
                <a class="questLink" href="https://t.me/onchainchain" target="_blank">
                    <div :class="sub || lock ? 'updateLock' : 'update'" v-on:click="() => {doubleCheck(checkSubscribe)}">
                        <div v-if="sub || lock" class="updateLockTop">{{ lock ? 'LOCKED' : 'COMPLETE' }}</div>
                        <div class="updateSmall">
                            <div>
                                <div class="updateTitle">📣
                                    ONCHAIN NEWS</div>
                                    <div class="updateSubtitle">Join telegram channel</div>
                            </div>
                            <div>
                                <div class="updateSubtitle">⛓
                                    Prize</div>
                                <div class="updateTitle">1000<img src="../../assets/back.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a class="questLink" :href="`/api/redirect/twi?tgId=${getTgID()}`" target="_blank">
                    <div :class="subX || lockX ? 'updateLock' : 'update'" v-on:click="() => doubleCheck(checkSubscribeX)">
                        <div v-if="subX || lockX" class="updateLockTop">{{ lockX ? 'LOCKED' : 'COMPLETE' }}</div>
                        <div class="updateSmall">
                            <div>
                                <div class="updateTitle">🐤
                                    Join Onchain X</div>
                                    <div class="updateSubtitle">Follow Onchain on Twitter</div>
                            </div>
                            <div>
                                <div class="updateSubtitle">⛓
                                    Prize</div>
                                <div class="updateTitle">500<img src="../../assets/back.svg" />

                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a class="questLink" :href="`/api/redirect/postw?tgId=${getTgID()}`" target="_blank">
                    <div :class="subTW || lockTW ? 'updateLock' : 'update'" v-on:click="() => doubleCheck(checkTwit)">
                      <div v-if="subTW || lockTW" class="updateLockTop">{{ lockTW ? 'LOCKED' : 'COMPLETE' }}</div>
                      <div class="updateSmall">
                        <div>
                          <div class="updateTitle">🐤
                            SPREAD THE WORD</div>
                            <div class="updateSubtitle">Tweet and tag @onchaincoin</div>
                        </div>
                        <div>
                          <div class="updateSubtitle">⛓
                            Prize</div>
                          <div class="updateTitle">1500<img src="../../assets/back.svg" />

                          </div>
                        </div>
                      </div>
                    </div>
                </a>
                <!-- <div v-if="energy" :class="'updateLock'">
                    <div class="updateLockTop">LOCKED</div>
                    <div class="updateSmall">
                        <div>
                            <div class="updateTitle">❤️‍🔥
                                Fire boost </div>
                            <div class="updateSubtitle">Under development</div>
                        </div>
                        <div>
                            <div class="updateSubtitle">⛓
                                lvl 0</div>
                            <div class="updateTitle">0<img src="../../assets/back.svg" />
                            </div>
                        </div>
                    </div>
                </div>-->

            </div>
            <div class="ref" v-if="profile?.isAdmin">
                <RouterLink to="/boost2">
                    Boost
                </RouterLink>
            </div>

        </div>


    </div>
</template>

<script lang="ts">
import foot from '@/components/top/footer.vue'
import leaderboard from '@/components/top/table.vue'
import { useUserStore } from '@/store/app';
import { useProfileStore } from '@/store/profile';
import { useBoostStore } from '@/store/boost';
import { getClickBoostLvl, getEnergyBoostLvl, upClickLvl, upEnergyLvl, energyRefill } from '@/api/boost';
import {userInfo, userSubscribe, userSubscribeX, userTwitted} from '@/api/auth';
import { getLeague } from '@/api/leaderboard';
import name from '@/components/squad/name.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
// v-for="i in  getLevel" :key="i"
const energy = ref<any>(undefined)
const enPoints = ref<any>(undefined)
const clicks = ref<any>(undefined)
const blockedEnergy = ref<boolean>(false)
const energyMaxLvl = ref(false)
const blockedClicks = ref<boolean>(false)
const clicksMaxLvl = ref<boolean>(false)

const refilled = ref<boolean>(false)
const cd = ref('')
const sub = ref(false)
const subX = ref(false)
const subTW = ref(false)
const lock = ref(false)
const lockX = ref(false)
const lockTW = ref(false)
const lvl = ref('')
export default {
    name: 'socketFrame',
    components: {
        foot, leaderboard, name
    },
    setup() {
        const profileStore = useProfileStore();
        const userStore = useUserStore();
        const boostStore = useBoostStore()
        const { getJwt } = storeToRefs(userStore);
        const { getProfile } = storeToRefs(profileStore);
        // watch(
        //     () => getProfile.value,
        //     (prof) => {
        //         if(prof) {
        //             enPoints.value = prof.energyLevel
        //         }
        //     }
        // )
        return {
            jwt: getJwt,
            boostStore,
            energy,
            clicks,
            blockedClicks,
            blockedEnergy,
            profile: getProfile,
          clicksMaxLvl,
          energyMaxLvl,
            refilled,
            profileStore,
            cd, lvl, sub, lock, subX, lockX, lockTW, subTW,
            enPoints
        }
    },
    mounted() {
        this.getLevel()
        this.checkSubscribe()
        this.checkSubscribeX()
        this.checkTwit()
        refilled.value = false
        if (this.profileStore.getProfile.energyLevel) {
            enPoints.value = this.profileStore.getProfile.energyLevel
        }
    },
    data: () => ({



    }),
    methods: {
        getTgID() {
            return this.profileStore.getTgId
        },
        getLvlFromMaxEnergy(maxEnergy: number) {
            if (maxEnergy === 500) return 1
            if (maxEnergy === 1000) return 2
            if (maxEnergy === 2000) return 3
            if (maxEnergy === 4000) return 4
            if (maxEnergy === 8000) return 5
            if (maxEnergy === 16000) return 6
            if (maxEnergy === 32000) return 7
            else return 8
        },
        getPrecents(max: number, value: number) {
            // get 100% precentage from value
            return `${(value / max) * 100}%`

        },
        async getLevel() {
            const clc = await getClickBoostLvl(this.jwt)
            const enr = await getEnergyBoostLvl(this.jwt)
            clicks.value = clc.clicks
            energy.value = enr.energy
            clicksMaxLvl.value = Boolean(clc.maxLevel)
            energyMaxLvl.value = Boolean(enr.maxLevel)
        },
        async loadProfile() {
            const info = await userInfo(this.jwt)
            // const res = await getLeague(this.jwt)
            if (!info.success) {
                console.log(`error`, info)
                return
            }
            console.log(`info`, info)
            this.profileStore.setProfile({ ...info.user, isConnected: false, hasBoost: false })
        },
        async doubleCheck(callback: Function) {
          callback()
          setTimeout(() => {
            callback()
          }, 5000)
        },
        async checkSubscribe() {
            lock.value = true
            const res = await userSubscribe(this.jwt)
            cd.value = res
            if (!res.success) {
                console.log(`error`, res)
                sub.value = false
                lock.value = false
            }
            if (res.success) {
                lock.value = false
                sub.value = true
            }

        },
        async checkSubscribeX() {
            lockX.value = true
            const res = await userSubscribeX(this.jwt)
            cd.value = res
            if (!res.success) {
                console.log(`error`, res)
                subX.value = false
                lockX.value = false
            }
            if (res.success) {
                lockX.value = false
                subX.value = true
            }
        },
      async checkTwit() {
        lockTW.value = true
        const res = await userTwitted(this.jwt)
        cd.value = res
        if (!res.success) {
          console.log(`error`, res)
          subTW.value = false
          lockTW.value = false
        }
        if (res.success) {
          lockTW.value = false
          subTW.value = true
        }
      },
        async restoreEnergy() {
            await energyRefill(this.jwt).then((res) => {
                console.log(res);
                let ee = res.energy
                let p = this.profileStore.getProfile

                this.profileStore.setProfile({ ...p, ...ee, isConnected: false, hasBoost: false })
            })

            // this.loadProfile()
            refilled.value = true


        },
        async upClick() {
            blockedClicks.value = true
            try {
                await upClickLvl(this.jwt).then(res => {
                    console.log(res);
                    let ee = res.clicks.data.user
                    let p = this.profileStore.getProfile
                    this.profileStore.setProfile({ ...p, ...ee, isConnected: false, hasBoost: false })
                })
                this.getLevel().then((res) => {
                    console.log(res);
                    blockedClicks.value = false

                })
            } catch (e) {
                blockedClicks.value = false
                console.log(e)
            }
        },
        async upEnergy() {
            blockedEnergy.value = true
            try {
                await upEnergyLvl(this.jwt).then(res => {
                    console.log(res?.energy?.data.user);
                    let ee = res?.enegry?.data?.user
                    let p = this.profileStore.getProfile
                    enPoints.value++
                    this.profileStore.setProfile({ ...p, ...ee, isConnected: false, hasBoost: false })
                })

                this.getLevel().then(() => {
                    blockedEnergy.value = false
                    // this.loadProfile()
                })
            } catch (e) {
                blockedEnergy.value = false
                console.log(e)
            }
        },
    },

}
</script>
<style>
.updateSubtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.65);
    margin-top: 7px;
    margin-bottom: 7px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.updateLockTop {
    width: 100%;
    font-size: 12px;
    margin-top: 10px;
}

.userRow {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 16px;
    align-items: center;
}

.ref {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20px;
    width: 50px;
    height: 50px;
    opacity: 0;
}

.max {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 30px;
    margin-left: -15px;

}

.maxEn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 10px;
    margin-left: -15px;
}

.updateLoading {
    display: flex;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.13);
    border: 1px solid #000;
    backdrop-filter: blur(18px);
    width: 100%;
    height: 74px;
    align-items: center;
    margin-top: 16px;
    opacity: 0.5;
    pointer-events: none;
}

.update {
    display: flex;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(18px);
    border: 1px solid #000;
    width: 100%;
    height: 74px;
    align-items: center;
    margin-top: 16px
}

.allBoosts {
    max-height: calc(100% - 100px);
    overflow-y: scroll;
}

.updateLock {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(18px);
    color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
    width: 100%;
    height: 92px;
    align-items: center;
    margin-top: 16px;
    /* opacity: 0; */
}

.updateLock2 {
    opacity: 0;
}

.updateSmall {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 74px;
    align-items: center;
}

.updatePoints {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 7px;
    margin-bottom: 7px;

    img {
        transform: rotate(180deg);
        margin-left: 5px;
    }
}

.updateTitle {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 7px;
    margin-bottom: 7px;

    img {
        transform: rotate(180deg);
        margin-left: 5px;
    }
}

.boostContainer {
    width: 100%;
    background-size: cover;
    background-position: center;
    color: white;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

.squadRowGen {
    color: rgba(255, 255, 255, 0.65)
}

.squadRowBig {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 7px;
    backdrop-filter: blur(10px) invert(5%);
    border: 1px solid #303030;
}

.squadRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
}
.questLink {
    text-decoration: none;
}
</style>
