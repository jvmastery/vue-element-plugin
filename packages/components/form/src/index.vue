<script setup lang="ts">
import { computed, PropType, reactive, ref } from 'vue'
import type { FormField } from './index.d.ts'

const props = defineProps({
    /**
     * 默认每行占据field数量
     */
    colSize: {
        type: Number,
        default: 2
    },
    /**
     * 表单项
     */
    fields: {
        type: Array<FormField>,
    },
    /**
     * label展示方式
     */
    labelPostion: {
        type: String as PropType<'left' | 'right' | 'top'>,
        default: 'left'
    },
    /**
     * label宽度
     */
    labelWidth: {
        type: String,
        default: 'auto'
    },
    rules: {} as any
})

// 表单属性
const formData: AnyObject = defineModel({ required: true })

/**
 * 计算当前field占据的宽度
 * @param field 
 */
const getFormItemWidth = (field: FormField) => {
    const fieldColspan = field.colspan ? field.colspan / props.colSize : props.colSize

    // gap = 20px
    if (props.labelPostion === 'top') {
        return `flex: 0 1 calc((${100 / fieldColspan}% - 10px - 20px)); margin-right:10px;`
    } else {
        return `flex: 0 1 calc(${100 / fieldColspan}% - 20px)`
    }
}

/**
 * form表单属性
 */
const computedFields = computed(() => {
    return props.fields?.map(field => {
        const { name, label, type, vif, rules, attrs, ...others } = field; 

        const fieldOptions = {
            // 将一些组件外部使用属性隔离开，其他的属性传递给组件
            ...field,
            attrs: {
                ...others,
                ...attrs
            },
            ...{
                style: getFormItemWidth(field),
                componentName: getComponentName(field.type)
            }
        }
        return fieldOptions
    })
})

/**
 * 获取组件的名称
 * @param type 类型
 */
const getComponentName = (type: String | undefined) => {
    if (type == undefined) {
        return 'el-input'
    }

    if (type == 'radio' || type == 'checkbox') {
        return 'f-' + type
    }

    return 'el-' + type
}

</script>
<template>
    <el-form :model="formData" :label-width="labelWidth" class="form__wrapper" v-bind="$attrs" :rules="rules">
        <template v-for="(field, index) in computedFields" :key="index">
            <el-form-item :style="field.style" :label="field.label" :prop="field.name" :rules="field.rules" v-bind="$attrs" v-if="field.vif ? field.vif(formData) : true">
                <template #label>
                    <slot :name="field.name + 'Label'" :field="field" :data="formData">
                        {{ field.label }}
                    </slot>
                </template>
                <slot :name="field.name">
                    <component :is="field.componentName" v-model="formData[field.name]" v-bind="field.attrs"/>
                </slot>
            </el-form-item>
        </template>
    </el-form>
</template>

<style lang="scss" scoped>
.form__wrapper {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;

    :deep(.el-form-item__label) {
        padding: 0 12px 0 12px;
    }

    :deep(.el-form-item__content) {
        & > * {
            width: 100%;
        }
    }
}
</style>
