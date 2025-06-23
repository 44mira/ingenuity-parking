"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/api/auth";
import {
  get_user,
  reservation_create,
  reservation_detail,
  reservation_update,
} from "@/api/queries";

const formSchema = z.object({
  location: z.coerce.number(),
  price: z.string().refine(
    (val) => {
      const moneyRegex = /^\d+\.\d{2}$/;
      return moneyRegex.test(val);
    },
    {
      message: "Must be a valid money amount (e.g., '123.45')",
    },
  ),
  reserve_start: z.string().datetime({ local: true }),
  reserve_end: z.string().datetime({ local: true }),
  status: z.enum(["ACTIVE", "UPCOMING", "CANCELLED", "PAST"]),
  owner: z.coerce.number(),
});

// for some reason I can't use this in z.enum()
const statusEnum = ["ACTIVE", "UPCOMING", "CANCELLED", "PAST"];

export type reservationForm = z.infer<typeof formSchema>;

export default function ReservationForm() {
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () => {
      if (params.id) {
        return reservation_detail(user, params.id!);
      }
    },
    queryKey: ["reservation-update"],
    enabled: !!params.id,
  });

  const { data: current_user } = useQuery({
    queryFn: () => {
      return get_user(user);
    },
    queryKey: ["reservation-owner"],
  });

  const mutation = useMutation({
    mutationFn: (e: reservationForm) => {
      if (params.id && data) {
        return reservation_update(user, e, params.id!);
      }
      return reservation_create(user, e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservation-list", user],
      });
    },
  });

  const form = useForm<reservationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 0,
      price: "00.00",
      reserve_start: "",
      reserve_end: "",
      status: "UPCOMING",
      owner: 1,
    },
  });

  useEffect(() => {
    if (current_user) {
      form.resetField("owner", current_user.id);
    }
  }, [current_user]);
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = (e: reservationForm) => {
    mutation.mutate(e);
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Parking Location ID"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reserve_start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start of reservation</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reserve_end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End of reservation</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="text" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!params.id}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusEnum.map((e, i) => (
                      <SelectItem key={i} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner ID</FormLabel>
              <FormControl>
                <Input type="number" {...field} disabled />
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
