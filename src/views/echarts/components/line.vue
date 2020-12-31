<template>
    <div>
        <!-- 简单统计图展示 柱状图 -->
        <div style="width: 600px;height: 400px" id="main"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        this.echartsInit()
    },
    methods: {
        echartsInit() {
            this.$echarts.init(document.getElementById('main')).setOption({
                title: {
                    id: '001',
                    show: true,
                    text: '5.0柱状图尝试一下',
                    link: 'http://www.baidu.com',
                    target: 'blank',
                    textStyle: {
                        textBorderColor: 'red'
                    },
                    subtext: '副标题'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
            })
        }
    }
}
</script>

<style>

</style>