<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { formProps, loadComponent, type FormField } from './form'
import { AnyObject } from '@/types'
import { ElForm, ElMessage, FormInstance } from 'element-plus'
import { useThrottle } from '@/hooks'

defineOptions({
    name: 'FForm'
})

const props = defineProps(formProps)
const formRef = ref<FormInstance>()
const sumitLoading = ref(false)

// 表单属性
const formData: AnyObject = defineModel({  })

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
        const { name, label, type, vif, rules, attrs, ...others } = field
        const componentInstance = loadComponent(type)
        const isComponentInstance = 'options' in componentInstance

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
            }
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
  const keys = Object.keys(record);
  
  // 2. 检查是否有键
  if (keys.length === 0) return '';
  
  // 3. 取第一个键对应的错误数组
  const errors = record[keys[0]];
  
  // 4. 检查数组是否有内容
  return errors?.[0].message; // 使用可选链防止 undefined
};

/**
 * 防抖提交
 */
const submitFormThrottle = useThrottle(() => {
    formRef.value?.validate(async (valid, invalidFields) => {
        if (!valid) {
            // 验证失败
            ElMessage.warning(getFirstError(invalidFields))
            sumitLoading.value = false
            return
        }

        // 真实处理，可以进行自定义处理，也可以直接通过接口进行保存
        if (props.onConfirm) {
            await props.onConfirm(formData.value)
            sumitLoading.value = false
            return
        }

        // 使用远程接口
    })
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
const reset = () => {
    formRef.value?.resetFields()
}

</script>

<template>
    <el-form
        :model="formData"
        :label-width="labelWidth"
        ref="formRef"
        :class="[inline ? 'form--inline__wrapper' : 'form__wrapper']"
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
.form--inline__wrapper {
    .submit__wrapper {
        display: inline-flex;
        vertical-align: middle;
        --font-size: 14px;
        margin-bottom: 18px;
    }
}

.form__wrapper {
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
</style>
