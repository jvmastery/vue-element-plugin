import { Component } from 'vue'
import { definePropType } from './runtime'

/**
 * 定义图标
 */
export const iconPropType = definePropType<string | Component>([String, Object, Function])
