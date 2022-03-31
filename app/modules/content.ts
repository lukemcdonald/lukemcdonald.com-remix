import path from 'path'
import fs from 'fs/promises'
import parseFrontMatter from 'front-matter'
import invariant from 'tiny-invariant'
import { marked } from 'marked'

import type { Content } from '~/types'
import { pageNotFound } from '~/utils/misc'

type ContentMarkdownAttributes = Omit<Content, 'html' | 'markdown'>

const contentPath = path.join(__dirname, '..', 'content')

function isValidContentAttributes(
  attributes: any,
): attributes is ContentMarkdownAttributes {
  const required = ['draft', 'image', 'description', 'title']
  return required.every(key => Object.keys(attributes).includes(key))
}

export async function getContent({
  contentDir = '',
  slug = '',
}: {
  contentDir?: string
  slug: string
}) {
  const filename = [contentDir, slug].filter(Boolean).join('/')
  const filepath = path.join(contentPath, `${filename}.md`)

  try {
    const file = await fs.readFile(filepath)
    const { attributes, body } = parseFrontMatter(file.toString())

    invariant(
      isValidContentAttributes(attributes),
      `Content ${filepath} is missing attributes.`,
    )

    const html = marked(body)

    return { ...attributes, html, markdown: body, filename }
  } catch (error) {
    console.error(error)
    throw pageNotFound(filename)
  }
}
