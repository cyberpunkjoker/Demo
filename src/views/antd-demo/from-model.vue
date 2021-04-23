<template>
    <div ref="formPage">
        <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="{span: 4}"
            :wrapper-col="{span: 12}"
        >
            <a-form-model-item label="Activity form" prop="desc">
                <!-- 内容自动被包裹一层 -->
                <div>
                    <span>23423</span>
                    <a-input v-model="form.desc" type="textarea" v-delegate/>
                    <!-- 此处有一个布局问题。因为antd-vue的表单验证的错误信息文字布局方式是使用一个单独的span节点置于内容节点的同级之后，因此当表单控件不在内容最后时，将与错误信息文字分开显示。 -->
                </div>
                <span>34534</span>
                <!-- 内容自动被包裹一层 -->
                <!-- 此处显示错误信息文字节点 -->
            </a-form-model-item>
        </a-form-model>


        <!-- 以下为测试指令的一些代码 -->
        <p v-pin="num">Stick me 200px from the top of the page</p>
        <p v-tool-tip="tipValue" style="width: 200px"></p>
        <!-- {{toolTip(tipValue)}} -->

        <Tool-tips style="width: 200px" :value="tipValue"></Tool-tips>

        <p>{{tipValue}}</p>
        <input v-model="tipValue">
        <!-- <iframe width="600px" height="500px" src="https://www.baidu.com" frameborder="0"></iframe> -->
    
        <jsx-example :id="12313" :fun="changeTopNum"></jsx-example>
    </div>
</template>

<script>
import mixinsTool from '../../mixins/mixins-tool'

export default {
    mixins: [mixinsTool],
    data() {
        return {
            someInfo: {
                value: 'text content',
            },
            form: {
                desc: undefined,
                a: undefined,
                b: undefined,
                c: undefined,
                d: undefined
            },
            rules: {
                desc: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' }
                ]
            },
            tipValue: 'this is just a test text => sjadakldjkkdjlakdkasd(about me)',
            num: 100,
            render: () => <div>xxxxx</div>
        }
    },
    mounted() {
        this.$refs.formPage.addEventListener('click', this.changeTopNum)
    },
    computed: {
        
    },
    methods: {
        changeTopNum() {
            this.num +=10
        },
       
    }
}
</script>

<style>

</style>