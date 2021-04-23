<template>
    <div>
        <a-tooltip placement="topLeft">
            <template slot="title">
                <span>{{value}}</span>
            </template>
            <p class="over-text">{{value}}</p>
        </a-tooltip>
    </div>
</template>

<script>
export default {
    name: "tool-tips",
    props: {
        // 展示文本
        value: {
            type: String,
        }
    }
}
</script>

<style>
    .over-text {
        width:100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
}
</style>