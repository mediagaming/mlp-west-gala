import { prisma } from "@/lib/prisma";

export default class Registeration {
  static async getRegistration(
    id?: number,
    unique?: { mobile: string; dob: string }
  ) {
    const where = id
      ? { id }
      : unique
      ? {
          mobile_dob: {
            mobile: unique.mobile,
            dob: unique.dob,
          },
        }
      : undefined;

    if (!where) {
      return null;
    }

    try {
      const registration = await prisma.registration.findUnique({
        where,
        include: {
          Checkin: true,
        },
      });
      return registration;
    } catch (error) {
      return null;
    }
  }
  static async getRegisterations(filters?: {
    division?: string;
    school?: string;
    search?: string;
  }) {
    const where = filters
      ? {
          OR: [
            {
              division: filters.division,
            },
            {
              school: filters.school,
            },
          ],
          AND: filters.search
            ? {
                OR: [
                  {
                    name: {
                      contains: filters.search,
                    },
                  },
                  {
                    place: {
                      contains: filters.search,
                    },
                  },
                ],
              }
            : undefined,
        }
      : {};

    try {
      const registrations = await prisma.registration.findMany({
        where,
        include: {
          Checkin: true,
        },
      });
      return registrations;
    } catch (error) {
      return [];
    }
  }
  static async create(data: {
    name: string;
    mobile: string;
    dob: string;
    place: string;
    division: string;
    school: string;
  }) {
    try {
      const registration = await prisma.registration.create({
        data,
      });
      return registration;
    } catch (error) {
      return false;
    }
  }
  static async delete(id: number) {
    try {
      const registration = await prisma.registration.delete({
        where: {
          id,
        },
      });
      return !!registration;
    } catch (error) {
      return false;
    }
  }
}
