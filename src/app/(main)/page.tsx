import styles from './page.module.css';
import { Box, Button, Container, Title, Image, Stack } from '@mantine/core';
import NextImage from 'next/image';
import logo from '/public/logo.png';
export default function Home() {
  return (
    <Container className={styles.page}>
      <Stack align='center' mt={70}>
        <Image component={NextImage} src={logo} alt='logo' h={'auto'} w={300} />
        <Title
          size={'5rem'}
          w={{
            base: '100%',
            sm: '60%',
          }}
          fw={700}
          ta={'center'}
          tt='uppercase'
        >
          Be the most successful
        </Title>
        <Button variant='white' color='gray' w={{ base: '100%', sm: 250 }}>
          Apply Now
        </Button>
      </Stack>
    </Container>
  );
}
