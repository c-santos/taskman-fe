import { useTasks } from "@/hooks/useTasks";
import { Flex, Skeleton } from "@radix-ui/themes";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  const { data: tasks, isLoading, isSuccess, isError } = useTasks();

  if (isLoading) {
    return <Skeleton minWidth={"20%"} minHeight={"20%"} />;
  }

  if (isError) {
    return (
      <>
        <p>An error occured. Please try again.</p>
      </>
    );
  }

  if (isSuccess) {
    return (
      <Flex direction={"column"} gap={"4"} mt={'6'} p={'4'}>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </Flex>
    );
  }
}
