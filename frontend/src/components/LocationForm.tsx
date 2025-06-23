"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/api/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  location_create,
  location_detail,
  location_update,
} from "@/api/queries";

const formSchema = z.object({
  name: z.string(),
  slots: z.coerce.number(),
});
export type locationForm = z.infer<typeof formSchema>;

export default function LocationForm() {
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () => {
      if (params.id) {
        return location_detail(user, params.id!);
      }
    },
    queryKey: ["location-update"],
    enabled: !!params.id,
  });

  const mutation = useMutation({
    mutationFn: (e: locationForm) => {
      if (params.id && data) {
        return location_update(user, e, params.id!);
      }
      return location_create(user, e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["location-list", user],
      });
    },
  });

  const form = useForm<locationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slots: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        slots: data.slots,
      });
    }
  }, [data, form]);

  const onSubmit = (e: locationForm) => {
    mutation.mutate(e);
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="Parking Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slots</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
