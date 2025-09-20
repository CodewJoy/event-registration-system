import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } else if (req.method === "POST") {
    const { title, date, description } = req.body;
    const newEvent = await prisma.event.create({
      data: { title, date: new Date(date), description },
    });
    console.log("newEvent", newEvent);
    res.status(201).json(newEvent);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
