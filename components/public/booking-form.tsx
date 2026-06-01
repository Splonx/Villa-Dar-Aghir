"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bookingRequestSchema } from "@/lib/validators";

type FormValues = z.infer<typeof bookingRequestSchema>;

const defaults: FormValues = {
  name: "",
  phone: "",
  email: "",
  start_date: "",
  end_date: "",
  adults: 2,
  children: 0,
  message: "Bonjour, je souhaite connaitre la disponibilite et le tarif.",
};

export function BookingForm() {
  const [serverMessage, setServerMessage] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: defaults,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError("");
    setServerMessage("");

    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setServerError("Envoi impossible. Verifiez les informations puis recommencez.");
      return;
    }

    setServerMessage("Demande envoyee. Nous revenons vers vous rapidement.");
    form.reset(defaults);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-white/85 p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Nom</label>
          <Input {...form.register("name")} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Telephone</label>
          <Input {...form.register("phone")} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <Input {...form.register("email")} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Arrivee</label>
          <Input type="date" {...form.register("start_date")} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Depart</label>
          <Input type="date" {...form.register("end_date")} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Adultes</label>
          <Input type="number" min={1} {...form.register("adults", { valueAsNumber: true })} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Enfants</label>
          <Input type="number" min={0} {...form.register("children", { valueAsNumber: true })} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Message</label>
        <Textarea rows={4} {...form.register("message")} />
      </div>

      {serverError ? <p className="text-sm text-red-700">{serverError}</p> : null}
      {serverMessage ? <p className="text-sm text-green-700">{serverMessage}</p> : null}

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Envoi..." : "Envoyer la demande"}
      </Button>
    </form>
  );
}
