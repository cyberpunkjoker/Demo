<template>
    <div style="padding:32px">
        <From></From>
        <p>分割线————————————————————————</p>
        <!-- <testmodel></testmodel> -->
        <!-- jsx 组件练习 -->
        <p>模式一渲染</p>
        <div v-for="(i, idx) in contentList" :key="idx">
            <toolText style="width:200px" :content="i"></toolText>    
        </div>
        <p>模式二渲染</p>
        <div v-for="(i, idx) in contentList" :key="idx+Math.random()">
            <toolText :content="i" :type="1" :maxNum="10"></toolText>    
        </div>
        <!-- 查询组件的模仿写法 -->
        <p>查询组件：</p>
        <searchForm 
            :span="8"
            :schema="schemaList"
            :query="form"
        ></searchForm>
        <!-- vuex使用问题 -->
        <p>存值操作</p>
        <a-button @click="sendMessageToVuex">send</a-button>
        {{message}}
    </div>
</template>

<script>
import From from './from-model'
import testmodel from './test-form-model'
import toolText from './tools/tool-text'
import searchForm from './tools/search-form'

import test from './extends/test'
import { mapGetters,mapState,mapMutations,mapActions } from "vuex";
import { message } from 'ant-design-vue'

export default {
    components: { From, testmodel, toolText, searchForm },
    extends: test,
    data() {
        return {
            contentList: [
                '测试文本，不能超过XXXXXXX的内容！',
                'test',
                '测试文本，不能超过XXXXXXX的内容！sososososo crazy!!!'
            ],
            form: {
                job: undefined
            },
            schemaList: [
                {
                    title: '选择角色：',
                    type: 'select',
                    allowClear: true,
                    model: 'job',
                    option: [
                        { id:1,title:'测试' },
                        { id:2,title:'开发' }
                    ],
                    props: {
                        placeholder: 'sdsdsdsd'
                    },
                    on: { change: this.onchange}
                },
               
                {
                    type: 'input',
                    allowClear: true,
                    model: 'name',
                    option: [],
                    props: {
                        placeholder: '输入名字'
                    },
                    on: { change: this.onchange}
                },
                 {
                    title: '选择时间段：',
                    type: 'picker',
                    allowClear: true,
                    model: 'time',
                    option: [],
                    props: {
                        placeholder: ['开始时间', '结束时间']
                    },
                    on: { change: this.onchange}
                },

            ]
        }
    },
    computed: {
        ...mapState({
            message: state => state.tm.message
        }),
    },
    methods: {
        onchange() {
        },
        ...mapMutations
        //发送存储在vuex里的值
        sendMessageToVuex() {
            // this.$store.tm.commit('setMessage', '修改了vuex里面的值')
        }
    }
}
</script>

<style>

</style>