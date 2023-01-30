import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  let user = await prisma.user.findFirst();
  if (!user) {
   user = await prisma.user.create({
    data: {
     email: "caues@gmail.com",
     password: "1234",
     createdAt: "2023-01-30T01:22:42.350Z",
     updatedAt: "2023-01-30T01:22:42.350Z",
    },
  });
}

  // let session = await prisma.session.create({
  //   data: {
  //    id: 1,
  //    userId: 1,
  //    token: "1234",
  //    createdAt: "2023-01-30T01:22:42.350Z",
  //    updatedAt: "2023-01-30T01:22:42.350Z",
  //   },
  // });

  let enrollment = await prisma.enrollment.findFirst();
  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: {
        id: 1,
        birthday: '2023-01-30T01:22:42.350Z',
        cpf: '44197646860',
        name: 'caue enrollment',
        phone: '35991819444',
        userId: 1,
        createdAt: '2023-01-30T01:22:42.350Z',
        updatedAt: '2023-01-30T01:22:42.350Z',
      },
    });
  }

  // let ticket = await prisma.ticket.create({
  //   data: {
  //    id:1,
  //    createdAt:"2023-01-30T01:22:42.350Z",
  //    ticketTypeId:1,
  //    enrollmentId:1,
  //    status:"PAID",
  //    updatedAt:"2023-01-30T01:22:42.350Z",
  //   },
  // });

  //console.log({ user });
  //console.log({ event });
  console.log({ enrollment });
  // console.log({ session });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
