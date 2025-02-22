import type { AppContext, App, Directive, Plugin } from 'vue'

export const NOOP = () => {};

export type SFCWithInstall<T> = T & Plugin
export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null
  }

/**
 * 给一个 Vue 组件添加 install 方法，以便可以通过 app.use() 的方式进行全局注册，并且还支持附带一些额外的子组件
 * @param main 
 * @param extra 
 * @returns 
 */
export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
    // 给 main 添加一个 install 方法
    ;(main as SFCWithInstall<T>).install = (app: App): void => {
        // 将 main 组件和额外的子组件（如果有）一起注册到 Vue 应用中
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp)
        }
    }

    // 如果有额外的子组件，将它们添加到 main 的属性上
    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            ;(main as any)[key] = comp
        }
    }

    // 将 T 断言为具体的类型 T & plugin & Record<string, any>
    return main as SFCWithInstall<T> & E
}

/**
 * 用于封装 Vue 的函数，使它们具备 install 方法，从而可以通过 app.use() 的方式全局注册到 Vue 应用中
 * @param fn 
 * @param name 
 * @returns 
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
    // 为传入的函数添加 install 方法
    ;(fn as SFCWithInstall<T>).install = (app: App) => {
        ;(fn as SFCInstallWithContext<T>)._context = app._context
        app.config.globalProperties[name] = fn
    }

    return fn as SFCInstallWithContext<T>
}

/**
 * 用于封装 Vue 的指令，使它们具备 install 方法，从而可以通过 app.use() 的方式全局注册到 Vue 应用中
 * @param directive 
 * @param name 
 * @returns 
 */
export const withInstallDirective = <T extends Directive>(directive: T, name: string) => {
    // 为指令添加 install 方法
    ;(directive as SFCWithInstall<T>).install = (app: App): void => {
        app.directive(name, directive)
    }

    return directive as SFCWithInstall<T>
}

/**
 * 传入的组件添加一个 install 方法，并将它设置为 NOOP
 * @param component 组件
 * @returns 
 */
export const withNoopInstall = <T>(component: T) => {
    ;(component as SFCWithInstall<T>).install = NOOP
  
    return component as SFCWithInstall<T>
}
  