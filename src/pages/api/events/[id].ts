import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const event = await prisma.event.findUnique({
        where: { id: Number(id) },
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: "Error fetching event" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
