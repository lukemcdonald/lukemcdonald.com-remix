import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import invariant from 'tiny-invariant'
import { marked } from 'marked'

const worksPath = path.join(__dirname, '..', 'content/work')

export interface Work {
  draft: boolean
  html: string
  image: string
  markdown: string
  excerpt: string
  title: string
}

export type WorkMarkdownAttributes = Omit<Work, 'html' | 'markdown'>

function isValidWorkAttributes(
  attributes: any,
): attributes is WorkMarkdownAttributes {
  const required = ['draft', 'image', 'excerpt', 'title']
  return required.every(key => Object.keys(attributes).includes(key))
}

export async function getWork(slug: string) {
  const filepath = path.join(worksPath, `${slug}.md`)
  const file = await fs.readFile(filepath)
  const { attributes, body } = parseFrontMatter(file.toString())

  invariant(
    isValidWorkAttributes(attributes),
    `Work ${filepath} is missing attributes.`,
  )

  const html = marked(body)

  return { ...attributes, html, markdown: body }
}

export async function getWorks() {
  const dir = await fs.readdir(worksPath)

  return Promise.all(
    dir.map(async filename => {
      const filepath = path.join(worksPath, filename)
      const file = await fs.readFile(filepath)
      const { attributes } = parseFrontMatter(file.toString())

      invariant(
        isValidWorkAttributes(attributes),
        `Work ${filepath} is missing attributes.`,
      )

      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title,
      }
    }),
  )
}
