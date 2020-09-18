<template>
    <div>
        <!-- ranges 用来预设时间 -->
        <a-range-picker
            :ranges="time"
            :value="[moment(start_time), moment(end_time)]"
            @change="onChange"
            show-time
        >
        </a-range-picker>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'time-picker',
    props: {
        defaultTime: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            // 预设的时间段
            time: { 
                '今天': [moment(), moment()],
                '当月': [moment(), moment().endOf('month')], 
                '全月': [moment().startOf('month'), moment().endOf('month')],
                '上个星期': [moment().startOf('week'), moment().endOf('week')]
            },
            start_time: undefined,
            end_time: undefined,
        }
    },
    mounted() {
        this.initDate()
    },
    watch: {
        defaultTime: {
            handler: "initDate",
            immediate: true
        }
    },
    methods: {
        initDate() {
            this.start_time = this.defaultTime.start_time
            this.end_time = this.defaultTime.end_time
        },
        moment,
        onChange(dates, dateStrings) {
            this.start_time = dateStrings[0]
            this.end_time = dateStrings[1]
            // console.log('From: ', dates[0], ', to: ', dates[1]);
            // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        },
    },
}
</script>

<style>

</style>