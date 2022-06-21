<template>
    <!-- bidirectional data binding（双向数据绑定） -->
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
    </quill-editor>

    <!-- Or manually control the data synchronization（或手动控制数据流） -->
    <quill-editor :content="content" :options="editorOption" @change="onEditorChange($event)">
    </quill-editor>
</template>
 
<script>

// you can also register quill modules in the component
import Quill from 'quill'
import { someModule } from '../yourModulePath/someQuillModule.js'
Quill.register('modules/someModule', someModule)

export default {
    name: 'HelloTest',
    data() {
        return {
            content: '',
            editorOption: {
                // some quill options
            }
        }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },

    async mounted() {
        // console.log(this.$route.params.id)
        let uspated = await axios.get("https://udoylabapi.redhalozenn.xyz/project/" + this.$route.params.id)
        //  console.log(uspated.data.content)
        this.dataup = uspated.data
        this.content = uspated.data.content

        console.log(this.content)
    }
}
</script>