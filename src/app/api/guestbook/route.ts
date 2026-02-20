import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

// List all guestbook entries
export async function GET() {
  try {
    const entries = await prisma.guestbookEntry.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
            role: true,
            accounts: {
              select: {
                providerId: true,
              },
            },
          },
        },
      },
      orderBy: [{ user: { role: "desc" } }, { createdAt: "asc" }],
    });

    return NextResponse.json({
      success: true,
      data: entries,
      message: "Entries fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching guestbook:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch entries" },
      { status: 500 },
    );
  }
}

// Add a new entry
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { user } = session;

    const { content } = await req.json();
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const newEntry = await prisma.guestbookEntry.create({
      data: {
        content: content.trim(),
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            role: true,
            accounts: {
              select: {
                providerId: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newEntry,
        message: "Guestbook entry created successfully",
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Error creating guestbook entry:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create guestbook entry" },
      { status: 500 },
    );
  }
}

// Remove an entry
export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session || session.role === "GUEST") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Guestbook ID is required" },
        { status: 400 },
      );
    }

    const entry = await prisma.guestbookEntry.findUnique({
      where: { id },
    });

    if (!entry) {
      return NextResponse.json(
        { success: false, message: "Guestbook Entry not found" },
        { status: 404 },
      );
    }

    await prisma.guestbookEntry.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Guestbook entry deleted successfully",
    });
  } catch (err: any) {
    console.error("Error deleting guestbook entry:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete guestbook entry" },
      { status: 500 },
    );
  }
}
