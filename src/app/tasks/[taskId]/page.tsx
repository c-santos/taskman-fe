"use client";

import { queryClient } from "@/data/api/query-client";
import { useOneTask } from "@/hooks/useOneTask";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { formatDate } from "@/utils/formatDate";
import {
  Box,
  Button,
  Checkbox,
  Container,
  DataList,
  Flex,
  Heading,
} from "@radix-ui/themes";
import { useParams } from "next/navigation";

export default function TaskDetail() {
  const { taskId } = useParams();

  const {
    data: task,
    isLoading,
    isSuccess,
    isError,
  } = useOneTask(taskId as string);

  const updateTaskMutation = useUpdateTask(taskId as string);

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
        completed_at: new Date(),
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ["task", taskId as string],
          }),
      },
    );
  };

  if (isSuccess) {
    return (
      <Container>
        <Flex gap={"2"}>
          <Button variant="outline">Edit</Button>
          <Button color="red">Delete</Button>
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
    );
  }
}
