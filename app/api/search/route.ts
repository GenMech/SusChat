import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(
      "https://xkdcd1ic4k.execute-api.ap-southeast-2.amazonaws.com/default/sq",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.X_QUERY_SEARCH_API_KEY,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from API" },
      { status: 500 }
    );
  }
}
