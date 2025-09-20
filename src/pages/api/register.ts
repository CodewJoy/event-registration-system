import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const registrations = await prisma.registration.findMany({
      include: {
        user: true, // 連帶 user 資料
        event: true, // 連帶 event 資料
      },
    });
    return res.status(200).json(registrations);
  }
  if (req.method === "POST") {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({ error: "Missing userId or eventId" });
    }

    try {
      const registration = await prisma.registration.create({
        data: {
          user: { connect: { id: Number(userId) } },
          event: { connect: { id: Number(eventId) } },
        },
      });

      return res.status(201).json(registration);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
