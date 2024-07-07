import { useFindTodoById } from "@/hooks/todos";
import { formatDate } from "date-fns";
import { TodoStatus } from "../status/todo-status";

type TodoProps = {
  id: string;
};

const dateFormat = "PPpp";

export function Todo(props: TodoProps) {
  const { data } = useFindTodoById(props.id);

  return (
    <div className="flex divide-x">
      <div className="flex-1 space-y-1 px-2">
        <h1 className="text-center text-2xl">{data.title}</h1>
        <h2 className="text-xl">Description:</h2>
        <p className="px-2">{data.description}</p>
      </div>
      <div className="basis-1/3 space-y-1 px-2 text-right">
        <TodoStatus status={data.status} />
        <p>created at: {formatDate(data.createdAt, dateFormat)}</p>
        <p>updated at: {formatDate(data.updatedAt, dateFormat)}</p>
      </div>
    </div>
  );
}
