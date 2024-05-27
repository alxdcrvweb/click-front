<template class="template">
    <!-- <div style="color: white;"> {{ loadingg }}</div> -->
    <PageContainer :verified="squad?.squad.isVerified" :pageTitle="squad? squad?.squad.title : 'Create squad'">
        <div v-if="loadingg" class="isLoading">
            <img src="../../assets/loader.gif" />
        </div>

        <Column v-if="squad?.squad">
            <!-- {{ squad?.squad }} -->
<!--            <name :name="squad?.squad.title" />-->

            <BlockContainer>
              <TwoColumns left="SQUAD TOTAL POINTS" :right="squad?.squad?.points" />
            </BlockContainer>

            <Button :onClick="setViewSquadTop" :reverseIcon="viewSquadTop">
                  <TwoColumns v-if="!viewSquadTop" left="GLOBAL RANK" :right="squad?.squad?.globalRank" />
                  <TwoColumns v-else left="Return" right="" />
            </Button>

            <a v-if="squad?.squad.isVerified" :href="'https://t.me/'+squad?.squad.verifyLink">
              <Button :onClick="setSquadSettings">
                <TwoColumns left="SQUAD SQUARE"><img src="/tg.svg"></TwoColumns>
              </Button>
            </a>
            <Button v-if="!squad?.squad.isVerified && squad?.squad.isOwner" :onClick="setSquadSettings" :reverse-icon="viewSquadSettings">
              <TwoColumns v-if="!viewSquadSettings" left="VERIFY SQUAD"><img src="/tg.svg"></TwoColumns>
              <TwoColumns v-else left="Return" right="" />
            </Button>
            <form v-if="viewSquadSettings && !squad?.squad.isVerified && squad?.squad.isOwner" class="nameForm" v-on:submit="verifySquadHandler">
              <div style="margin-bottom: 20px">
                <label for="squadChanel">Squad channel <img src="/tg.svg"/> :</label>
                <div class="descr">To add a channel and verify the squad, please add our bot <b>@{{ getGameBotName }}</b> to the channel administrators first. Only public channels accepted. <br/>Left field empty to do this step later.</div>
                <input v-on:change="(e) => changeSquadChanel(e)" type="text" id="squadChanel" name="squadChanel" placeholder="t.me/squadlink"
                       :value="squadChanel" />
              </div>
              <button type="submit">Verify</button>
            </form>
        </Column>

        <button v-if="!viewSquadSettings && squad?.squad" :class="!blockLeave ? 'leaveButton' : 'leaveButton loading'"
            @click="leaveCurrentSquad()">
            Leave current squad
        </button>

        <Column v-if="!viewSquadSettings && squad?.threeUsers && squad?.me && !viewSquadTop">
            <!-- {{ squad?.me }} -->
            <leaderboard table-title="squad leaderboard" :my-data=[squad?.me] :table-data=[squad.threeUsers] />
        </Column>

        <Column v-else-if="!viewSquadSettings && viewSquadTop">
            <Title>Top squads</Title>
            <SquadTable :disable-interaction="true" :loadSquad="load" :mySquad="squad?.squad" />
        </Column>

        <Column v-else-if="!viewSquadSettings && !squad?.squad">
            <createSquad :loadSquad="load" />
        </Column>

    </PageContainer>
</template>

<script lang="ts">
import foot from '@/components/top/footer.vue'
import leaderboard from '@/components/top/table.vue'
import { useUserStore } from '@/store/app';
import { useProfileStore } from '@/store/profile';
import { storeToRefs } from 'pinia';
import name from '@/components/squad/name.vue'
import {getSquad, leaveSquad, verifySquad} from '@/api/squad';
import { ref } from "vue"
import createSquad from './squadCreate.vue'
import TwoColumns from "@/components/layouts/TwoColumns.vue";
import Button from "@/components/button/button.vue";
import BlockContainer from "@/components/layouts/BlockContainer.vue";
import Title from "@/components/layouts/Title.vue";
import PageContainer from "@/components/layouts/Page.vue";
// v-for="i in  getLevel" :key="i"
const squad = ref()
const blockLeave = ref()
const loadingg = ref(true)
const viewSquadTop = ref(false)
const viewSquadSettings = ref(false)
const squadChanel = ref('')

export default {
    name: 'socketFrame',
    components: {
      PageContainer,
      Title,
      BlockContainer,
      Button,
      TwoColumns,
        foot, leaderboard, name, createSquad
    },
    setup() {
        const profileStore = useProfileStore();
        const userStore = useUserStore();
        const { getJwt, getGameBotName } = storeToRefs(userStore);

        return {
            getJwt,
            getGameBotName,
        }
    },
    data: () => ({
        loadingg,
        squad,
        blockLeave,
        viewSquadTop,
        viewSquadSettings,
        squadChanel,
    }),
    methods: {
        changeSquadChanel(e: any) {
            squadChanel.value = e.target.value
        },
        setViewSquadTop() {
          viewSquadTop.value = !Boolean(viewSquadTop.value)
        },
        setSquadSettings() {
          viewSquadSettings.value = !Boolean(viewSquadSettings.value)
        },
        async verifySquadHandler(e:any) {
            e.preventDefault()
            if (squadChanel.value.trim().length === 0 || squadChanel.value.includes('t.me/+')) {
                return
            }
            squadChanel.value.trim().length>0 && await verifySquad(this.getJwt, squadChanel.value)
            await this.load()
            this.setSquadSettings()
        },
        async leaveCurrentSquad() {
            blockLeave.value = true
            try {
                const res = await leaveSquad(this.getJwt)
                if (res) {
                    squad.value = null
                    blockLeave.value = false
                    this.load()
                }
            } catch (e) {
                blockLeave.value = false
            }

        },
        getColor(league: string) {
            switch (league) {
                case 'Bronze':
                    return '#DE9038';
                case 'Silver':
                    return '#C0C0C0';
                case 'Gold':
                    return '#FFD700';
                default:
                    return '#FFFFFF';
            }

        },
        async load() {
            // loadingg.value = true
            const res = await getSquad(this.getJwt)
            // loadingg.value = res
            if (res) {
                squad.value = res.squad
            }
            console.log('squad', squad.value)
            loadingg.value = false
        }
    },
    mounted() {
        this.load()
    },
}
</script>
<style lang="scss">
.squadContainer {
    width: 100%;
    background-size: cover;
    background-position: center;
    color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
    justify-content: flex-start;
}

.squadRowGen {
    color: rgba(255, 255, 255, 0.65)
}

a {
    color: white;
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

.leaveButton {
    width: 100%;
    height: 50px;
    border: 1px solid #303030;
    background-color: #1E1E1E;
    color: white;
    text-transform: uppercase;
    flex-shrink: 0;
}

.loading {
    width: 100%;
    height: 50px;
    border: 1px solid #303030;
    background-color: #1E1E1E;
    color: white;
    text-transform: uppercase;
    opacity: 0.5;
    pointer-events: none;
}
</style>
