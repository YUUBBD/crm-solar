import { ok, fail } from "../_utils";
export async function GET(req: Request) {
  const address = new URL(req.url).searchParams.get("address")?.trim();
  if (!address) return fail("Falta la dirección");
  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", address); url.searchParams.set("format", "jsonv2"); url.searchParams.set("limit", "1"); url.searchParams.set("countrycodes", "ar");
    const r = await fetch(url,{headers:{"User-Agent":process.env.GEOCODING_USER_AGENT||"SolarCRM/1.0"},next:{revalidate:3600}});
    if(!r.ok) return fail("No se pudo consultar el mapa",502);
    const data=await r.json(); if(!data?.length) return fail("No encontramos esa dirección. Probá agregando ciudad y provincia.",404);
    return ok({lat:Number(data[0].lat),lng:Number(data[0].lon),displayName:data[0].display_name});
  } catch { return fail("Error al buscar la dirección",500); }
}
