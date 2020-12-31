<template>
	<div>
		<p>使用 v-model 绑定值可以父子组件值统一 而不用子组件传值</p>
		<info-form :postInfo="postInfo" :mess="mess"></info-form>
	</div>
</template>

<script>
import infoForm from './components/info-form'

export default {
	components: { infoForm },
	data() {
		return {
			postInfo: {
				msg: '我是sb',
				name: '任sb',
				iphone: 13550096964
			},
			mess: "wgjshdhagdhgas"
		}
	},
}
</script>

<style>

</style>