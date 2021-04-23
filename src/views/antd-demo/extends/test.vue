<script>
export default {
    data() {
        return {
            headerInfo: '我是头部啊',
            count: 0
        }
    },
    methods: {
        renderHeader() {
            const {headerInfo, count} = this
            const testClick = () => {
                this.count++
                console.log(this.count);
                this.headerInfo += count
            }
            return(
                <div>
                    {headerInfo}
                    <a-button on-click={testClick}>点我</a-button>
                </div>
            )
        }
    },
    render(h) {
        return (
            <div>
                {this.renderHeader()}
            </div>
        )
    }
}
</script>

<style>

</style>