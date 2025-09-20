<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { formProps, loadComponent, type FormField } from './form'
import { AnyObject, ValidateResult } from '@/types'
import { ElForm, ElMessage, FormInstance } from 'element-plus'
import { useRequest, useThrottle } from '@/hooks'
import { isFunction } from '@/utils'

defineOptions({
    name: 'FForm'
})

interface ValidateRefType {
    /**
     * 组件实例
     */
    el: any
    /**
     * 字段对象
     */
    field: FormField
}

const props = defineProps(formProps)
const formRef = ref<FormInstance>()
const sumitLoading = ref(false)
const customValidFieldRefs = ref<Map<string, ValidateRefType>>(new Map())

// 表单属性
const formData: AnyObject = defineModel({ type: Object, default: () => ({}) })

onMounted(() => {
    props.fields?.map(field => {
        if (field.defaultValue) {
            const componentInstance = loadComponent(field.type)
            const isComponentInstance = 'comp' in componentInstance

            formData.value[field.name] = isComponentInstance
                ? componentInstance.formatter(field.defaultValue)
                : field.defaultValue
        } else if (field.type === 'edit-table') {
            // 初始化
            formData.value[field.name] = []
        }
    })
})

/**
 * 计算当前field占据的宽度
 * @param field
 */
const getFormItemWidth = (field: FormField) => {
    const fieldColspan = field.colspan ? field.colspan / props.colSize : props.colSize

    // gap = 20px
    if (props.labelPostion === 'top') {
        return `flex: 0 1 calc((${100 / fieldColspan}% - 10px - 20px)); margin-right:10px; min-width: 300px;`
    } else {
        return `flex: 0 1 calc(${100 / fieldColspan}% - 20px); min-width: 300px;`
    }
}

/**
 * form表单属性
 */
const computedFields = computed(() => {
    return props.fields?.map(field => {
        const { name, label, type, vif, rules, attrs, ...others } = field
        const componentInstance = loadComponent(type)
        const isComponentInstance = 'comp' in componentInstance

        const fieldOptions = {
            // 将一些组件外部使用属性隔离开，其他的属性传递给组件
            ...field,
            attrs: {
                ...(isComponentInstance ? componentInstance.options : {}),
                ...others,
                ...attrs
            },
            ...{
                style: getFormItemWidth(field),
                componentInstance: isComponentInstance ? componentInstance.comp : componentInstance
            },
            validator: isComponentInstance ? (componentInstance.validator ?? false) : false,
            rules: field.required
                ? [{ required: true, message: field.label + '不能为空' }, ...(field.rules || [])]
                : field.rules
        }
        return fieldOptions
    })
})

/**
 * 获取第一条错误信息
 * @param record
 */
const getFirstError = (record: any): string => {
    // 1. 获取所有键（按插入顺序）
    const keys = Object.keys(record)

    // 2. 检查是否有键
    if (keys.length === 0) return ''

    // 3. 取第一个键对应的错误数组
    const errors = record[keys[0]]

    // 4. 检查数组是否有内容
    return errors?.[0].message // 使用可选链防止 undefined
}

/**
 * 防抖提交
 */
const submitFormThrottle = useThrottle(() => {
    try {
        formRef.value?.validate(async (valid, invalidFields) => {
            if (!valid) {
                // 验证失败
                ElMessage.warning(getFirstError(invalidFields))
                return
            }

            // 如果是编辑表单，需要确认表单内数据是否填写完善
            for (const item of customValidFieldRefs.value.values()) {
                if (item.el.validate && isFunction(item.el.validate)) {
                    // 判断验证是否通过
                    const { isValid, message } = item.el.validate() as ValidateResult
                    if (!isValid) {
                        ElMessage.warning(`${item.field.label}${message}`)
                        return
                    }
                }
            }

            // 真实处理，可以进行自定义处理，也可以直接通过接口进行保存
            if (props.onConfirm) {
                try {
                    await props.onConfirm(formData.value)
                } catch (e) {}
                return
            }

            // 使用远程接口
            if (props.url) {
                await useRequest(
                    props.url,
                    {
                        method: props.method,
                        params: formData.value
                    },
                    props.onBeforeLoad,
                    props.onLoadSuccess
                ).finally(() => {
                    sumitLoading.value = false
                })
            }

            sumitLoading.value = false
        })
    } finally {
        sumitLoading.value = false
    }
}, 1000)

/**
 * 提交表单
 */
const submitForm = () => {
    sumitLoading.value = true
    submitFormThrottle()
}

/**
 * 取消
 */
const cancel = async () => {
    if (props.onCancel) {
        await props.onCancel()
    }
}

/**
 * 重置表单信息
 */
const reset = async () => {
    formRef.value?.resetFields()
    if (props.onReset) {
        await props.onReset()
    }
}
</script>

<template>
    <el-form
        :model="formData"
        :label-width="labelWidth"
        ref="formRef"
        :class="[inline ? 'form--inline__wrapper' : '', 'form__wrapper']"
        v-bind="$attrs"
        :inline="inline"
        scroll-to-error
        :rules="rules"
    >
        <template v-for="(field, index) in computedFields" :key="index">
            <el-form-item
                :style="field.style"
                :label="field.label"
                :label-width="field.labelWidth"
                :prop="field.name"
                :rules="field.rules"
                v-if="field.vif ? field.vif(formData) : true"
            >
                <template #label>
                    <slot :name="field.name + 'Label'" :field="field" :data="formData">
                        {{ field.label }}
                    </slot>
                </template>
                <slot :name="field.name">
                    <component
                        :is="field.componentInstance"
                        v-model="formData[field.name]"
                        :display-name="field.label"
                        :ref="
                            (el: any) => {
                                if (field.validator) {
                                    if (el) {
                                        customValidFieldRefs.set(field.name, {
                                            el,
                                            field: field
                                        })
                                    } else {
                                        customValidFieldRefs.delete(field.name)
                                    }
                                }
                            }
                        "
                        v-bind="field.attrs"
                    />
                </slot>
            </el-form-item>
        </template>
        <div class="submit__wrapper" v-if="fields && fields.length > 0">
            <slot name="submit-button">
                <el-button
                    :type="confirmButtonType"
                    :icon="confirmButtonIcon"
                    v-if="showConfirmButton"
                    :loading="sumitLoading"
                    @click="submitForm"
                >
                    {{ confirmButtonText }}
                </el-button>
                <el-button
                    :type="cancelButtonType"
                    :icon="cancelButtonIcon"
                    v-if="showCancelButton"
                    @click="cancel"
                >
                    {{ cancelButtonText }}
                </el-button>
                <el-button
                    :type="resetButtonType"
                    :icon="resetButtonIcon"
                    v-if="showResetButton"
                    @click="reset"
                >
                    {{ resetButtonText }}
                </el-button>
                <slot name="extra-button"></slot>
            </slot>
        </div>
    </el-form>
</template>

<style lang="scss" scoped>
.form__wrapper {
    padding-top: 20px;

    &.form--inline__wrapper {
        .submit__wrapper {
            display: inline-flex;
            vertical-align: middle;
            --font-size: 14px;
            margin-bottom: 18px;
        }
    }

    &:not(.form--inline__wrapper) {
        display: flex;
        flex-wrap: wrap;
        column-gap: 20px;

        :deep(.el-form-item__label) {
            padding: 0 12px 0 12px;
        }

        :deep(.el-form-item__content) {
            & > * {
                width: 100% !important;
            }
        }

        .submit__wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
}
</style>
