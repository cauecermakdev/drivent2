import { Router } from "express";
import { getTicket, getTicketType, postTicket } from "@/controllers/ticket-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/ticket-schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketType)
  .get("/", getTicket)
  .post("/", validateBody(ticketSchema), postTicket);

export { ticketsRouter };
