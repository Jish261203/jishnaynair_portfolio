import env from "@/config/env";
import axios from "axios";
import { NextResponse } from "next/server";

export const cache = "no-cache"
export const revalidate = 0

export async function GET() {
    const startAt = 1759820400000;
    const endAt = Date.now();

    try {
        const res = await axios.get(
            `https://api.umami.is/v1/websites/${env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`,
            {
                headers: {
                    "x-umami-api-key": env.UMAMI_API_KEY,
                    "Accept": "application/json",

                },

            }
        );



        const data = res.data;
        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.log("Error fetching website stats:", err);
        return NextResponse.json(
            { success: false, message: "Failed to fetch website stats" },
            { status: 500 }
        );
    }
}
