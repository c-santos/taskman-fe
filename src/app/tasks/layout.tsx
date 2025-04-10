import { Container } from "@radix-ui/themes";

export default function TasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Container p={'8'}>{children}</Container>;
}
