<template>
  <div class="home-container" v-loading="isLoading">
    <!-- First row -->
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con red">
                <font-awesome-icon icon="fa-solid fa-people-group" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.total_user_count ? data.total_user_count : "0" }}
              </h2>
              <h2 class="content">{{ t("dashboard.totalUsers") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con pupple">
                <font-awesome-icon icon="fa-solid fa-arrows-down-to-people" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.today_user_login_count
                    ? data.today_user_login_count
                    : "0"
                }}
              </h2>
              <!-- <h2 class="content">今日登录用户</h2> -->
              <h2 class="content">{{ t("dashboard.todayLoginUsers") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con skyblue">
                <font-awesome-icon icon="fa-solid fa-user-plus" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.today_user_sign_up_count
                    ? data.today_user_sign_up_count
                    : "0"
                }}
              </h2>
              <!-- <h2 class="content">今日注册用户</h2> -->
              <h2 class="content">{{ t("dashboard.todayRegisterUsers") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con green">
                <font-awesome-icon icon="fa-solid fa-user" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.total_admin_count ? data.total_admin_count : "0" }}
              </h2>
              <!-- <h2 class="content">管理员人数</h2> -->
              <h2 class="content">{{ t("dashboard.adminCount") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- End first row -->

    <!-- Second row -->
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con red">
                <font-awesome-icon icon="fa-solid fa-people-group" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.total_eth_users_count ? data.total_eth_users_count : "0"
                }}
              </h2>
              <!-- <h2 class="content">ETH钱包地址用户</h2> -->
              <h2 class="content">{{ t("dashboard.ethUsers") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con pupple">
                <font-awesome-icon icon="fa-solid fa-people-group" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.total_trx_users_count ? data.total_trx_users_count : "0"
                }}
              </h2>
              <!-- <h2 class="content">TRX钱包地址用户</h2> -->
              <h2 class="content">{{ t("dashboard.trxUsers") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con skyblue">
                <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.total_transferred_usdt
                    ? parseFloat(data.total_transferred_usdt).toFixed(2)
                    : "0.00"
                }}
              </h2>
              <!-- <h2 class="content">总归集划转金</h2> -->
              <h2 class="content">{{ t("dashboard.fundsCollections") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con green">
                <font-awesome-icon icon="fa-solid fa-money-bill-transfer" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.total_successful_transactions
                    ? data.total_successful_transactions
                    : "0.00"
                }}
              </h2>
              <!-- <h2 class="content">总交易成功次数</h2> -->
              <h2 class="content">
                {{ t("dashboard.totalSuccessTransaction") }}
              </h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- End second row -->

    <!-- Third row -->
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con red">
                <font-awesome-icon icon="fa-solid fa-dollar-sign" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.eth_wallet_user_balance
                    ? parseFloat(data.eth_wallet_user_balance).toFixed(4)
                    : "0.00"
                }}
              </h2>
              <!-- <h2 class="content">ETH钱包用户余额</h2> -->
              <h2 class="content">{{ t("dashboard.ethUserBal") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con pupple">
                <font-awesome-icon icon="fa-solid fa-dollar-sign" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.trx_wallet_user_balance
                    ? parseFloat(data.trx_wallet_user_balance).toFixed(4)
                    : "0.00"
                }}
              </h2>
              <!-- <h2 class="content">TRX钱包用户余额</h2> -->
              <h2 class="content">{{ t("dashboard.trxUserBal") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con skyblue">
                <font-awesome-icon icon="fa-solid fa-people-group" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.authorized_total_eth_count
                    ? data.authorized_total_eth_count
                    : "0"
                }}
              </h2>
              <!-- <h2 class="content">ETH授权总人数</h2> -->
              <h2 class="content">{{ t("dashboard.ethAuthUsers") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con green">
                <font-awesome-icon icon="fa-solid fa-people-group" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.authorized_total_trx_count
                    ? data.authorized_total_trx_count
                    : "0"
                }}
              </h2>
              <!-- <h2 class="content">TRX授权总人数</h2> -->
              <h2 class="content">{{ t("dashboard.trxAuthUsers") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Third row end  -->

    <!-- Fourth row  -->

    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con red">
                <font-awesome-icon icon="fa-solid fa-people-group" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.authorized_total_trx_count
                    ? data.authorized_total_trx_count +
                      data.authorized_total_eth_count
                    : "0"
                }}
              </h2>
              <!-- <h2 class="content">授权总人数</h2> -->
              <h2 class="content">{{ t("dashboard.totalAuthUsers") }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con pupple">
                <font-awesome-icon icon="fa-solid fa-dollar-sign" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{
                  data.trx_wallet_user_balance
                    ? data.trx_wallet_user_balance
                    : "0"
                }}
              </h2>
              <h2 class="content">TRX钱包用户余额</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con skyblue">
                <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">{{ data.authorized_total_eth_count }}</h2>
              <h2 class="content">ETH授权总人数</h2>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con green">
                <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">{{ data.authorized_total_trx_count }}</h2>
              <h2 class="content">TRX授权总人数</h2>
            </div>
          </div>
        </el-card>
      </el-col> -->
    </el-row>
    <!-- Fourth row end  -->

    <!-- <el-row :gutter="20">
      <el-col :lg="24" :md="24" :xs="24">
        <div>
          <Chart
            :size="{ width: 1000, height: 420 }"
            :data="chartdata"
            :margin="margin"
            :direction="direction"
            :axis="axis"
          >
            <template #layers>
              <Grid strokeDasharray="2,2" />
              <Area
                :dataKeys="['name', 's']"
                type="monotone"
                :areaStyle="{ fill: 'url(#grad)' }"
              />
              <Line
                :dataKeys="['name', 's']"
                type="monotone"
                :lineStyle="{
                  stroke: '#9f7aea',
                }"
              />

              <defs>
                <linearGradient id="grad" gradientTransform="rotate(90)">
                  <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
                  <stop offset="100%" stop-color="white" stop-opacity="0.4" />
                </linearGradient>
              </defs>
            </template>

            <template #widgets>
              <Tooltip
                borderColor="#48CAE4"
                :config="{
                  pl: { color: '#9f7aea' },
                  avg: { hide: false },
                  inc: { hide: false },
                  s: { hide: false },
                }"
              />
            </template>
          </Chart>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, ref } from "vue";
