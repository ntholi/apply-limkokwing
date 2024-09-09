import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import Container from './ui/container';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='p-4 border-b'>
      <Container width='lg' className='flex justify-between items-center'>
        <div className='flex items-center'>
          <Logo className='h-10 w-auto mr-4' />
          <div className='hidden md:flex space-x-4'>
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
        <div className='md:hidden backdrop-blur-md bg-background/30 z-50 absolute top-12 left-0 w-full h-full'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            <Link to='/' className='block hover:text-foreground/60'>
              Home
            </Link>
            <Link to='/courses' className='block hover:text-foreground/60'>
              Courses
            </Link>
            <Link to='/apply' className='block hover:text-foreground/60'>
              Apply
            </Link>
            <Link to='/account' className='block hover:text-foreground/60'>
              Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
