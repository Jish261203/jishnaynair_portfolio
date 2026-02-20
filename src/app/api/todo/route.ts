import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";


//  Fetch all todos
export async function GET() {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json({ success: true, data: todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch todos" },
            { status: 500 }
        );
    }
}

//  Create new todo
export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });


        if (!session || session.role !== "AUTHOR") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { text } = body;

        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return NextResponse.json({ success: false, message: "Invalid text" }, { status: 400 });
        }



        const newTodo = await prisma.todo.create({
            data: {
                text: text.trim(),

            },
        });

        return NextResponse.json({ success: true, data: newTodo, message: "Todo created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json(
            { error: "Failed to create todo" },
            { status: 500 }
        );
    }
}

//  Update todo
export async function PATCH(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });


        if (!session || session.role !== "AUTHOR") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, text, done } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: "Missing todo ID" }, { status: 400 });
        }

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                ...(text !== undefined && { text: text.trim() }),
                ...(done !== undefined && { done }),
            },
        });

        return NextResponse.json({ success: true, data: updatedTodo, message: "Todo updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating todo:", error);
        return NextResponse.json(
            { error: "Failed to update todo" },
            { status: 500 }
        );
    }
}

// Delete todo 
export async function DELETE(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });


        if (!session || session.role !== "AUTHOR") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const clearCompleted = searchParams.get("clearCompleted");

        if (clearCompleted === "true") {
            // Delete all completed todos
            await prisma.todo.deleteMany({
                where: { done: true },
            });
            return NextResponse.json({ success: true });
        }

        if (!id) {
            return NextResponse.json({ success: false, message: "Missing todo ID" }, { status: 400 });
        }

        await prisma.todo.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete todo" },
            { status: 500 }
        );
    }
}