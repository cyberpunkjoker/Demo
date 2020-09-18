<script>
// import timerPicker from '../components/timer-picker'

export default {
    // components:{ timerPicker },
    data() {
        return {
            timeObj: {
                start_time: "2020-09-01 14:59:01",
                end_time: '2020-09-10 14:59:01'
            }
        }
    },
    
    methods: {
       changeTime() {
           this.timeObj.start_time = "2020-09-20 14:59:01"
           this.timeObj.end_time = "2020-09-30 14:59:01"
       }
    },
    render(h) {
        return (
            <div>
                使用render函数渲染出来的
                <a-button on-click={this.changeTime}>change time</a-button>
                <Timer-picker key={Math.random()} defaultTime={this.timeObj}></Timer-picker>
                <Timer-picker key={new Date().getTime()} defaultTime={this.timeObj}></Timer-picker>
            </div>
        )
    }
}
</script>

<style>

</style>