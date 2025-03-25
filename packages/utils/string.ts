// 字符串工具类

/**
 * 将_换成驼峰格式
 * @param str 字符串
 * @returns 
 */
export const toPascalCase = (str: string) => {
    return str
      .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()) // 转换 _ 后的字母为大写
      .replace(/^[a-z]/, (match) => match.toUpperCase()); // 将第一个字母转换为大写
  }