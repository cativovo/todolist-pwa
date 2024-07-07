import { CreateTodoPayload } from "@/api/todos";
import { useCreateTodo } from "@/hooks/todos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type CreateTodoFormProps = {
  onSubmit?: () => void;
  onCancel?: () => void;
};

export function CreateTodoForm(props: CreateTodoFormProps) {
  const form = useForm<CreateTodoPayload>({
    resolver: zodResolver(CreateTodoPayload),
  });
  const mutation = useCreateTodo();

  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      description: { value: string };
    };

    const title = target.title.value;
    const description = target.description.value;
    mutation.mutate({ title, description });
    props.onSubmit?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title:</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Textarea {...field} rows={10} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={props.onCancel}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
