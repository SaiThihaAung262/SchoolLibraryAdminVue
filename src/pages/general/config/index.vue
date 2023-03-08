<template>
  <div v-loading="isLoading">
    <el-tabs
      type="border-card"
      v-model="activeTabName"
      class="border-card"
      @tab-change="handleTabChange"
    >
      <el-tab-pane :label="t('config.basicConfig')" name="first">
        <el-form
          label-width="200px"
          label-position="left"
          :model="systemConfigParam"
          v-permission="67"
        >
          <el-form-item
            :label="t('config.ethReceiveAdd')"
            prop="eth_wallet_address"
            :rules="[
              {
                required: true,
                trigger: 'blur',
                validator: validateETHwalletAddress(),
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="systemConfigParam.eth_wallet_address"
            />
          </el-form-item>

          <el-form-item
            :label="t('config.trxReceiveAdd')"
            prop="trx_wallet_address"
            :rules="[
              {
                required: true,
                trigger: 'blur',
              },
            ]"
          >
            <!-- validator: validateTRXwalletAddress(), -->
            <el-input
              placeholder=""
              v-model="systemConfigParam.trx_wallet_address"
            />
          </el-form-item>
          <el-form-item
            :label="t('config.iniAmtETH')"
            prop="initial_total_eth_sent"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="systemConfigParam.initial_total_eth_sent"
            />
          </el-form-item>
          <el-form-item
            :label="t('config.iniAmtTRX')"
            prop="initial_total_trx_sent"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="systemConfigParam.initial_total_trx_sent"
            />
          </el-form-item>

          <el-form-item
            :label="t('config.iniAmtUSDT')"
            prop="initial_user_total_revenue_usdt"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="systemConfigParam.initial_user_total_revenue_usdt"
            />
          </el-form-item>
          <el-form-item
            :label="t('config.platformNode')"
            prop="platform_node"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="systemConfigParam.platform_node"
            />
          </el-form-item>
          <el-form-item
            :label="t('config.platformNum')"
            prop="platform_initialized_users"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="systemConfigParam.platform_initialized_users"
            />
          </el-form-item>
          <el-form-item :label="t('config.googleAuth')">
            <el-radio-group v-model="systemConfigParam.google_verfication">
              <el-radio :label="2">{{ t("common.turnOff") }}</el-radio>
              <el-radio :label="1">{{ t("common.turnOn") }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="t('config.turnOnSound')">
            <el-radio-group v-model="systemConfigParam.sound_withdrawal">
              <el-radio :label="2">{{ t("common.turnOff") }}</el-radio>
              <el-radio :label="1">{{ t("common.turnOn") }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="t('config.inboxWithdraw')">
            <el-input placeholder="" v-model="systemConfigParam.inbox_mail" />
          </el-form-item>
          <el-form-item :label="t('config.enableEmail')">
            <el-radio-group v-model="systemConfigParam.email_reminder">
              <el-radio :label="2">{{ t("common.turnOff") }}</el-radio>
              <el-radio :label="1">{{ t("common.turnOn") }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button
            @click="showAuthDialog"
            class="app-button"
            style="margin-bottom: 25px"
            type="primary"
            v-permission="57"
          >
            {{ t("common.sure") }}</el-button
          >
          <el-button
            @click="resetData"
            class="bg-gray"
            style="margin-bottom: 25px"
            type="info"
            v-permission="57"
          >
            {{ t("common.reset") }}</el-button
          >
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="t('config.userConfig')" name="second">
        <el-form
          label-width="210px"
          label-position="left"
          :model="userConfigParams"
          v-permission="67"
        >
          <el-form-item
            :label="t('config.minWithdraw')"
            prop="min_withdrawal_amount"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="userConfigParams.min_withdrawal_amount"
            />
          </el-form-item>
          <el-form-item
            :label="t('config.withdrawFee')"
            prop="withdrawal_fee"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="userConfigParams.withdrawal_fee"
            />
          </el-form-item>
          <el-form-item
            :label="t('config.invitationGiveaway')"
            prop="invitation_give_away"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="userConfigParams.invitation_give_away"
            />
          </el-form-item>
          <el-form-item
            :label="t('config.ETHtoUSDT')"
            prop="eth_to_usdt"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input placeholder="" v-model="userConfigParams.eth_to_usdt" />
          </el-form-item>
          <el-form-item
            :label="t('config.convertTRXtoUSD')"
            prop="trx_to_usdt"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input placeholder="" v-model="userConfigParams.trx_to_usdt" />
          </el-form-item>

          <el-form-item :label="t('config.usdtIsenabled')">
            <el-radio-group v-model="userConfigParams.usdt_enable">
              <el-radio :label="false">{{ t("common.turnOff") }}</el-radio>
              <el-radio :label="true">{{ t("common.turnOn") }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="挖矿浮动区间">
            <el-input
              placeholder=""
              v-model="userConfigParams.mining_floating_range"
            />
          </el-form-item> -->
          <el-form-item :label="t('config.defaultInviteCode')">
            <el-input
              placeholder=""
              v-model="userConfigParams.default_invitation_code"
            />
          </el-form-item>
          <el-form-item
            :label="t('config.giveawayAuthTRX')"
            prop="give_authorized_trx"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="userConfigParams.give_authorized_trx"
            />
          </el-form-item>

          <el-form-item
            :label="t('config.giveawayAuthETH')"
            prop="give_authorized_eth"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="userConfigParams.give_authorized_eth"
            />
          </el-form-item>

          <!-- ---------------------------------------------------------------- -->
          <el-form-item
            :label="t('common.validNode')"
            prop="valid_node"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input placeholder="" v-model="userConfigParams.valid_node" />
          </el-form-item>

          <el-form-item
            :label="t('common.userRevenue')"
            prop="user_revenue_usdt"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="userConfigParams.user_revenue_usdt"
            />
          </el-form-item>

          <el-form-item
            :label="t('common.participant')"
            prop="participant"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input placeholder="" v-model="userConfigParams.participant" />
          </el-form-item>

          <el-form-item
            :label="t('common.totalOutputETH')"
            prop="total_output_eth"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="userConfigParams.total_output_eth"
            />
          </el-form-item>

          <el-form-item
            :label="t('common.totalOutputTRX')"
            prop="total_output_trx"
            :rules="[
              {
                required: true,
                message: t('common.ruleGreaterthan0'),
                trigger: 'blur',
                pattern: /^(0*[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[0-9][0-9]*)$/,
              },
            ]"
          >
            <el-input
              placeholder=""
              v-model="userConfigParams.total_output_trx"
            />
          </el-form-item>
          <!-- ---------------------------------------------------------------- -->

          <el-form-item :label="t('config.miningFloatRange')">
            <el-button
              type="primary"
              style="margin-left: 10px; margin-bottom: 5px"
              circle
              v-if="!userConfigParams.mining_floating_range.data.length"
              @click="plusMiningRange"
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
            </el-button>
            <el-table
              v-if="
                userConfigParams.mining_floating_range.data &&
                userConfigParams.mining_floating_range.data.length
              "
              :data="userConfigParams.mining_floating_range.data"
              style="width: 100%"
            >
              <el-table-column align="center" :label="t('config.serialNum')">
                <template #default="scope"> {{ scope.$index + 1 }} </template>
              </el-table-column>
              <el-table-column align="center" :label="t('config.minAmt')">
                <template #default="scope">
                  <el-input placeholder="" v-model="scope.row.min" />
                </template>
              </el-table-column>
              <el-table-column :label="t('config.maxAmt')" align="center">
                <template #default="scope">
                  <el-input placeholder="" v-model="scope.row.max" />
                </template>
              </el-table-column>
              <el-table-column :label="t('config.profitRatio')" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.percent" placeholder="" />
                </template>
              </el-table-column>
              <el-table-column align="left">
                <template #default="scope">
                  <el-button
                    type="info"
                    style="margin-left: 10px; margin-bottom: 5px"
                    circle
                    @click="minusMiningRange(scope.$index)"
                  >
                    <font-awesome-icon icon="fa-solid fa-minus" />
                  </el-button>
                  <el-button
                    type="primary"
                    style="margin-left: 10px; margin-bottom: 5px"
                    circle
                    v-if="
                      scope.$index ==
                      userConfigParams.mining_floating_range.data.length - 1
                    "
                    @click="plusMiningRange"
                  >
                    <font-awesome-icon icon="fa-solid fa-plus" />
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-button
            @click="showAuthDialog"
            class="app-button"
            style="margin-bottom: 25px"
            v-permission="69"
          >
            {{ t("common.sure") }}</el-button
          >
          <el-button
            @click="resetData"
            style="margin-bottom: 25px"
            type="info"
            v-permission="69"
          >
            {{ t("common.reset") }}</el-button
          >
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      v-model="googleAuthDialog"
      :title="t('common.googleVerifyCode')"
      width="30%"
    >
      <el-form label-width="100px" ref="authDialogRef" :model="googleAuthForm">
        <el-form-item
          label="OTP:"
          prop="otp"
          :rules="[
            { required: true, message: t('common.require'), trigger: 'blur' },
          ]"
        >
          <el-input v-model="googleAuthForm.otp" placeholder="" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <div>
            <el-button @click="googleAuthDialog = false">
              {{ t("common.close") }}
            </el-button>
            <el-button type="primary" @click="confirmAuthDialog(authDialogRef)">
              {{ t("common.sure") }}
            </el-button>
          </div>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed, ref } from "vue";
import http from "@/http";
import { useStore } from "vuex";
import useTableData from "@/hooks/useTableData.js";
import { dateFormat } from "@/utils/timeFormat.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import Web3 from "web3";

export default {
  name: "Profile",
  components: {},
  setup() {
    const { t } = useI18n();
    var web3 = new Web3(Web3.givenProvider);
    const state = reactive({
      isLoading: false,
      showDialog: false,
      filterForm: {},
      pageList: [10, 20, 60, 80, 100],
      param: {
        page: 1,
        page_size: 10,
      },
      dialog: {
        dialogTitle: "",
        dialogData: {},
      },
      imageUrl:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      tableList: [],
      userConfigParams: {
        min_withdrawal_amount: 0,
        withdrawal_fee: 0,
        invitation_give_away: 0,
        eth_to_usdt: 0,
        trx_to_usdt: 0,
        usdt_enable: false,
        // mining_floating_range: "",
        default_invitation_code: "",
        give_authorized_trx: 0,
        give_authorized_eth: 0,
        otp: "",
        mining_floating_range: {
          data: [],
        },
      },
      systemConfigParam: {
        eth_wallet_address: "",
        trx_wallet_address: "",
        initial_total_eth_sent: "",
        initial_total_trx_sent: "",
        initial_user_total_revenue_usdt: "",
        platform_node: "",
        platform_initialized_users: "",
        google_verfication: 1,
        sound_withdrawal: true,
        inbox_mail: "",
        email_reminder: true,
        otp: "",
      },
      googleAuthDialog: false,
      googleAuthForm: {
        otp: "",
      },
      total: 0,
      isAddUserConfig: true,
    });
    const authDialogRef = ref();
    const store = useStore();
    const activeTabName = ref("second");

    const validateTRXwalletAddress = () => {
      return (rule, value, callback) => {
        let isAddTRX = tronWeb.isAddress(value);
        if (!isAddTRX) {
          callback(new Error(t("common.notValidateTRXAdd")));
        } else {
          callback();
        }
      };
    };

    const validateETHwalletAddress = () => {
      return (rule, value, callback) => {
        let isAddETH = web3.utils.isAddress(value);
        if (!isAddETH) {
          callback(new Error(t("common.notValidateETHAdd")));
        } else {
          callback();
        }
      };
    };

    const handleTabChange = () => {};

    const getSystemConfig = () => {
      state.isLoading = true;
      http.general
        .getSystemConfig()
        .then((res) => {
          if (res.data.err_code === 0) {
            state.systemConfigParam = {
              id: res.data.data.system_config.id,
              eth_wallet_address:
                res.data.data.system_config.eth_wallet_address,
              trx_wallet_address:
                res.data.data.system_config.trx_wallet_address,
              initial_total_eth_sent:
                res.data.data.system_config.initial_total_eth_sent,
              initial_total_trx_sent:
                res.data.data.system_config.initial_total_trx_sent,
              initial_user_total_revenue_usdt:
                res.data.data.system_config.initial_user_total_revenue_usdt,
              platform_node: res.data.data.system_config.platform_node,
              platform_initialized_users:
                res.data.data.system_config.platform_initialized_users,
              google_verfication:
                res.data.data.system_config.google_verfication == true ? 1 : 2,
              sound_withdrawal:
                res.data.data.system_config.sound_withdrawal == true ? 1 : 2,
              inbox_mail: res.data.data.system_config.inbox_mail,
              email_reminder:
                res.data.data.system_config.email_reminder == true ? 1 : 2,
            };
            state.isLoading = false;
          }
        })
        .catch((err) => {
          state.isLoading = false;
        });
    };

    const showAuthDialog = () => {
      state.googleAuthDialog = true;
    };

    const confirmAuthDialog = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if (activeTabName.value == "first") {
            state.systemConfigParam.otp = state.googleAuthForm.otp;
            state.systemConfigParam.initial_total_eth_sent = parseFloat(
              state.systemConfigParam.initial_total_eth_sent
            );
            state.systemConfigParam.initial_total_trx_sent = parseFloat(
              state.systemConfigParam.initial_total_trx_sent
            );
            state.systemConfigParam.initial_user_total_revenue_usdt =
              parseFloat(
                state.systemConfigParam.initial_user_total_revenue_usdt
              );
            state.systemConfigParam.platform_node = parseFloat(
              state.systemConfigParam.platform_node
            );
            state.systemConfigParam.platform_initialized_users = parseFloat(
              state.systemConfigParam.platform_initialized_users
            );

            http.general
              .editSystemConfig(state.systemConfigParam)
              .then((res) => {
                if (res.data.err_code == 0) {
                  ElMessage.success(res.data.err_msg);
                  getSystemConfig();
                  state.googleAuthDialog = false;
                  state.googleAuthForm.otp = "";
                } else {
                  ElMessage.error(res.data.err_msg);
                  getSystemConfig();
                }
              });
          } else {
            state.userConfigParams.otp = state.googleAuthForm.otp;
            state.userConfigParams.min_withdrawal_amount = parseFloat(
              state.userConfigParams.min_withdrawal_amount
            );
            state.userConfigParams.withdrawal_fee = parseFloat(
              state.userConfigParams.withdrawal_fee
            );
            state.userConfigParams.invitation_give_away = parseFloat(
              state.userConfigParams.invitation_give_away
            );
            state.userConfigParams.eth_to_usdt = parseFloat(
              state.userConfigParams.eth_to_usdt
            );
            state.userConfigParams.trx_to_usdt = parseFloat(
              state.userConfigParams.trx_to_usdt
            );
            state.userConfigParams.give_authorized_trx = parseFloat(
              state.userConfigParams.give_authorized_trx
            );
            state.userConfigParams.give_authorized_eth = parseFloat(
              state.userConfigParams.give_authorized_eth
            );

            state.userConfigParams.valid_node = parseInt(
              state.userConfigParams.valid_node
            );
            state.userConfigParams.user_revenue_usdt = parseInt(
              state.userConfigParams.user_revenue_usdt
            );
            state.userConfigParams.participant = parseInt(
              state.userConfigParams.participant
            );
            state.userConfigParams.total_output_eth = parseInt(
              state.userConfigParams.total_output_eth
            );
            state.userConfigParams.total_output_trx = parseInt(
              state.userConfigParams.total_output_trx
            );

            if (state.userConfigParams.mining_floating_range.data) {
              for (
                let i = 0;
                i < state.userConfigParams.mining_floating_range.data.length;
                i++
              ) {
                state.userConfigParams.mining_floating_range.data[i].min =
                  parseInt(
                    state.userConfigParams.mining_floating_range.data[i].min
                  );
                state.userConfigParams.mining_floating_range.data[i].max =
                  parseInt(
                    state.userConfigParams.mining_floating_range.data[i].max
                  );
                state.userConfigParams.mining_floating_range.data[i].percent =
                  parseFloat(
                    state.userConfigParams.mining_floating_range.data[i].percent
                  );
              }
            }

            // state.userConfigParams.mining_floating_range = String(
            //   JSON.stringify(state.userConfigParams.mining_floating_range)
            // );

            http.general.editUserConfig(state.userConfigParams).then((res) => {
              if (res.data.err_code == 0) {
                ElMessage.success(res.data.err_msg);
                getUserConfig();
                state.googleAuthDialog = false;
              } else {
                ElMessage.error(res.data.err_msg);
                getUserConfig();
              }
            });
          }
        }
      });
    };

    const submitSystemConfig = () => {
      ElMessageBox.confirm("Are you sure to save this?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
        draggable: true,
      })
        .then(() => {
          state.systemConfigParam.initial_total_eth_sent = parseFloat(
            state.systemConfigParam.initial_total_eth_sent
          );
          state.systemConfigParam.initial_total_trx_sent = parseFloat(
            state.systemConfigParam.initial_total_trx_sent
          );
          state.systemConfigParam.initial_user_total_revenue_usdt = parseFloat(
            state.systemConfigParam.initial_user_total_revenue_usdt
          );
          state.systemConfigParam.platform_node = parseFloat(
            state.systemConfigParam.platform_node
          );
          state.systemConfigParam.platform_initialized_users = parseFloat(
            state.systemConfigParam.platform_initialized_users
          );

          http.general.editSystemConfig(state.systemConfigParam).then((res) => {
            if (res.data.err_code == 0) {
              ElMessage.success(res.data.err_msg);
              getSystemConfig();
            } else {
              ElMessage.error(res.data.err_msg);
              getSystemConfig();
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Canceled",
          });
        });
    };

    const getUserConfig = () => {
      state.isLoading = true;
      http.general
        .getUserConfig()
        .then((res) => {
          if (res.data.err_code == 0) {
            state.userConfigParams = res.data.data.user_config;
            state.isLoading = false;
            state.isAddUserConfig = false;
            // state.userConfigParams.mining_floating_range = {
            //   data: [],
            // };
          }
        })
        .catch((err) => {
          state.isAddUserConfig = true;
          state.userConfigParams = {
            min_withdrawal_amount: 0,
            withdrawal_fee: 0,
            invitation_give_away: 0,
            eth_to_usdt: 0,
            trx_to_usdt: 0,
            usdt_enable: false,
            // mining_floating_range: "",
            default_invitation_code: "",
            give_authorized_trx: 0,
            give_authorized_eth: 0,
            mining_floating_range: {
              data: [],
            },
          };
          state.isLoading = false;
        });
    };

    // const submitUserConfig = () => {
    //   if (state.isAddUserConfig) {
    //     ElMessageBox.confirm("Are you sure to save this?", "Warning", {
    //       confirmButtonText: "OK",
    //       cancelButtonText: "Cancel",
    //       type: "warning",
    //       draggable: true,
    //     })
    //       .then(() => {
    //         http.general.addUserConfig(state.userConfigParams).then((res) => {
    //           if (res.data.err_code == 0) {
    //             ElMessage.success(res.data.err_msg);
    //             getUserConfig();
    //           } else {
    //             ElMessage.error(res.data.err_msg);
    //             getUserConfig();
    //           }
    //         });
    //       })
    //       .catch(() => {
    //         ElMessage({
    //           type: "info",
    //           message: "Canceled",
    //         });
    //       });
    //   } else {
    //     ElMessageBox.confirm("Are you sure to save thissssssssss?", "Warning", {
    //       confirmButtonText: "OK",
    //       cancelButtonText: "Cancel",
    //       type: "warning",
    //       draggable: true,
    //     })
    //       .then(() => {
    //         state.userConfigParams.min_withdrawal_amount = parseFloat(
    //           state.userConfigParams.min_withdrawal_amount
    //         );
    //         state.userConfigParams.withdrawal_fee = parseFloat(
    //           state.userConfigParams.withdrawal_fee
    //         );
    //         state.userConfigParams.invitation_give_away = parseFloat(
    //           state.userConfigParams.invitation_give_away
    //         );
    //         state.userConfigParams.eth_to_usdt = parseFloat(
    //           state.userConfigParams.eth_to_usdt
    //         );
    //         state.userConfigParams.trx_to_usdt = parseFloat(
    //           state.userConfigParams.trx_to_usdt
    //         );
    //         state.userConfigParams.give_away_authorized_trx = parseFloat(
    //           state.userConfigParams.give_away_authorized_trx
    //         );

    //         state.userConfigParams.mining_floating_range = String(
    //           JSON.parse(state.userConfigParams.mining_floating_range)
    //         );
    //         http.general.editUserConfig(state.userConfigParams).then((res) => {
    //           if (res.data.err_code == 0) {
    //             ElMessage.success(res.data.err_msg);
    //             getUserConfig();
    //           } else {
    //             ElMessage.error(res.data.err_msg);
    //             getUserConfig();
    //           }
    //         });
    //       })
    //       .catch(() => {
    //         ElMessage({
    //           type: "info",
    //           message: "Canceled",
    //         });
    //       });
    //   }
    // };

    const resetData = () => {};

    const plusMiningRange = () => {
      let addData = {
        min: 0,
        max: 0,
        percent: 0,
      };
      state.userConfigParams.mining_floating_range.data =
        state.userConfigParams.mining_floating_range.data.concat(addData);
    };

    const minusMiningRange = (row) => {
      state.userConfigParams.mining_floating_range.data =
        state.userConfigParams.mining_floating_range.data.filter(
          (item, index) => {
            return index !== row;
          }
        );
    };

    onMounted(() => {
      // if (activeTabName.value == "second") {
      getUserConfig();
      getSystemConfig();
      // }
    });

    return {
      ...toRefs(state),
      dateFormat,
      windowRect: computed(() => store.state.app.windowRect),
      device: computed(() => store.state.app.device),
      // submitUserConfig,
      resetData,
      activeTabName,
      handleTabChange,
      submitSystemConfig,
      authDialogRef,
      showAuthDialog,
      confirmAuthDialog,
      plusMiningRange,
      minusMiningRange,
      validateTRXwalletAddress,
      validateETHwalletAddress,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
.border-card {
  box-shadow: 2px 4px 8px rgb(190 178 213 / 50%);
  margin-top: 20px;
  border: none;
}

:deep(.el-table th.el-table__cell.is-leaf) {
  border: none !important;
}
:deep(.el-table td.el-table__cell) {
  border: none !important;
}
:deep(.el-table) {
  border: none !important;
}

:deep(.el-table__inner-wrapper::before) {
  display: none !important;
}
</style>
