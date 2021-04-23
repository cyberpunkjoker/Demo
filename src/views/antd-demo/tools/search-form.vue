<script>
// 传入数据结构如下
// schemaList:
// {
// 	title: '选择角色：', //label
// 	type: 'select',		//类型
// 	allowClear: true, 	//清除按钮是否显示
// 	model: 'job',		//对应query里面的查询字段
// 	option: [],			//select 专用数组
// 	style: "",			//样式
//  showTime: ""		//picker 组件属性是否展示全时间
// 	props: {			//多余参数
// 		placeholder: ''
// 	},
// 	on: { }  			//事件
// },
export default {
	name: 'select-render',
    props: {
		schema: {
			type: Array,
			default: ()=>[]
		},
		query: {
			type: Object,
			default: ()=>{}
		},
		span: {
			type: Number,
			default: 3
		}
	},
	computed: {
		//计算class样式， item 为默认样式
		calcCls() {
			return (item) => {
				return item ? item + ' form-item' : 'form-item'
			}
		}
	},
    render(h) {
        return (
			<div class="common-search-form">
				{
					this.schema.map(item => {
						const { type, props, on } = item
						const opt = {
							select: ()=>{
								return (
									<a-select
										allowClear={item.allowClear ? true : false}
										class={this.calcCls(item.class)}
										style={item.style} 
										{...{props, on}}
										v-model={this.query[item.model]}
									>
										{
											item.option.map(option => {
												return (
													<a-select-option value={option.id}>
														{ option.title }
													</a-select-option>
												)
											})
										}
									</a-select>
								)
							},
							picker: ()=>{
								return (
									<a-range-picker
										v-model={this.query[item.model]} 
										show-time={item.showTime ? true : false}
										style={item.style}
										class={this.calcCls(item.class)}
										{...{ props }} 
									/>
								)
							},
							input: ()=>{
								return (
									<a-input
										v-model={this.query[item.model]} 
										class={this.calcCls(item.class)}
										style={item.style}
										{...{ props, on }} 
									/>
								)
							},
						}
						return (
							<a-col span={this.span} class="form-outer-wrap">
								<p>{item.title}</p>
								<p>{opt[type].bind(this)()}</p>
							</a-col>
						)
					})
				}	
            </div>
        )
    }
}
</script>

<style lang="less">
	.common-search-form {
		display: flex;
		.form-outer-wrap {
			padding-right: 20px;
			display: flex;
			.form-item {
				width: 100%;
			}
		}
		
	}
</style>