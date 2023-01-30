import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import { Enrollment, Ticket, TicketType, User } from "@prisma/client";
//import { string } from 'joi';
//import dayjs from 'dayjs';

async function getTicketTypeService(): Promise<TicketType[]> {
  const ticketType = await ticketRepository.getTicketType();
  if (!ticketType) throw notFoundError();

  return ticketType;
}

async function getTicketTypeServiceUnique(ticketId: number): Promise<TicketType> {
  const ticketTypeUnique = await ticketRepository.getTicketTypeUnique(ticketId);

  return ticketTypeUnique;
}

async function getUserByToken(token: string): Promise<User> {
  const user = (await ticketRepository.getUserIdByTokenRep(token)) as User;
  if (!user) throw notFoundError();
  return user;
}

async function getEnrollmentByuserId(idUser: number): Promise<Enrollment> {
  const enrollment = (await ticketRepository.getEnrollmentByUserIdRep(idUser)) as Enrollment;
  if (!enrollment) throw notFoundError();
  return enrollment;
}

async function getTicketFromEnrollmentId(idEnrollSearch: number): Promise<Ticket> {
  const ticket = (await ticketRepository.getTicketByEnrollmentIdRep(idEnrollSearch)) as Ticket;
  return ticket;
}

async function createTicket(ticketTypeId: number, userId: number) {
  const enrollment = await ticketRepository.findEnrollmentByUserId(userId);
  if(!enrollment) throw notFoundError();
  const ticket = await ticketRepository.create(ticketTypeId, userId, enrollment.id);
  return ticket;
}

async function getTicketsByUserId(userIdSearch: number) {
  const tickets = await ticketRepository.findOneByUserId(userIdSearch);
  if(!tickets) throw notFoundError();
  return tickets;
}

const ticketsService = {
  getTicketsByUserId,
  getTicketTypeService,
  getUserByToken,
  getEnrollmentByuserId,
  getTicketFromEnrollmentId,
  getTicketTypeServiceUnique,
  createTicket,
  //   isCurrentEventActive,
};

export default ticketsService;
