"use client";

import { queryClient } from "@/data/api/query-client";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useOneTask } from "@/hooks/useOneTask";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { EditTaskModal } from "@/ui/components/EditTaskModal";
import { formatDate } from "@/utils/formatDate";
import {
  Box,
  Button,
  Checkbox,
  Container,
  DataList,
  Dialog,
  Flex,
  Heading,
} from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";

export default function TaskDetail() {
  const { taskId } = useParams();
  const router = useRouter();

  const {
    data: task,
    isLoading,
    isSuccess,
    isError,
  } = useOneTask(taskId as string);

  const updateTaskMutation = useUpdateTask(taskId as string);
  const deleteTaskMutation = useDeleteTask();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occured.</p>;
  }

  const handleUpdateTaskStatus = (status: boolean) => {
    updateTaskMutation.mutateAsync(
      {
        completed: status,
        completed_at: status === true ? new Date() : null,
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ["task", taskId as string],
          }),
      },
    );
  };

  const handleDeleteTask = async () => {
    await deleteTaskMutation.mutateAsync(taskId as string, {
      onSuccess: () => router.replace("/tasks"),
    });
  };

  if (isSuccess) {
    return (
      <Dialog.Root>
        <Container>
          <Flex gap={"2"}>
            <Dialog.Trigger>
              <Button variant="outline">Edit</Button>
            </Dialog.Trigger>
            <EditTaskModal task={task} />
            <Button color="red" onClick={handleDeleteTask}>
              Delete
            </Button>
          </Flex>
          <Flex direction={"column"} my={"5"}>
            <Heading size={"4"}>Task #{task.id}</Heading>
            <Flex align="center" gap={"4"}>
              <Checkbox
                size={"3"}
                variant="surface"
                onCheckedChange={(checked) =>
                  handleUpdateTaskStatus(checked as boolean)
                }
              />
              <Heading size={"9"}>{task.title}</Heading>
            </Flex>
          </Flex>
          <Box>
            <DataList.Root>
              <DataList.Item>
                <DataList.Label>ID</DataList.Label>
                <DataList.Value>{task.id}</DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>Description</DataList.Label>
                <DataList.Value>{task.description}</DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>Status</DataList.Label>
                <DataList.Value>
                  {task.completed ? "Completed" : "In progress"}
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>Completed at</DataList.Label>
                <DataList.Value>
                  {task.completed_at
                    ? formatDate(task.completed_at)
                    : "Not yet completed"}
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>Due date</DataList.Label>
                <DataList.Value>
                  {task.due_date ? formatDate(task.due_date) : "No due date"}
                </DataList.Value>
              </DataList.Item>

              <DataList.Item>
                <DataList.Label>Last edited at</DataList.Label>
                <DataList.Value>{formatDate(task.updated_at)}</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Box>
        </Container>
      </Dialog.Root>
    );
  }
}
