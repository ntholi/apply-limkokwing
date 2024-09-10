import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import Container from '../ui/container';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='border-b p-2'>
      <Container width='lg' className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Logo className='mr-4 h-14 w-auto' />
          <div className='hidden space-x-4 md:flex'>
            <Link to='/' className='hover:text-foreground/60'>
              Home
            </Link>
            <Link to='/courses' className='hover:text-foreground/60'>
              Courses
            </Link>
            <Link to='/apply' className='hover:text-foreground/60'>
              Apply
            </Link>
          </div>
        </div>
        <div className='hidden md:block'>
          <Link to='/account' className='hover:text-foreground/60'>
            Account
          </Link>
        </div>
        <div className='md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-foreground focus:outline-none'
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </Container>
      {isOpen && (
        <div className='absolute left-0 top-20 z-50 h-full w-full bg-background/30 backdrop-blur-md md:hidden'>
          <div className='space-y-3 px-2 pb-3 pt-2'>
            <Link to='/' className='block text-lg hover:text-foreground/60'>
              Home
            </Link>
            <Link
              to='/courses'
              className='block text-lg hover:text-foreground/60'
            >
              Courses
            </Link>
            <Link
              to='/apply'
              className='block text-lg hover:text-foreground/60'
            >
              Apply
            </Link>
            <Link
              to='/account'
              className='block text-lg hover:text-foreground/60'
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
