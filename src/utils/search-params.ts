import { SearchParams } from '@/types'

// next?: string
//   sort?: string
//   date?: string
//   q?: string
//   limit?: string
//   page?: string
//   status?: string

export function URLSearchParamsToSearchParams (
  searchParams: URLSearchParams
): SearchParams {
  const next = searchParams.get('next') ?? undefined
  const sort = searchParams.get('sort') ?? undefined
  const date = searchParams.get('date') ?? undefined
  const q = searchParams.get('q') ?? undefined
  const limit = searchParams.get('limit') ?? undefined
  const page = searchParams.get('page') ?? undefined
  const status = searchParams.get('status') ?? undefined

  const searchParamsObj: SearchParams = {
    next,
    sort,
    date,
    q,
    limit,
    page,
    status
  }

  return searchParamsObj
}
