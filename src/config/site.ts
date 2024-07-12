export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Eventer',
  description: 'Una aplicación para organizar eventos Y dar a conocer a los asistentes',
  navItems: [
    {label: 'Inicio', href: '/'},
    {label: 'Eventos', href: '/events'},
    {label: 'Mis eventos', href: '/my-events'}
  ],
  navMenuItems: [
    {label: 'Inicio', href: '/'},
    {label: 'Eventos', href: '/events'},
    {label: 'Mis eventos', href: '/my-events'}
  ],
  links: {
    github: 'https://github.com/hecsolmay/eventer'
  }
}
