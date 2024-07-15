import { EVENT_STATE } from '@prisma/client'
import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface SearchParams {
  next?: string
  sort?: string
  date?: string
  q?: string
  limit?: string
  page?: string
  status?: string
}

export interface SearchParamsPrivate extends SearchParams {
  authorId?: string
}

export interface Params {
  id: string;
}

export interface ServerPageProps {
  params: Params;
  searchParams: SearchParams;
}

export type SortFilter = 'created-asc' | 'created-desc' | 'eventdata-asc' | 'eventdata-desc'

export interface SortFilterSelect {
  value: SortFilter;
  label: string;
}

export interface StatusFilterSelect {
  value: EVENT_STATE
  label: string;
}