<template>
    <!-- {{profile}} -->
    <div v-if="profile?.tgId != undefined && profile.leagueId !== undefined && profile.userRank !== undefined">
        <div :style="{ 'display': profile.hasDisbeliever && !kick2 ? 'flex' : 'none' }" class="isBroken"
            @click="() => kick()"><img src="../../assets/broken.png" /></div>
        <div :style="{ 'display': profile.isBanned ? 'flex' : 'none' }" class="isBroken"> You have been banned. Contact
            admin for more information.</div>
        <div class="userInfoCard">
            {{ profile.fullName }}
        </div>
        <div class="rankRow">
            <RouterLink to="/league">
                <div class="rankRowLeague" :style="{
                    'background': `linear-gradient(${getColor(getLvl(profile.leagueId))}`, 'background-clip': 'text', '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent'
                }">
                    {{
                        getLvl(profile.leagueId) }}<img src="../../assets/back.svg" /></div>
            </RouterLink>

          <div v-if="profile.userRank>0" class="rankRowRank">Rank: <span>{{ profile.userRank }}</span></div>
          <div v-else class="rankRowRank">unranked</div>
        </div>

        <div class="coins__cont">
            <div v-if="!profile.coins||profile.coins>=0" class="coins">
                <img src="../../assets/coin.png" />{{ profile?.coins ? numberWithCommas(profile.coins.toFixed(0)) : 0 }}
            </div>
            <div v-if="profile.coins<0" class="coins c-error">Something get wrong, please contact admin.</div>
        </div>
    </div>
</template>

<script lang="ts">
import { useProfileStore } from '@/store/profile';
import { useBoostStore } from '@/store/boost';
import { getColor, getLvl,numberWithCommas } from '@/utils/get';
import { kickDisbeliever } from '@/api/auth';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/app';
import { ref } from 'vue'
import { watch } from 'vue';
import { profile } from 'console';
// state
const kick2 = ref(false)
const axisX = ref("left")
const axisY = ref(0)
const b = ref(0)
// actions

export default {

    name: 'userInfoCard',
    setup(props) {
        const profileStore = useProfileStore();
        const boostStore = useBoostStore();
        const profile = ref<any>(undefined)
        const userStore = useUserStore();
        const { getJwt } = storeToRefs(userStore);
        const { getProfile } = storeToRefs(profileStore);
        watch(
            () => getProfile.value,
            (prof) => {
                profile.value = prof;
            }
        )
        return {
            profile: profile,
            jwt: getJwt,
            boostStore,
            profileStore,
            kick2,
            axisY,
            axisX,
            b,
            getColor,
            getLvl,
            getProfile,
            numberWithCommas
        };
    },
    mounted() {
        // this.load();
        if (this.getProfile) {
            this.profile = this.getProfile
        }
    },
    methods: {
        randomIntFromInterval(min: number, max: number) { // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        },

        async kick() {

            const res = await kickDisbeliever(this.jwt)
            kick2.value = res.status
            if (!res) {
                return
            }
        },
    }
};
</script>

<style lang="scss" scoped>
.rankRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
}

a {
    text-decoration: none;

}

.coins__cont {
    display: flex;
    justify-content: center;
    width: 100vw;
}

.rankRowRank {
    color: var(--Whitek-W-64, rgba(255, 255, 255, 0.64));
    text-align: center;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    /* 157.143% */
    letter-spacing: 0.7px;

    span {
        color: white;
        font-weight: 500;

    }
}


.isBroken {
    width: 100vw;
    height: 100vh;
    position: absolute;
    justify-content: center;
    top: 0;
    z-index: 999999999999990;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    left: 0;
    align-items: center;
    text-align: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}


.rankRowLeague {
    display: flex;
    align-items: center;
    letter-spacing: 0.7px;
    font-size: 14px;

    img {
        transform: rotate(180deg);
        margin-left: 10px;
        width: 10px;
        height: 10px;
    }
}

.userInfoCard {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    overflow: hidden;
    width: 100%;
    padding-top: 20px;
    text-transform: uppercase;
}

.item {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-family: "Poppins";
    font-size: 16px;
    text-transform: uppercase
}

.coins {
    display: flex;
    font-size: 48px;
    align-items: center;
    justify-content: center;
    width: 300px;
    margin-bottom: 10px;
    margin-top: 30px;
    box-shadow: 0px 20px 20px 40px rgba(0, 0, 0, 1);

    img {
        width: 40px;
        margin-right: 10px;
        height: 40px;
    }
  &.c-error {
    font-size: 24px;
    text-align: center;
  }
}
</style>
