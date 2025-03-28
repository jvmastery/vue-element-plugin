import { dayjs } from 'element-plus'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
dayjs.extend(isBetweenPlugin)

/**
 * 比较时间是否在2个时间之内
 * @param date
 * @param startTime
 * @param endTime
 */
export const isBetween = (
    date: dayjs.ConfigType,
    startTime: dayjs.ConfigType,
    endTime: dayjs.ConfigType
) => {
    
    return dayjs(date).isBetween(startTime, endTime, null, '[]')
}
