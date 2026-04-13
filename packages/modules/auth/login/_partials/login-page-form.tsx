import type { UseFormReturnType } from "@mantine/form";
import {
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import type { LoginPageFormValues } from "../login-page.schema";

interface LoginPageFormProps {
  emailLabel: string;
  emailPlaceholder: string;
  error: string;
  form: UseFormReturnType<LoginPageFormValues>;
  isLoading: boolean;
  onSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
  passwordLabel: string;
  passwordPlaceholder: string;
  submitLabel: string;
}

export function LoginPageForm({
  emailLabel,
  emailPlaceholder,
  error,
  form,
  isLoading,
  onSubmit,
  passwordLabel,
  passwordPlaceholder,
  submitLabel,
}: LoginPageFormProps) {
  return (
    <Paper withBorder shadow="sm" p="xl" radius="md">
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label={emailLabel}
            placeholder={emailPlaceholder}
            type="email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label={passwordLabel}
            placeholder={passwordPlaceholder}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          {error ? (
            <Text c="red" size="sm">
              {error}
            </Text>
          ) : null}
          <Button type="submit" fullWidth loading={isLoading} mt="xs">
            {submitLabel}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
