<template>
    <div>
        <p>组件之间的传值の=> 我是儿子组件</p>
        <p>孙子组件的值我也可以拿到哦=>>>>{{data}}</p>
        <grandson ref="grandson" v-bind="$attrs" v-on="$listeners" @sendMessage="getMessage"></grandson>
    </div>
</template>

<script>
import grandson from './grandson'

export default {
    components:{grandson},
    data() {
        return {
            data: '你还没有儿子'
        }
    },
    mounted() {
        console.log(this.$attrs);
    },
    methods: {
        getMessage(data) {
            this.data = data
            console.log(data);
        }
    }
}
</script>

<style>

</style>