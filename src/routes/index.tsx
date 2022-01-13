import { MetaFunction } from 'remix'

import { getSeoMeta } from '~/utils/seo'
import Entry from '~/components/entry'

export const meta: MetaFunction = () => {
  return getSeoMeta({
    description:
      "A christian, husband, father and wrestling coach who's tent making is as a full-stack developer with an eye for design.",
  })
}

export default function Index() {
  const post = {
    title: 'Greetings.',
    excerpt: `<div class='bio-tagline'>
    <a href='/i-am-a/christian'>Christian</a>
    <a href='/i-am-a/husband'>Husband</a>
    <a href='/i-am-a/father'>Father</a>
    <a href='/i-am-a/coach'>Coach</a>
  </div>`,
    html: 'Content...',
    image: '/images/luke-mustachio.jpg',
  }

  return (
    <Entry
      title={post.title}
      excerpt={post.excerpt}
      html={post.html}
      image={post.image}
    />
  )
}
