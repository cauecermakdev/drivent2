import { TicketType } from "@prisma/client";
import { TicketsInput } from "@/protocols";
import Joi from "joi";

export const ticketTypeSchema = Joi.object<TicketType>({
  id: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  isRemote: Joi.boolean().required(),
  includesHotel: Joi.boolean().required(),
  createdAt: Joi.string().isoDate().required(),
  updatedAt: Joi.string().isoDate().required(),
});

export const ticketSchema = Joi.object<TicketsInput>({
  ticketTypeId: Joi.number().required(),
});
