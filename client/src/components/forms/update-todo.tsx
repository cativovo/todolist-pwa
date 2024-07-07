import { UpdateTodoPayload } from "@/api/todos";
import { useUpdateTodo } from "@/hooks/todos";
import { StatusTodo } from "@/schema/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TodoStatus } from "../status";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const UpdateTodoFormSchema = UpdateTodoPayload.omit({ id: true });
type UpdateTodoFormSchema = z.infer<typeof UpdateTodoFormSchema>;

type UpdateTodoFormProps = {
  onSubmit?: () => void;
  onCancel?: () => void;
  defaultValues?: Required<UpdateTodoFormSchema>;
};

export function UpdateTodoForm(props: UpdateTodoFormProps) {
  const form = useForm<UpdateTodoFormSchema>({
    resolver: zodResolver(UpdateTodoFormSchema),
  });
  const mutation = useUpdateTodo();
  const params = useParams({ from: "/_authenticated/todos/update/$id" });

  async function handleSubmit(payload: UpdateTodoFormSchema): Promise<void> {
    mutation.mutate({ ...payload, id: params.id });
    props.onSubmit?.();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title:</FormLabel>
              <FormControl>
                <Input {...field} defaultValue={props.defaultValues?.title} />
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
                <Textarea
                  {...field}
                  defaultValue={props.defaultValues?.description}
                  rows={10}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="status"
          render={({ field }) => (
            <FormItem className="self-start">
              <FormLabel>Status:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={props.defaultValues?.status}
              >
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(StatusTodo).map((status) => (
                    <SelectItem key={status} value={status}>
                      <TodoStatus status={status} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update
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
