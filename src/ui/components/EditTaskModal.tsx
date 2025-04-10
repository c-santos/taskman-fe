"use client";

import { queryClient } from "@/data/api/query-client";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { Task, UpdateTask } from "@/types/task.type";
import {
  Dialog,
  Flex,
  Text,
  TextField,
  Button,
  Checkbox,
} from "@radix-ui/themes";
import { useState } from "react";

type EditTaskModalProps = {
  task: Task;
};

export function EditTaskModal(props: EditTaskModalProps) {
  const { task } = props;

  const [updateData, setUpdateData] = useState<UpdateTask>(task);

  const updateTaskMutation = useUpdateTask(task.id);

  const handleEdit = async () => {
    await updateTaskMutation.mutateAsync(updateData, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["task", task.id] });
      },
    });
  };

  const handleClose = () => {
    setUpdateData(task);
  };

  return (
    <Dialog.Content size={"4"}>
      <Dialog.Title>Edit task</Dialog.Title>
      <Dialog.Description mb={"4"}>
        Edit details of your task.
      </Dialog.Description>

      <Flex direction="column" gap="3">
        <label htmlFor="title">
          <Text as="div" size="3" mb="1" weight="bold">
            Title
          </Text>
          <TextField.Root
            placeholder={task.title}
            size={"3"}
            id="title"
            name="title"
            autoComplete="off"
            value={updateData.title}
            onChange={(e) =>
              setUpdateData((prev) => ({
                ...prev,
                title: e.target.value as string,
              }))
            }
          />
        </label>

        <label htmlFor="description">
          <Text as="div" size="3" mb="1" weight="bold">
            Description
          </Text>
          <TextField.Root
            placeholder="Give me a short and sweet description"
            size={"3"}
            id="description"
            name="description"
            autoComplete="off"
            value={updateData.description ?? ""}
            onChange={(e) =>
              setUpdateData((prev) => ({
                ...prev,
                description: e.target.value as string,
              }))
            }
          />
        </label>

        <label htmlFor="due_date">
          <Text as="div" size="3" mb="1" weight="bold">
            Due date
          </Text>
          <input
            id="due_date"
            type="date"
            value={
              updateData.due_date
                ? new Date(updateData.due_date).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setUpdateData((prev) => ({
                ...prev,
                due_date: new Date(e.target.value),
              }))
            }
          />
        </label>

        <label htmlFor="completed">
          <Text as="div" size="3" mb="1" weight="bold">
            Completed
          </Text>
          <Checkbox
            id="completed"
            checked={updateData.completed}
            onCheckedChange={(checked) =>
              setUpdateData((prev) => ({
                ...prev,
                completed: checked as boolean,
                completed_at: (checked as boolean) ? new Date() : null,
              }))
            }
          />
        </label>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button color="gray" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button onClick={handleEdit}>Edit</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
}
