"use client";

import { AddTaskButton } from "@/ui/components/AddTaskButton";
import { AddTaskModal } from "@/ui/components/AddTaskModal";
import { TaskList } from "@/ui/components/TaskList";
import { Dialog } from "@radix-ui/themes";

export default function TasksPage() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <AddTaskButton />
      </Dialog.Trigger>
      <AddTaskModal />
      <TaskList />
    </Dialog.Root>
  );
}