import { Chart, Grid, Line, Tooltip, Area, Marker } from "vue3-charts";
import Web3 from "web3";
import http from "@/http";
import { useI18n } from "vue-i18n";

export default {
  name: "Home",
  components: { Chart, Grid, Line, Tooltip, Area },

  setup() {
    const state = reactive({
      data: {},
      isLoading: false,
    });
    const { t } = useI18n();

    const getDashboardData = () => {
      state.isLoading = true;
      http.user.getDashboard().then((res) => {
        if (res.data.err_code == 0) {
          state.data = res.data.data;
          state.isLoading = false;
        } else {
          state.data = {};
          state.isLoading = false;
        }
      });
    };

    const plByMonth = [
      { name: "1", s: 1, avg: 500, inc: 300 },
      { name: "2", s: 5, avg: 900, inc: 400 },
      { name: "3", s: 3, avg: 400, inc: 500 },
      { name: "4", s: 2, avg: 1300, inc: 700 },
      { name: "5", s: 7, avg: 100, inc: 200 },
      { name: "6", s: 3, avg: 400, inc: 300 },
      { name: "7", s: 1, avg: 90, inc: 100 },
    ];

    const chartdata = ref(plByMonth);
    const direction = ref("horizontal");
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });

    const axis = ref({
      primary: {
        type: "band",
      },
      secondary: {
        domain: ["dataMin", "dataMax + 100"],
        type: "linear",
        ticks: 8,
      },
    });

    onMounted(() => {
      getDashboardData();
    });

    return {
      ...toRefs(state),
      chartdata,
      direction,
      margin,
      axis,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-select .el-input__inner) {
  height: 42px !important;
}

.base-card {
  padding-bottom: 15px;
}

.lose {
  color: #f56c6c;
}

.win {
  color: #000000;
}
.home-card {
  margin-bottom: 20px;
  padding: 20px;
  color: #fff;
  border-radius: 10px;
  box-shadow: none;
  border: none;
  .body {
    display: flex;
    .left {
      .icon-con {
        background: $sidbarActiveBg;
        border-radius: 10px;
        font-size: 30px;
        width: 65px;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .right {
      color: $sidbarActiveBg;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 15px;
      .count {
        font-size: 30px;
        font-weight: bold;
      }
      .content {
        font-size: 20px;
        font-weight: 100;
      }
    }
  }
}
.red {
  background-color: #f05050 !important;
}
.pupple {
  background-color: #7266ba !important;
}
.skyblue {
  background-color: #23b7e5 !important;
}
.green {
  background-color: #27c24c !important;
}
</style>
