import { z } from 'zod'

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 12,
  skip: 0
}

const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGINATION.page),
  limit: z.coerce.number().min(1).max(100).default(DEFAULT_PAGINATION.limit)
})

export function formatPagination (
  pagination: {
    page?: number | string
    limit?: number | string
  } = DEFAULT_PAGINATION
) {
  const result = paginationSchema.safeParse(pagination ?? {})

  if (!result.success) return DEFAULT_PAGINATION

  const skip = (result.data.page - 1) * result.data.limit

  return {
    ...result.data,
    skip
  }
}

export function getPaginationInfo ({
  page = 1,
  limit = 10,
  total = 0
}: {
  page?: number
  limit?: number
  total?: number
}) {
  const pages = Math.ceil(total / limit)

  return {
    currentPage: page,
    limit,
    total,
    pages,
    hasNext: page < pages,
    hasPrev: page > 1
  }
}

export type Info = ReturnType<typeof getPaginationInfo>

export function generatePagination (currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ]
}
