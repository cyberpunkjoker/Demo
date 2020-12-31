<template>
    <div>
        <input v-model="postInfo.msg" type="text">
        <input v-model="postInfo.name" type="text">
        <input v-model="postInfo.iphone" type="text">

        <input v-model="mess" type="text">
    </div>
</template>

<script>
export default {
    props: {
        postInfo: {
            type: Object
        },
        mess: {
            type: String,
            default: () => ''
        }
    }
}
</script>

<style>

</style>