import { useForm } from "@mantine/form";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginPageForm } from "../_partials/login-page-form";
import type { LoginPageFormValues } from "../login-page.schema";

const translations: Record<string, string> = {
  "auth.email": "Email",
  "auth.emailPlaceholder": "email@example.com",
  "auth.password": "Password",
  "auth.passwordPlaceholder": "Type your password",
  "auth.submit": "Enter",
};

function TestLoginPageForm({
  error = "",
  onSubmit,
}: {
  error?: string;
  onSubmit: (values: LoginPageFormValues) => void;
}) {
  const form = useForm<LoginPageFormValues>({
    initialValues: {
      email: "user@example.com",
      password: "secret",
    },
  });

  return (
    <LoginPageForm
      emailLabel={translations["auth.email"]}
      emailPlaceholder={translations["auth.emailPlaceholder"]}
      error={error}
      form={form}
      isLoading={false}
      onSubmit={form.onSubmit(onSubmit)}
      passwordLabel={translations["auth.password"]}
      passwordPlaceholder={translations["auth.passwordPlaceholder"]}
      submitLabel={translations["auth.submit"]}
    />
  );
}

describe("LoginPageForm", () => {
  it("submits credentials through its callbacks", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<TestLoginPageForm onSubmit={handleSubmit} />, {
      wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
    });

    await user.clear(screen.getByPlaceholderText("email@example.com"));
    await user.type(
      screen.getByPlaceholderText("email@example.com"),
      "user@example.com",
    );
    await user.clear(screen.getByPlaceholderText("Type your password"));
    await user.type(
      screen.getByPlaceholderText("Type your password"),
      "secret",
    );
    await user.click(screen.getByRole("button", { name: "Enter" }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        email: "user@example.com",
        password: "secret",
      },
      expect.anything(),
    );
  });

  it("shows the current error message", () => {
    render(
      <TestLoginPageForm error="Invalid credentials" onSubmit={vi.fn()} />,
      {
        wrapper: ({ children }) => (
          <MantineProvider>{children}</MantineProvider>
        ),
      },
    );

    expect(screen.getByText("Invalid credentials")).toBeDefined();
  });
});
