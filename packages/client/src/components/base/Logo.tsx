import { useTheme } from '@/components/theme/theme-provider';
import logoWhite from '../../assets/logo-white.png';
import logoDark from '../../assets/logo-black.png';

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  const { theme } = useTheme();

  return (
    <img
      className={className}
      src={theme === 'dark' ? logoWhite : logoDark}
      alt='Logo'
    />
  );
}
