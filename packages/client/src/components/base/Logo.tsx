import { useTheme } from '@/components/theme/theme-provider';
import logoWhite from '../../assets/logo-white.png';
import logoDark from '../../assets/logo-black.png';
import { Link } from '@tanstack/react-router';

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  const { theme } = useTheme();

  return (
    <Link to='/' className={className}>
      <img
        className={className}
        src={theme === 'dark' ? logoWhite : logoDark}
        alt='Logo'
      />
    </Link>
  );
}
