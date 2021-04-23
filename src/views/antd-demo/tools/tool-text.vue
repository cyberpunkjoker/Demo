<script>
const WIDTH_LIMIT = 0   //宽度限制模式
const COUNT_LIMIT = 1   //数量限制模式
export default {
    props: {
        // 居中方式
        placement: {
            type: String,
            default: 'top'
        },
        // 展示文本
        content: {
            type: String
        },
        // 判断是何种方式提示文本？
            // 宽度限制 or 字数限制
        type: {
            type: Number,
            default: 0
        },
        // 选择模式 1 时所要限制的字数
        maxNum: {
            type: Number,
            default: 10
        }
    },
    render(h) {
        const {type, placement, content, maxNum} = this
        const renderModel = {
            [WIDTH_LIMIT]: ()=>{
                return (
                    <a-tooltip placement={ placement }>
                        <template slot="title">
                            <span>{content}</span>
                        </template>
                        <span class="display-contnet">{content}</span>
                    </a-tooltip>
                )
            },
            [COUNT_LIMIT]: ()=>{
                const isTure =  content.length > maxNum
                let limitContent
                isTure 
                ? limitContent = content.slice(0, maxNum) + '...'
                : limitContent = content
                return (
                    <a-tooltip placement={ placement }>
                        <template slot="title">
                            <span>{content}</span>
                        </template>
                        <span class="display-contnet">{limitContent}</span>
                    </a-tooltip>
                )
            }
        }
        return (
            <div class="common-pop-tool">
               {renderModel[type].bind(this)()}
            </div>
        )
    }
}
</script>
<style lang="less">
    .common-pop-tool {
        .display-contnet {
            display: inline-block;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>