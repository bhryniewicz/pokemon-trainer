import { wait } from "@/db/utils";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const trainersFilePath = path.join(process.cwd(), "src/db", "trainers.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Received body:", body);

    let trainersData = [];
    if (fs.existsSync(trainersFilePath)) {
      const data = fs.readFileSync(trainersFilePath, "utf-8");
      trainersData = JSON.parse(data);
    }

    trainersData.push(body);

    fs.writeFileSync(
      trainersFilePath,
      JSON.stringify(trainersData, null, 2),
      "utf-8"
    );

    return NextResponse.json({ message: "Trainer created successfully", body });
  } catch (error) {
    console.error("Error handling request:", error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (fs.existsSync(trainersFilePath)) {
      await wait(2000);
      const data = fs.readFileSync(trainersFilePath, "utf-8");
      const trainersData = JSON.parse(data);

      return NextResponse.json(trainersData);
    } else {
      return NextResponse.json({});
    }
  } catch (error) {
    console.error("Error retrieving trainers:", error);

    return NextResponse.json(
      { error: "Failed to retrieve trainers" },
      { status: 500 }
    );
  }
}
