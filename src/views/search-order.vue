<template>
  <!-- 搜索组件 -->
  <div class="search-order">
    <div class="top">
      <div class="left mr-10">
        <span>筛选条件</span>
        <a-switch v-model="checked" />
      </div>
      <!-- 动态表单 -->
      <a-form-model ref="dynamicValidateForm" :model="dynamicValidateForm" layout="inline">
        <!-- 下单时间 、支付时间-->
        <a-form-model-item prop="time">
          <a-input-group compact>
            <a-select v-model="timeType" style="width: 25%" :options="timeOptions" />
            <a-range-picker
              :value="theTimeValue"
              style="width: 75%"
              show-time
              :format="formatDate"
              @change="timeChange"
            />
          </a-input-group>
        </a-form-model-item>
        <!-- 其他筛选 -->
        <a-form-model-item v-for="(v, i) in dynamicValidateForm.domains" :key="v.key" :prop="'domains.' + i + '.value'">
          <a-input-group compact>
            <a-select
              v-model="v.type_id"
              style="width: 25%"
              :options="v.options"
              @change="value => selectChange(i, value)"
            />
            <a-input v-model="v.value" placeholder="please input domain" style="width: 70%; margin-right: 5px" />
            <a-icon
              v-if="dynamicValidateForm.domains.length > 1 && i > 0"
              class="dynamic-delete-button"
              type="minus-circle-o"
              @click="removeDomain(v)"
            />
          </a-input-group>
        </a-form-model-item>
        <a-form-model-item style="width: 100px">
          <a-button type="link" @click="addDomain"> <a-icon type="plus" /> 搜索条件 </a-button>
        </a-form-model-item>
        <a-form-model-item style="width: 140px">
          <a-button type="primary" html-type="submit" @click="submitForm"> 搜索 </a-button>
          <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div v-if="checked" class="groups">
      <a-button class="mr-10"> L </a-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
//订单时间类型
const TIME_Type = {
  orderTime: 1, //下单时间
  payTime: 2 //支付时间
}
const OPT = {
  course_id: 1, //课程id
  course_name: 2, //课程名称
  mobile: 3, //手机号
  student_name: 4, //昵称
  real_name: 5 //学生姓名
}
export default {
  name: 'search-order',
  components: {},
  props: {},
  data() {
    let that = this
    return {
      TIME_Type,
      OPT,
      formatDate: 'YYYY-MM-DD HH:mm:ss',
      checked: false, //筛选组是否展开
      options: [
        { label: '课程id', key: OPT.course_id },
        { label: '课程名称', key: OPT.course_name },
        { label: '手机号', key: OPT.mobile },
        { label: '昵称', key: OPT.student_name },
        { label: '学生姓名', key: OPT.real_name }
      ],
      dynamicValidateForm: {
        time: undefined,
        domains: []
      },
      timeOptions: [
        { label: '下单时间', key: 1 },
        { label: '支付时间', key: 2 }
      ],
      timeType: 1, //时间类型
      form: {
        created_at_begin: undefined, //创建订单开始时间
        created_at_end: undefined, //创建订单结束时间
        pay_start_begin: undefined, // 支付开始时间
        pay_start_end: undefined, //支付结束时间
        course_id: undefined, //课程ID
        course_name: undefined, //课程名字
        mobile: undefined, //手机号
        real_name: undefined, //学生名字
        student_name: undefined, //昵称
        created_platform: undefined, //订单来源 web,app,wap,yun_ke,dt
        status: undefined, //订单状态  0=待付款，1=已付款，2=已取消（交易关闭）
        course_types: undefined, //课程类型 1：系统班 ，2：专项班 ，3：公开课 ，4：专题课，5：特训班
        subject_ids: undefined, //科目ID
        grades: undefined, //年级ID
        is_free: undefined, //是否是免费  0是0元  1是非零元
        pay_type: undefined //支付类型ID
      }
    }
  },
  computed: {
    theTimeValue() {
      let dateFormat = this.dateFormat
      let st = {}
      st[TIME_Type.orderTime] = () => {
        return this.form.created_at_begin
          ? [moment(this.form.created_at_begin, dateFormat), moment(this.form.created_at_end, dateFormat)]
          : []
      }
      st[TIME_Type.payTime] = () => {
        return this.form.pay_start_begin
          ? [moment(this.form.pay_start_begin, dateFormat), moment(this.form.pay_start_end, dateFormat)]
          : []
      }
      return st[this.timeType]()
    }
  },
  watch: {},
  created() {
    this.checkedIds = new Map()
  },
  mounted() {
    this.addDomain()
  },
  methods: {
    moment,
    onChange(checked) {},
    submitForm(formName) {},
    resetForm(formName) {
      this.$refs.dynamicValidateForm.resetFields()
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      let len = this.dynamicValidateForm.domains.length
      if (len >= 5) return
      console.log(this.checkedIds)
      let arr = [...this.options]
      if (this.checkedIds.size) {
        this.options.forEach((v, i) => {
          let flag = this.checkedIds.forEach(m => {
            if (v.key === m) {
              arr.splice(i, 1)
            }
          })
        })
      }
      console.log(arr)
      this.dynamicValidateForm.domains.push({
        value: '',
        type_id: '',
        options: arr,
        key: Date.now()
      })
    },
    selectChange(index, value) {
      this.checkedIds.set(index, value)
    },
    timeChange(date, dateString) {
      console.log(dateString)
    }
  }
}
</script>
<style lang="scss">
.search-order {
  .top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .groups {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .mr-10 {
    margin-right: 10px;
  }
  .ant-form-item {
    width: 400px;
  }
  .ant-form-item-control-wrapper {
    width: 100%;
  }
}
</style>