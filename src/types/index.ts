export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Registration {
  id: number;
  userId: number;
  eventId: number;
  user: User; // 新增，對應 include 的 user
  event: Event; // 新增，對應 include 的 event
  createdAt: Date;
  updatedAt: Date;
}
