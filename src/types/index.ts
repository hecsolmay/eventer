import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface SearchParams {
  next?: string;
}

export interface Params {}

export interface ServerPageProps {
  params: Params;
  searchParams: SearchParams;
}