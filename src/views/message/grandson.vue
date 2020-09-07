<template>
    <div>
        <p>组件之间的传值の=> 我是孙子组件</p>
        <!-- 爷孙组件传值 -->
        <p>这是爷爷传来的值 {{message}}</p>
        <button @click="send">发送消息给父组件</button>
        <button @click="toRefresh">刷新页码数据</button>
    </div>
</template>

<script>
export default {
    inject: {
        message: {
            type: String,
            default: "父组件啥也没传" 
        },
        father: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            mess: '只是测试用的'
        }
    },
    mounted() {
        console.log(this.$attrs);
    },
    methods: {
        send() {
            let message = '孙子组件的值在这里哦'
            this.father.grandsonMessage = message
            // this.$emit('sendMessage', message)
        },
        toRefresh() {
            this.message = 'aba aba aba'
            this.$emit('toRefresh')
        }
    }
}
</script>

<style>

</style>