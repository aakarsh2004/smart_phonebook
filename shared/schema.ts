import { z } from "zod";

export const contactSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email().optional(),
  tag: z.enum(["work", "family", "friends", "other"]),
  favorite: z.boolean().default(false),
  createdAt: z.union([z.date(), z.string()]).default(() => new Date()),
  lastCalled: z.union([z.date(), z.string()]).optional(),
});

export const insertContactSchema = contactSchema.omit({
  id: true,
  createdAt: true,
});

export const callLogSchema = z.object({
  id: z.number(),
  contactId: z.number(),
  duration: z.number(), // in seconds
  timestamp: z.union([z.date(), z.string()]),
  type: z.enum(["outgoing", "incoming", "missed"]),
});

export type Contact = z.infer<typeof contactSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type CallLog = z.infer<typeof callLogSchema>;
