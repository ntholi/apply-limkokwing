'use client';
import React from 'react';
import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react';
import Image from 'next/image';
import AccountButton from '../auth/AccountButton';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: 'Home',
      href: '#',
    },
    {
      name: 'Courses',
      href: '#',
    },
    {
      name: 'Contact',
      href: '#',
    },
  ];

  return (
    <NextUiNavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className='sm:hidden pr-3' justify='center'>
        <NavbarBrand>
          <Image
            src={'/images/logo.png'}
            className='w-full h-16'
            height={100}
            width={100}
            priority={false}
            alt='Logo'
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarBrand>
          <Image
            src={'/images/logo.png'}
            className='w-full h-16'
            height={100}
            width={100}
            priority={false}
            alt='Logo'
          />
        </NavbarBrand>
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link color='foreground' href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <AccountButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              href={item.href}
              size='lg'
              color='foreground'
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUiNavbar>
  );
}
