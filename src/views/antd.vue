<script>
// import timerPicker from '../components/timer-picker'

export default {
    // components:{ timerPicker },
    data() {
        return {
            timeObj: {
                start_time: "2020-09-01 14:59:01",
                end_time: '2020-09-10 14:59:01',
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
            postInfo:{}
        }
    },
    
    methods: {
       changeTime() {
           this.timeObj.start_time = "2020-09-20 14:59:01"
           this.timeObj.end_time = "2020-09-30 14:59:01"
       },
       postSelectedInfo(data) {
           console.log(data);
           this.postInfo = data
       }
    },
    render(h) {
        return (
            <div>
                使用render函数渲染出来的
                <a-button on-click={this.changeTime}>change time</a-button>
                <Timer-picker key={Math.random()} defaultTime={this.timeObj}></Timer-picker>
                <Timer-picker key={new Date().getTime()} defaultTime={this.timeObj}></Timer-picker>
                <Filter-select
                    filterList={this.filterList}
                    on-postSelectedInfo={this.postSelectedInfo}
                >
                </Filter-select>
            </div>
        )
    }
}
</script>

<style>

</style>