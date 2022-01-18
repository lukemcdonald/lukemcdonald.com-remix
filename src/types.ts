export interface RequestInfo {
  requestInfo: {
    origin: string
    pathname: string
  }
}

export interface Content {
  draft: boolean
  html: string
  image: string
  imageAlt: string
  markdown: string
  description: string
  subtitle: string
  title: string
}
