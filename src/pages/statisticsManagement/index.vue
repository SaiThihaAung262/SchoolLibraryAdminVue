<template>
  <div class="home-container" v-loading="isLoading">
    <!-- about usdt  -->
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con red">
                <font-awesome-icon icon="fa-solid fa-circle-dollar-to-slot" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">所有鱼苗统计</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con pupple">
                <font-awesome-icon icon="fa-solid fa-circle-dollar-to-slot" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">授权鱼苗统计</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con skyblue">
                <font-awesome-icon icon="fa-solid fa-circle-dollar-to-slot" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">当日活跃授权鱼苗统计</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con green">
                <font-awesome-icon icon="fa-solid fa-circle-dollar-to-slot" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.total_usdt ? data.total_usdt : "--" }}
              </h2>
              <h2 class="content">总归集USDT</h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- about eth  -->
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con red">
                <font-awesome-icon icon="fa-solid fa-e" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">今日ETH充值</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con pupple">
                <font-awesome-icon icon="fa-solid fa-e" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">昨日ETH充值</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con skyblue">
                <font-awesome-icon icon="fa-solid fa-e" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">本月ETH充值</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con green">
                <font-awesome-icon icon="fa-solid fa-e" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.total_eth ? data.total_eth : "--" }}
              </h2>
              <h2 class="content">总ETH充值</h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- about trx  -->
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con red">
                <font-awesome-icon icon="fa-solid fa-t" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">今日TRX充值</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con pupple">
                <font-awesome-icon icon="fa-solid fa-t" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">昨日TRX充值</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con skyblue">
                <font-awesome-icon icon="fa-solid fa-t" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">
                {{ data.user_sign_up_count ? data.user_sign_up_count : "--" }}
              </h2>
              <h2 class="content">本月TRX充值</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con green">
                <font-awesome-icon icon="fa-solid fa-t" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">{{ data.total_trx }}</h2>
              <h2 class="content">总TRX充值</h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- about withdraw  -->
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con red">
                <font-awesome-icon icon="fa-solid fa-money-bill-trend-up" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">{{ data.today_withdrawal }}</h2>
              <h2 class="content">今日提现</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con pupple">
                <font-awesome-icon icon="fa-solid fa-money-bill-trend-up" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">{{ data.yestarday_withdrawal }}</h2>
              <h2 class="content">昨日提现</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con skyblue">
                <font-awesome-icon icon="fa-solid fa-money-bill-trend-up" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">{{ data.month_withdrawal }}</h2>
              <h2 class="content">本月提现</h2>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="6" :md="12" :xs="24">
        <el-card :body-style="{ padding: '0px' }" class="home-card">
          <div class="body">
            <div class="left">
              <div class="icon-con green">
                <font-awesome-icon icon="fa-solid fa-money-bill-trend-up" />
              </div>
            </div>
            <div class="right">
              <h2 class="count">{{ data.total_withdrawal }}</h2>
              <h2 class="content">总提现</h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import http from "@/http";

export default {
  name: "Home",
  components: {},
  setup() {
    const state = reactive({
      data: {},
      isLoading: false,
    });

    const getDashboardData = () => {
      state.isLoading = true;
      http.statisticsManagement.getStatistics().then((res) => {
        if (res.data.err_code == 0) {
          state.data = res.data.data;
          state.isLoading = false;
        }
      });
    };

    onMounted(() => {
      getDashboardData();
    });

    return {
      ...toRefs(state),
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
        width: 60px;
        height: 60px;
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
        font-size: 25px;
        font-weight: bold;
      }
      .content {
        font-size: 16px;
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
