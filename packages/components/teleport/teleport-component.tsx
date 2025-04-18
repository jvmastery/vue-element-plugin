import { definePropType } from '@/utils'
import { defineComponent, h, Teleport } from 'vue'

export default defineComponent({
    name: 'FTeleport',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        to: {
            type: definePropType<string | HTMLElement>([String, Object]),
            default: 'body'
        }
    },
    setup(props, { slots }) {
        return () => {
            if (props.disabled) {
                return slots.default?.()
            } else {
                return h(Teleport, { to: props.to }, slots.default?.() ?? [])
            }
        }
    }
})
