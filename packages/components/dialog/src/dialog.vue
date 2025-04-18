<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { dialogProps } from './dialog'
import { useDraggable, useZIndex } from 'element-plus'
import { FTeleport } from '@/components'
import { useResizeDom } from '@/hooks'

defineOptions({
    name: 'FDialog'
})

const props = defineProps(dialogProps)
const dialogRef = ref()
const headerRef = ref()
const visiable = defineModel<boolean>()
const { nextZIndex } = useZIndex()
const slots: Record<string, any> = useSlots()

const onClickOutside = () => {
    visiable.value = false
}

const currentZIndex = computed(() => {
    return nextZIndex()
})


const { resetPosition } = useDraggable(
  dialogRef,
  headerRef,
  computed(() => props.draggable),
  computed(() => true)
)
console.log(dialogRef)
useResizeDom(dialogRef)
</script>

<template>
    <f-teleport
        :to="appendTo"
        :disabled="appendTo !== 'body' ? false : !appendToBody"
    >
        <transition>
            <div
                :class="[
                    'dialog_container',
                    { 'is-draggable': draggable },
                    { full: isFull },
                ]"
                ref="dialogRef"
                v-click-outside="closeOnClickModal ? onClickOutside : null"
                v-if="visiable"
                :style="{
                    zIndex: currentZIndex
                }"
            >
                <div class="header" ref="headerRef">
                    头部
                </div>

                <div class="content">
                    内容
                </div>

                <div class="footer" v-if="$slots.footer">
                    <slot name="footer" />
                </div>
            </div>
        </transition>
  </f-teleport>
</template>

<style lang="scss" scoped>
.dialog_container {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    min-width: 320px;
    min-height: 320px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 6px #00000040;
    z-index: 20;
    background: #f3f3f3 radial-gradient(#eff4f9 75%, #f3f3f3 100%) no-repeat fixed;
    color: #222;

    &.is-draggable {
        .header {
            cursor: move;
            -webkit-user-select: none;
            user-select: none;
        }
    }

    .header {
        display: flex;
        flex-shrink: 0;
        width: 100%;
        height: 28px;
        justify-content: space-between;
        align-items: center;
        position: relative;
        border-radius: 6px 6px 0 0;

        .title {
            display: flex;
            flex-grow: 1;
            align-items: center;
            height: 100%;

            img {
                width: 14px;
                margin: 0 10px 0 6px;
            }

            div {
                margin-left: 6px;
                font-size: 0.64em;
            }
        }

        .buttons {
            display: flex;
            align-items: center;
            height: 100%;

            & > div {
                height: 100%;
                padding: 0 18px;
                transition: all ease-in-out 60ms;
                position: relative;
                display: grid;
                place-items: center;

                &.close {
                    border-radius: 0 6px 0 0;
                }

                &:hover {
                    background: rgba(136, 136, 136, 0.2);
                }

                &.close:hover {
                    background: rgba(255, 0, 0, 0.8);
                    img {
                        filter: invert(1);
                    }
                }

                .icon {
                    width: 12px;
                }
            }
        }
    }

    .content {
        width: 100%;
        flex-grow: 1;
        overflow: hidden;
        border-radius: 0 0 6px 6px;
        background-color: #FFF;

        ::v-deep(.scroll-view) {
            height: 100%;
        }
    }
}
</style>
