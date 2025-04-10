"use client";

import type { Task } from "@/types/task.type";
import { formatDate } from "@/utils/formatDate";
import { Card, Checkbox, Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
};

export function TaskCard(props: TaskCardProps) {
  const { task } = props;
  const [checked, setChecked] = useState(task.completed);
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/tasks/${task.id}`)}>
      <Flex direction={"row"} justify={"between"} align={"stretch"}>
        <Flex direction={"column"} flexGrow={"1"} style={{ cursor: "pointer" }}>
          <Flex direction={"row"} justify={"between"}>
            <Heading size={"3"}>{task.title}</Heading>
            <Text color="gray" size={"2"}>
              Due date: {task.due_date ? formatDate(task.due_date) : "None"}
            </Text>
          </Flex>

          <Flex direction={"row"} justify={"between"}>
            <Text color="gray" size={"2"}>
              {task.description}
            </Text>
            <Text color="gray" size={"2"}>
              Last edited at: {formatDate(task.updated_at)}
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={"row"}
          justify={"between"}
          align={"center"}
          mx={"2"}
          px={"2"}
        >
          <Checkbox
            variant="soft"
            size={"3"}
            style={{ cursor: "pointer" }}
            contentEditable={false}
            checked={checked}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
