import Vue from 'vue'

// 解决antd 验证只取 第一个资源的问题
Vue.directive('delegate', {
    bind(el, binding, vnode) {
        binding; // eslint默认规则没改，不用binding这个参数的话要报错
        // 找到自己所在的FormModelItem节点
        let formItemNode = vnode.child.$parent;
        while (formItemNode !== formItemNode.$root && !formItemNode.$vnode.tag.endsWith('AFormItem')) {
            formItemNode = formItemNode.$parent;
        }
        if (formItemNode === formItemNode.$root) return;
        // 找到自己所在的FormModeFFl节点
        let formNode = formItemNode.$parent;
        while (formNode !== formNode.$root && !formNode.$vnode.tag.endsWith('AFormModel')) {
            formNode = formNode.$parent;
        }
        if (formNode === formNode.$root) return;
        // 得到自己绑定的属性名称
        const prop = formItemNode.$vnode.data.props.prop;
        // 获取校验规则中的所有触发事件
        const eventNames = formNode.$vnode.componentOptions.propsData.rules[prop].map(i => i.trigger);
        eventNames.forEach(eventName => {
            // 使用div、span等包裹时，虽然无法通过正常操作触发blur、change等事件，但这些事件仍然是已经绑定成功了的，只需要在表单控件触发事件的时候，手动触发对应事件即可完成校验
            el.addEventListener(eventName, () => {
                const evt = document.createEvent('HTMLEvents');
                evt.initEvent(eventName, false, false);
                el.parentNode.dispatchEvent(evt);
            });
        });
    }
});

// 指令 demo 集 (如何动态绑定呢？ 类似与v-modal)
Vue.directive('lowertext', {
    bind: function (el, binding, vnode) {
        let bindElm = vnode.elm
        let valid = ['p', 'span'].includes(bindElm.tagName.toLowerCase())
        let which = valid ? 'right' : 'not'
        let opt = {
            'right': () => {
                el.textContent = el.textContent.toLowerCase()
            },
            'not': () => {
                el.value = el.value.toLowerCase()
            }
        }
        opt[which].bind(this)()
    },
})

//动态设置位置(官方例子)
Vue.directive('pin', {
    bind: function(el, binding, vnode) {
        el.style.position = 'fixed'
        el.style.top = binding.value + 'px'
    },
    update: function(el, binding, vnode) {
        if (binding.oldValue === binding.value) return
        el.style.top = binding.value + 'px'
    }
})

//一行展示
Vue.directive('tool-tip', {
    bind: function(el, binding, vnode) {
        el.innerHTML = `<p 
            style="width:100%;
                   overflow: hidden;
                   white-space: nowrap;
                   text-overflow: ellipsis;
                   position: relative
                   " 
            title="${binding.value}">
        ${binding.value}</p>`
    }
})

// 尝试一下手动完成 v-modal
Vue.directive('model', {
    bind: (el, binding, vnode) => {
        el.value = binding.value
    },
    update: (el, binding, vnode) => {
        el.value = binding.value
    }
})

// 
Vue.component('jsx-example', {
    render () {
        function renderContext () {
            return <div id="foo">xxxx</div>
        }
        return (
        <div id="foo">{renderContext()}</div>
      )
    },
    someOtherMethod: () => { // h will not be injected
      return <div id="foo">bar</div>
    }
  })
