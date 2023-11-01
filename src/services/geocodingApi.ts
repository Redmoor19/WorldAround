const NINJA_KEY = process.env.NEXT_PUBLIC_NINJA_API;

const headers = { "X-Api-Key": `${NINJA_KEY}` };

export async function forwardGeocoding(city: string, country: string) {
  "use client";
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`,
      { headers }
    );
    const data = await res.json();
    return data[0];
  } catch (e) {
    throw new Error("Couldn't get the position");
  }
}

export async function reverceGeocoding(latitude: number, longitude: number) {
  "use client";
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`,
      { headers }
    );
    const data = await res.json();
    return data[0];
  } catch (e) {
    throw new Error("Couldn't get the position");
  }
}
