import { NextResponse } from "next/server";
import { createBookingRequest } from "@/lib/data/store";
import { bookingRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    await createBookingRequest({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      start_date: parsed.data.start_date,
      end_date: parsed.data.end_date,
      adults: parsed.data.adults,
      children: parsed.data.children,
      message: parsed.data.message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Erreur serveur" },
      { status: 500 },
    );
  }
}
