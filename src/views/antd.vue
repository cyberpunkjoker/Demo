<script>
// import timerPicker from '../components/timer-picker'

export default {
  // components:{ timerPicker },
  data() {
    return {
      timeObj: {
        start_time: '2020-09-01 14:59:01',
        end_time: '2020-09-10 14:59:01'
      },
      // 下拉菜单信息
      filterList: [
        { label: '课程id', key: 'course_id', tips: '请输入课程id' },
        { label: '课程名称', key: 'course_name', tips: '请输入课程名称' },
        { label: '手机号', key: 'mobile', tips: '请输入手机号' },
        { label: '昵称', key: 'student_name', tips: '请输入昵称' },
        { label: '学生姓名', key: 'real_name', tips: '请输入学生姓名' }
      ],
      // 上传信息
      postInfo: {},
      tabInfo: 'ssss',
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 80,
          sorter: true
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address 1',
          ellipsis: true
        },
        {
          title: 'Long Column Long Column Long Column',
          dataIndex: 'address',
          key: 'address 2',
          ellipsis: true
        },
        {
          title: 'Long Column Long Column',
          dataIndex: 'address',
          key: 'address 3',
          ellipsis: true
        },
        {
          title: 'Long Column',
          dataIndex: 'address',
          key: 'address 4',
          ellipsis: true
        }
      ],
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park, New York No. 1 Lake Park'
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser']
        }
      ],
      reFresh: false
    }
  },


  methods: {
    changeTime() {
      this.timeObj.start_time = '2020-09-20 14:59:01'
      this.timeObj.end_time = '2020-09-30 14:59:01'
    },
    postSelectedInfo(data) {
      console.log(data)
      this.postInfo = data
    },
    callback(val) {
        let obj  = {
            1: { time: 1000, tip: 'tab1的数据' },
            2: { time: 2000, tip: 'tab2的数据' },
            3: { time: 3000, tip: 'tab3的数据' }
        }
        setTimeout(() => {
            this.tabInfo = '请求测试》》》' + obj[val].tip
        }, obj[val].time)
    },
    //清除排序状态
    reset(i) {
      console.log(i)
    },
    changePages(p, f, s) {
      console.log(p, f, s)
    }
  },

  render(h) {
    return (
      <div>
        使用render函数渲染出来的
        <a-button on-click={this.changeTime}>change time</a-button>
        <Timer-picker key={Math.random()} defaultTime={this.timeObj}></Timer-picker>
        <Timer-picker key={new Date().getTime()} defaultTime={this.timeObj}></Timer-picker>
        <Filter-select filterList={this.filterList} on-postSelectedInfo={this.postSelectedInfo}></Filter-select>
        <a-tabs default-active-key="1" on-change={this.callback} forceRender={true} animated={false} tabPosition="left">
          {
            <a-tab-pane key="1" tab="Tab 1">
              {this.tabInfo}
            </a-tab-pane>
          }
          <a-tab-pane key="2" tab="Tab 2">
            {this.tabInfo}
          </a-tab-pane>
          <a-tab-pane key="3" tab="Tab 3">
            {this.tabInfo}
          </a-tab-pane>
        </a-tabs>
        表格测试内容：
        <br />
        <br />
        <br />
        <a-table
          dataSource={this.data}
          columns={this.columns}
          on-change={this.changePages}
          locale={{ filterReset: '重置' }}
        ></a-table>
      </div>
    )
  }
}
</script>

<style>
</style>