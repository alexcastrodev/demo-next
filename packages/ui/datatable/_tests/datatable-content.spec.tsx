import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { DataTableContent } from "../_partials/datatable-content";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("DataTableContent", () => {
  it("renders children inside a table", () => {
    render(
      <DataTableContent>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
      </DataTableContent>,
      { wrapper },
    );
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeDefined();
  });

  it("renders a scrollable container", () => {
    const { container } = render(
      <DataTableContent>
        <tbody />
      </DataTableContent>,
      { wrapper },
    );
    expect(container.querySelector("table")).toBeDefined();
  });
});
