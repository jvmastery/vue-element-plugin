import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    eslintPluginPrettier,
    { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
    {
        plugins: {
            pluginVue,
            pluginJs
        },
        rules: {
            /**
             * 配置index页面忽略双字符命名规则
             */
            'vue/multi-word-component-names': [
                'error',
                {
                    ignores: ['index', '404']
                }
            ],
            'no-undef': 'off'
        }
    }
]
