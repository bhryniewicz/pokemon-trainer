"use server";

import { ThemeTypes } from "@/app/layout";
import { cookies } from "next/headers";

export async function saveTheme(theme: ThemeTypes) {
  try {
    const cookieStore = cookies();
    cookieStore.set("theme", theme);
  } catch (e) {
    console.error(e);
  }
}
