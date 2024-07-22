'use client'

import { Link } from '@nextui-org/link'
import {
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar
} from '@nextui-org/navbar'
import NextLink from 'next/link'
import { useState } from 'react'

import SearchInput from './search-input'

import { GithubIcon, Logo } from '@/components/icons'
import { ThemeSwitch } from '@/components/theme-switch'
import { siteConfig } from '@/config/site'
import { logout } from '@/actions/auth'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth='xl'
      position='sticky'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='max-w-fit gap-3'>
          <NextLink className='flex items-center justify-start gap-1' href='/' onClick={closeMenu}>
            <Logo />
            <p className='font-bold text-inherit'>EVENTER</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='basis-1 pl-4' justify='end'>
        <Link isExternal aria-label='Github' href={siteConfig.links.github}>
          <GithubIcon className='text-default-500' />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <SearchInput closeMenu={closeMenu} />
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} >
              <Link color='foreground' href={item.href} size='lg' onClick={closeMenu}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          <NavbarMenuItem className='cursor-pointer text-red-500 dark:text-red-600' onClick={() => logout()}>
            <p>Cerrar sesión</p>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  )
}
