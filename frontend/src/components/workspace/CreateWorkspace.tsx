import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().nonempty("Name Cannot be empty"),
  slug: z
    .string()
    .nonempty("Slug Cannot be empty")
    .min(1)
    .regex(/^[a-z0-9_]+(?:-[a-z0-9_]+)*$/, {
      message: "Invalid slug format",
    }),
});

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const CreateWorkspaceForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createWorkspace(data.name, data.slug);
  };

  const createWorkspace = async (name: string, slug: string) => {
    const { data, error } = await authClient.organization.create({
      name,
      slug,
    });

    if (error) {
      setError(error.message ?? "Unknown Error");
      return;
    }
    navigate(`/${data.slug}`);
  };

  const slugify = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  const name = form.watch("name");
  const debouncedSlug = useDebounce(form.watch("slug"), 250);

  useEffect(() => {
    form.setValue("slug", slugify(name), { shouldValidate: true });
  }, [name]);

  useEffect(() => {
    const checkSlugAvailability = async () => {
      const { error } = await authClient.organization.checkSlug({
        slug: debouncedSlug,
      });

      if (error) {
        console.log(error);
        form.setError("slug", { type: "validate", message: error.message });
      }
    };
    checkSlugAvailability();
  }, [debouncedSlug]);

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      onFocus={() => setError(null)}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="My Workspace"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-description">Slug</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-description"
                placeholder="my-workspace"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {error && (
          <FieldError>
            <span className="text-destructive">{error}</span>
          </FieldError>
        )}
      </FieldGroup>
    </form>
  );
};

export const CreateWorkspaceCard = () => {
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create Workspace</CardTitle>
        <CardDescription>
          Create a Workspace where you can manage your Overlays invite other
          People to collaborate and manage permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateWorkspaceForm />
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export const CreateWorkspaceDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>
        <CreateWorkspaceForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" type="button" variant={"outline"}>
              Close
            </Button>
          </DialogClose>
          <Button size="sm" type="submit" form="form-rhf-demo">
            Create Workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
