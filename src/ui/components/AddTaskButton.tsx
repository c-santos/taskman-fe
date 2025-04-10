import { Button } from "@radix-ui/themes";

type AddTaskButtonProps = {
  onClick?: () => void;
};

export function AddTaskButton(props: AddTaskButtonProps) {
  return (
    <Button my={"2"} variant="solid" onClick={props.onClick}>
      + Add Task
    </Button>
  );
}
