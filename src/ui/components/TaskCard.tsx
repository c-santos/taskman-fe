"use client";

import type { Task } from "@/types/task.type";
import { formatDate } from "@/utils/formatDate";
import { Card, Checkbox, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
};

export function TaskCard(props: TaskCardProps) {
  const { task } = props;
  const [checked, setChecked] = useState(task.completed);

  return (
    <Card>
      <Flex direction={"row"} justify={"between"} align={"stretch"}>
        <Flex direction={"column"} flexGrow={"1"} style={{ cursor: "pointer" }}>
          <Flex direction={"row"} justify={"between"}>
            <Heading size={"3"}>{task.title}</Heading>
          </Flex>

          <Flex direction={"row"} justify={"between"}>
            <Text color="gray" size={"2"}>
              {task.description}
            </Text>
            <Text color="gray" size={"2"}>
              {formatDate(task.updated_at)}
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
            size={"3"}
            style={{ cursor: "pointer" }}
            onCheckedChange={() => {
              setChecked(!checked);
            }}
            checked={checked}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
