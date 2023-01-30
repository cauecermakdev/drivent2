//import userService from "@/services/users-service";
//import ticketRepository from "@/repositories/ticket-repository";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/ticket-service";
import { Enrollment, Ticket, TicketType, User } from "@prisma/client";
import { Request, Response } from "express";
//import { getEnrollmentByUser } from "./enrollments-controller";
//import httpStatus from "http-status";

export async function getTicketType(req: Request, res: Response) {
  //console.log("entra getTicketType function on controllers");
  try {
    const ticketTypes = await ticketsService.getTicketTypeService();
    return res.status(200).send(ticketTypes);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const tickets = await ticketsService.getTicketsByUserId(userId);
    res.status(200).send(tickets);
  } catch (err) {
    res.sendStatus(404);
  }
}

// export async function getTicket(req: Request, res: Response) {
//   const { authorization } = req.headers;
//   const token = authorization?.replace("Bearer ", "");

//   if (!token) return res.sendStatus(401);

//   try {
//     //pego o usuario pelo token
//     const user = (await ticketsService.getUserByToken(token)) as User;
//     if (!user) {
//       res.status(404);
//       return;
//     }

//     //pelo userId descubro o enrollmentId
//     const enrollment = (await ticketsService.getEnrollmentByuserId(user.id)) as Enrollment;

//     //descubro o ticket com enrollmentId
//     const ticket = (await ticketsService.getTicketFromEnrollmentId(enrollment.id)) as Ticket;
//     if (!ticket) {
//       res.status(404);
//       return;
//     }

//     //preciso descobrir o ticketType
//     const ticketTypeObject = (await ticketsService.getTicketTypeServiceUnique(ticket.ticketTypeId)) as TicketType;
//     if (!ticketTypeObject) {
//       res.status(404);
//       return;
//     }

//     const finalObj = {
//       id: ticket.id,
//       status: ticket.status,
//       ticketTypeId: ticket.ticketTypeId,
//       enrollmentId: ticket.enrollmentId,
//       ticketType: ticketTypeObject,
//       createdAt: ticket.createdAt,
//       updatedAt: ticket.updatedAt,
//     };

//     return res.status(200).send(finalObj);
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// }

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = Number(req.body.ticketTypeId);
  const userId = Number(req.userId);

  try {
    const ticket = await ticketsService.createTicket(ticketTypeId, userId);
    res.status(201).send(ticket);
  } catch (err) {
    res.sendStatus(404);
  }
}
