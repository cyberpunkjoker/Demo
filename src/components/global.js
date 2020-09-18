import Vue from 'vue'
// name 以大写开头
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const requireComponent = require.context(
    '.', false,/\.vue$/
    // 找到components文件下以 .vue 命名的文件
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    const componentName = capitalizeFirstLetter(
        fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
        // 保留真正的文件名
    )
    
    Vue.component(componentName, componentConfig.default || componentConfig)
})
