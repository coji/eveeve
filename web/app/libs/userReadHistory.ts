import { prisma } from "../utils/prisma";

export async function updateUserReadHistory(
	userId: number,
	pageVersionId: number,
	lastReadDataNumber: number,
) {
	await prisma.userReadHistory.upsert({
		where: {
			userId_pageVersionId: {
				userId: userId,
				pageVersionId: pageVersionId,
			},
		},
		update: {
			lastReadDataNumber: lastReadDataNumber,
			readAt: new Date(),
		},
		create: {
			userId: userId,
			pageVersionId: pageVersionId,
			lastReadDataNumber: lastReadDataNumber,
		},
	});
}

export async function getLastReadDataNumber(
	userId: number,
	pageVersionId: number,
) {
	const readHistory = await prisma.userReadHistory.findUnique({
		where: {
			userId_pageVersionId: {
				userId: userId,
				pageVersionId: pageVersionId,
			},
		},
		select: {
			lastReadDataNumber: true,
		},
	});

	return readHistory?.lastReadDataNumber ?? 0;
}