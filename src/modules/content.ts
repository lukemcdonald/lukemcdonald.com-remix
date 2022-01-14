import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import invariant from 'tiny-invariant'
import { marked } from 'marked'

const contentPath = path.join(__dirname, '..', 'content')

export interface Content {
  draft: boolean
  html: string
  image: string
  markdown: string
  excerpt: string
  subtitle: string
  title: string
}

export type ContentMarkdownAttributes = Omit<Content, 'html' | 'markdown'>

function isValidContentAttributes(
  attributes: any,
): attributes is ContentMarkdownAttributes {
  const required = ['draft', 'image', 'excerpt', 'title']
  return required.every(key => Object.keys(attributes).includes(key))
}

export async function getContent(slug: string) {
  const filepath = path.join(contentPath, `${slug}.md`)

  try {
    const file = await fs.readFile(filepath)
    const { attributes, body } = parseFrontMatter(file.toString())

    invariant(
      isValidContentAttributes(attributes),
      `Content ${filepath} is missing attributes.`,
    )

    const html = marked(body)

    return { ...attributes, html, markdown: body }
  } catch (error) {
    console.error(error)
    throw new Response(`Content not found for '/${slug}'`, {
      status: 404,
    })
  }
}
