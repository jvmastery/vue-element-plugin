import path from 'path'
import fs from 'fs'
import { docRoot } from './global'
import type { MarkdownRenderer } from 'vitepress'
import mdContainer from 'markdown-it-container'

interface ContainerOpts {
    marker?: string | undefined
    validate?(params: string): boolean
    render?: MarkdownRenderer['renderer']['rules']['container']
}

function createDemoContainer(md: MarkdownRenderer): ContainerOpts {
    return {
        validate(params) {
            return !!params.trim().match(/^demo\s*(.*)$/)
        },

        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
            if (tokens[idx].nesting === 1 /* means the tag is opening */) {
                const description = m && m.length > 1 ? m[1] : ''
                const sourceFileToken = tokens[idx + 2]
                let source = ''
                const sourceFile = sourceFileToken.children?.[0].content ?? ''

                if (sourceFileToken.type === 'inline') {
                    source = fs.readFileSync(
                        path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
                        'utf-8'
                    )
                }
                if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

                return `<Demo 
                          source="${encodeURIComponent(md.render(`\`\`\` vue\n${source}\n\`\`\``))}" 
                          path="${sourceFile}" 
                          raw-source="${encodeURIComponent(source)}" 
                          description="${encodeURIComponent(md.render(description))}">
                        <template #source><ep-${sourceFile.replaceAll('/', '-')}/></template>`
            } else {
                return '</Demo>\n'
            }
        }
    }
}

export const mdPlugin = (md: MarkdownRenderer) => {
    md.use(mdContainer, 'demo', createDemoContainer(md))
}
