import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid event id" });
  }

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
  }

  if (req.method === "PUT") {
    const { title, date, description } = req.body;
    try {
      const updatedEvent = await prisma.event.update({
        where: { id: Number(id) },
        data: { title, date: new Date(date), description },
      });
      return res.status(200).json(updatedEvent);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      // 確認 event 是否存在
      const event = await prisma.event.findUnique({
        where: { id: Number(id) },
      });

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      // 刪除 event，同時會 cascade 刪除 registrations
      await prisma.event.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({
        message: "Event and related registrations deleted successfully",
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
