const EVENT_TYPE_ID = "6373901"; // Reunião de 30 min

export async function GET() {
  const start = new Date();
  const end = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const url = `https://api.cal.com/v2/slots?eventTypeId=${EVENT_TYPE_ID}&start=${start.toISOString()}&end=${end.toISOString()}&timeZone=America/Sao_Paulo`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.CAL_API_KEY}`,
        "cal-api-version": "2024-09-04",
      },
      next: { revalidate: 300 },
    });
    const json = await res.json();
    const days: unknown = json?.data ?? {};
    const total = Object.values(days as Record<string, unknown[]>).reduce(
      (sum, slots) => sum + (Array.isArray(slots) ? slots.length : 0),
      0
    );
    return Response.json({ total });
  } catch {
    return Response.json({ total: null });
  }
}
