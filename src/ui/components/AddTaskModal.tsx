"use client";
import { queryClient } from "@/data/api/query-client";
import { useCreateTask } from "@/hooks/useCreateTask";
import { CreateTask } from "@/types/task.type";
import { Dialog, Flex, Text, TextField, Button } from "@radix-ui/themes";
import { useState } from "react";

type AddTaskModalProps = {};

export function AddTaskModal(props: AddTaskModalProps) {
  const [taskData, setTaskData] = useState<CreateTask>({
    title: "",
    description: "",
    due_date: null,
  });

  const createTaskMutation = useCreateTask();

  const handleSubmit = () => {
    createTaskMutation.mutateAsync(taskData, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    });

    setTaskData({
      title: "",
      description: "",
      due_date: null,
    });
  };

  const handleClose = () => {
    setTaskData({
      title: "",
      description: "",
      due_date: null,
    });
  };

  return (
    <Dialog.Content size={"4"}>
      <Dialog.Title>Add task</Dialog.Title>
      <Dialog.Description mb={"4"}>
        Enter details below for your new task.
      </Dialog.Description>
      <Flex direction="column" gap="3">
        <label htmlFor="title">
          <Text as="div" size="3" mb="1" weight="bold">
            Title
          </Text>
          <TextField.Root
            placeholder="What to do?"
            size={"3"}
            id="title"
            name="title"
            autoComplete="off"
            value={taskData.title}
            onChange={(e) =>
              setTaskData((prev) => ({
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
            value={taskData.description ?? ""}
            onChange={(e) =>
              setTaskData((prev) => ({
                ...prev,
                description: e.target.value as string,
              }))
            }
          />
        </label>

        <label htmlFor="description">
          <Text as="div" size="3" mb="1" weight="bold">
            Due date
          </Text>
        </label>
        <input
          type="date"
          onChange={(e) =>
            setTaskData((prev) => ({
              ...prev,
              due_date: e.target.valueAsDate,
            }))
          }
        />
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button color="gray" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button onClick={handleSubmit}>Add</Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
}
