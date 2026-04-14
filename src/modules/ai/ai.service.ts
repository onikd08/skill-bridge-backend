import { SchemaType, Tool } from "@google/generative-ai";
import { prisma } from "../../lib/prisma";

export const tools = {
  searchTutors: async (args: {
    categoryName?: string;
    maxHourlyRate?: number;
    minExperience?: number;
    hasAvailableTimeSlot?: boolean;
  }) => {
    return await prisma.tutorProfile.findMany({
      where: {
        AND: [
          args.categoryName
            ? {
                categories: {
                  some: {
                    categoryName: { contains: args.categoryName, mode: "insensitive" },
                  },
                },
              }
            : {},
          args.maxHourlyRate
            ? {
                hourlyRate: { lte: args.maxHourlyRate },
              }
            : {},
          args.minExperience
            ? {
                experience: { gte: args.minExperience },
              }
            : {},
          args.hasAvailableTimeSlot
            ? {
                availability: {
                  some: {
                    isBooked: false,
                    startTime: { gt: new Date() },
                  },
                },
              }
            : {},
        ],
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        categories: {
          select: { categoryName: true },
        },
        availability: {
          where: {
            isBooked: false,
            startTime: { gt: new Date() },
          },
          take: 3,
          orderBy: { startTime: "asc" },
          select: {
            startTime: true,
            endTime: true,
            totalPrice: true,
          },
        },
      },
      take: 5,
      orderBy: { averageRating: "desc" },
    });
  },
};

export const tutorToolDeclaration: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "searchTutors",
        description: "Search for tutors based on category, maximum hourly rate, and minimum years of experience.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            categoryName: {
              type: SchemaType.STRING,
              description: "The category or subject name the user wants to learn (e.g., Math, Programming)",
            },
            maxHourlyRate: {
              type: SchemaType.NUMBER,
              description: "The maximum hourly rate the user is willing to pay",
            },
            minExperience: {
              type: SchemaType.NUMBER,
              description: "The minimum years of experience required",
            },
            hasAvailableTimeSlot: {
              type: SchemaType.BOOLEAN,
              description: "Whether the user exclusively wants tutors who currently have unbooked, available time slots in the future.",
            },
          },
        },
      },
    ],
  },
];
