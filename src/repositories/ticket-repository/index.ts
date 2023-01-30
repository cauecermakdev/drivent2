import { prisma } from "@/config";
import { Enrollment, Ticket, TicketStatus, TicketType, User } from "@prisma/client";

async function getTicketType(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function getTicketTypeUnique(ticketTypeId: number): Promise<TicketType> {
  return await prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  });
}

async function getUserIdByTokenRep(token: string): Promise<User> {
  //tem que colocar wherer com token
  const session = await prisma.session.findFirst({
    where: {
      token: token,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },
  });
  return user;
}

async function getEnrollmentByUserIdRep(idUserSearch: number): Promise<Enrollment> {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId: idUserSearch,
    },
  });

  return enrollment;
}

async function getTicketByEnrollmentIdRep(idEnrollSearch: number): Promise<Ticket> {
  const ticket = await prisma.ticket.findMany({
    where: {
      enrollmentId: idEnrollSearch,
    },
  });
  
  //console.log(ticket[0]);
  //console.log(ticket[0].enrollmentId);
  //return;
  return ticket[0];
}

async function findOneById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
    include: {
      Enrollment: true
    }
  });
}

async function updateStatus(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
    include: {
      TicketType: true,
    },
  });
}

async function create(ticketTypeId: number, userId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      status: TicketStatus.RESERVED,
      ticketTypeId,
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
}

async function findOneByUserId(id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  getTicketType,
  getUserIdByTokenRep,
  getEnrollmentByUserIdRep,
  getTicketByEnrollmentIdRep,
  getTicketTypeUnique,
  findOneById,
  findOneByUserId,
  updateStatus,
  create,
  findEnrollmentByUserId,
};

export default ticketRepository;
