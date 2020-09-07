<template>
    <div>
        <p>组件之间的传值の => 我是父组件</p>
        <!-- 爷孙组件传值 -->
        <p>{{grandsonMessage}}</p>
        <son ref="son" @toRefresh="getInfoList" @sendMessage="getMessage" :title="'adad'" :name="'sdsds'" :mess="otherMessage" :getInfoList="getInfoList"></son>
    </div>
</template>

<script>
import son from './son'

export default {
    components: {son},
    provide() {
        return {
            message: this.fatherMessage,
            father: this
        }
    },
    data() {
        return {
            fatherMessage: '我是你爸爸',
            otherMessage: "我是你爸爸传来的另一条消息",
            grandsonMessage: "你还没有孙子哦"
        }
    },
    mounted() {
        console.log(this.$refs.son.data); // 获取到了子组件的值
        console.log(this.$refs.son.$refs.grandson.mess);
    },
    watch: {
        
    },
    methods: {
        getInfoList() {
            let num = 123
            num ++;
            console.log('asdgfasdfgsagdsad');
        },
        getMessage(data) {
            this.grandsonMessage = data
            console.log(data);
        }
    }
}
</script>

<style>

</style>