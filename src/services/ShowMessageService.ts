import prismaClient from '../prisma';

class ShowMessageService {

  async execute() {
    const messases = await prismaClient.message.findMany({
      include: {
        user: true
      },
      take: 4,
      orderBy: {
        created_at: 'desc',
      }
    });
    return messases
  }

}

export { ShowMessageService }