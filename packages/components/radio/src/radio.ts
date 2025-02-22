import { ExtractPropTypes } from 'vue'
import { checkboxBaseProps } from '../../checkbox'

export const radioProps = {
    ...checkboxBaseProps
}

export type RadioProps = ExtractPropTypes<typeof radioProps>