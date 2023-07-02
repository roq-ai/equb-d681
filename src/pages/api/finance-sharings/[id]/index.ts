import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { financeSharingValidationSchema } from 'validationSchema/finance-sharings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.finance_sharing
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFinanceSharingById();
    case 'PUT':
      return updateFinanceSharingById();
    case 'DELETE':
      return deleteFinanceSharingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFinanceSharingById() {
    const data = await prisma.finance_sharing.findFirst(convertQueryToPrismaUtil(req.query, 'finance_sharing'));
    return res.status(200).json(data);
  }

  async function updateFinanceSharingById() {
    await financeSharingValidationSchema.validate(req.body);
    const data = await prisma.finance_sharing.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFinanceSharingById() {
    const data = await prisma.finance_sharing.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
