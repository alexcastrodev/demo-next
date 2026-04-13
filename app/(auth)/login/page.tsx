import { Box, Center } from '@mantine/core';
import { LoginForm } from '@/packages/modules/auth/login';
import { LoginPageHeader } from './_partials/login-page-header';

export default function LoginPage() {
  return (
    <Center mih="100vh" bg="gray.0">
      <Box w={400} px="md">
        <LoginPageHeader />
        <LoginForm />
      </Box>
    </Center>
  );
}
