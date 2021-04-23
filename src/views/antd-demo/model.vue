<template>
  <div style="float: left">
    <a-button 
      type="link" 
      style="padding:0;margin-right:10px"
      @click="visible = true"
    >{{type===0 ? '详情' : '编辑'}}</a-button>

    <a-modal
      title="Title"
      :visible="visible"
      width="960px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="setForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="礼品名称" prop="name">
          <a-input v-model="form.name" placeholder="请输入礼品名称"/>
        </a-form-model-item>

        <a-form-model-item label="礼品类型" prop="region">
          <a-select v-model="form.region" placeholder="please select your zone">
            <a-select-option value="shanghai">
              Zone one
            </a-select-option>
            <a-select-option value="beijing">
              Zone two
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item ref="name" label="礼品名称" prop="name">
          <a-input v-model="form.name" placeholder="请输入礼品名称"/>
        </a-form-model-item>

        <a-form-model-item ref="name" label="选择课程" prop="name">
          <div
            v-for="(i, idx) in courseList"
            :key="idx"
            class="course-item"
            style="display: flex"
          >
            <a-icon class="reduce-icon" type="minus-circle" @click="delDomain(idx)" />
            <a-select v-model="form.region" class="grade-sel" style="width: 120px" placeholder="请选择年级">
              <a-select-option 
                v-for="i in gradeList"
                :key="i.id"
                :value="i.id"
              >
                {{i.title}}
              </a-select-option>
            </a-select>
            <!-- <listSelect style="flex: 1"></listSelect> -->
          </div>

          <a-button type="dashed" style="width: 60%" @click="addDomain">
            <a-icon type="plus" /> Add field
          </a-button>
        </a-form-model-item>

        <a-form-model-item label="礼品图片">
          <!-- <upload 
            :beforeUpload="beforeUpload"
            :afterUpload="(file)=>afterUpload( file, 'enter')"
          >
            <imgDisplay
              class="entranceImg"
              :imgurl="giftImg" 
              type='entranceImg'
              :maxSize="2"
              @changeImg="changeImg"
              @delImg="delImg"
            ></imgDisplay>
          </upload> -->
          <span>（支持png/jpg/jpeg格式，大小不超过3MB）</span>
        </a-form-model-item>

      </a-form-model>

    </a-modal>
  </div>
</template>

<script>
// import listSelect from './list-selected'
// import imgDisplay from './img-display'
// import upload from '_c/uploadoss/index.vue'

export default {
//   components: { listSelect, imgDisplay, upload },
  props: {
    // 1 编辑，0 详情
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      labelCol: { span: 2 },
      wrapperCol: { span: 15 },
      form: {},
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ]
      },
      giftImg: '',
      gradeList: [
        {id: 1, title: '一年级'},
        {id: 2, title: '二年级'},
        {id: 3, title: '三年级'},
        {id: 4, title: '二年级'},
        {id: 5, title: '二年级'},
      ],
      courseList: [
        1
      ]
    }
  },
  
  methods: {
    handleOk() {
      this.visible =false
    },
    handleCancel() {
      this.visible = false
    },
    addDomain() {
      this.courseList.push('')
    },
    delDomain(idx) {
      this.courseList.splice(idx, 1)
    },
    beforeUpload(file) {
      const maxSize = 2
      const isLt2M = file.size / 1024 / 1024 < maxSize
      if (!isLt2M) {
        this.$message.error(`上传文件不能大于${maxSize}M`)
        return false
      }
    },
    afterUpload(file) {
      this.giftImg = file.relativeUrl
    },
    // 更换图片
    changeImg(data) {
      const { type, file } = data
      this.giftImg = file
    },
    // 删除图片
    delImg(data) {
      this.giftImg = ''
    },
  }
}
</script>

<style lang="less" scope>
  .course-item {
    .reduce-icon {
      font-size: 20px;
      margin-right: 15px;
      line-height: 35px;
    }
    .grade-sel {
      margin-right: 15px;
    }

  }
  // .form-item-width {
  //   width: 70%;
  // }

</style>