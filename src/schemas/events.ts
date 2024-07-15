import { EVENT_STATE } from '@prisma/client'
import { z } from 'zod'

export const createEventSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1).max(255),
  gests: z.array(z.string()).min(1).max(255),
  eventDate: z.date(),
  eventTime: z.string().trim().min(1).max(255),
  isFree: z.boolean(),
  lat: z.number(),
  lng: z.number(),
  authorId: z.string()
})

export const createEventFormSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1).max(255),
  isFree: z.boolean()
})

export const updateEventSchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  description: z.string().trim().min(1).max(255).optional(),
  gests: z.array(z.string()).min(1).max(255).optional(),
  eventDate: z.date().optional(),
  eventTime: z.string().trim().min(1).max(255).optional(),
  isFree: z.boolean().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  authorId: z.string().optional(),
  state: z.nativeEnum(EVENT_STATE).optional()
})
