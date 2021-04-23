import { Tooltip } from "ant-design-vue"

export default {
  data () {
    const toolTip = (val) => {
      const elm = (
        <a-tooltip placement="topLeft">
          <template slot="title">
            <span>{val}</span>
          </template>
          <span >{val}</span>
        </a-tooltip>
      )
    }
    return {

    }
  },
  methods: {
    set (val) {
      return toolTip(val)
    }
  }
}
