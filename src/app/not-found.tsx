import { Link } from '@nextui-org/link'

import PublicLayout from './(public)/layout'

export default function NotFound () {
  return (
    <PublicLayout>
      <div className='grid min-h-[65dvh] place-content-center'>
        <div className='max-w-md p-6 text-center'>
          <h1 className='text-6xl font-bold'>404</h1>
          <p className='mt-4 text-xl'>
            Oops! La página que estás buscando no existe.
          </p>
          <Link className='mt-4' color='primary' href='/'>
            Ir a la página inicial
          </Link>
        </div>
      </div>
    </PublicLayout>
  )
}
