import { useTasks } from "@/hooks/useTasks";
import { Flex, Heading, Section } from "@radix-ui/themes";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  const { data: tasks, isLoading, isSuccess, isError } = useTasks();

  if (isLoading) {
    return (
      <Section>
        <Heading size={"4"}>Loading...</Heading>
      </Section>
    );
  }

  if (isError) {
    return <p>An error occured. Please try again.</p>;
  }

  if (isSuccess) {
    return (
      <Flex direction={"column"} gap={"4"}>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </Flex>
    );
  }
}
