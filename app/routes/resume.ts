import { redirect } from '@remix-run/node'

export const loader = () => {
  return redirect(
    'https://docs.google.com/document/d/18Xm2J8RiPVIkU91pYQLI2EtrF-O2DAeXj5LKE3VD4no/edit?usp=sharing'
  )
}
