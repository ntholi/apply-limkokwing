import { Button } from '@mantine/core';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Button>Hello World</Button>
    </div>
  );
}
