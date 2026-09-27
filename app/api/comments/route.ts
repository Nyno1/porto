import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1000),
  postSlug: z.string().min(1),
  parentId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const postSlug = req.nextUrl.searchParams.get("postSlug");
  if (!postSlug) {
    return NextResponse.json({ error: "postSlug required" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postSlug, parentId: null },
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, name: true, role: true } },
        replies: {
          orderBy: { createdAt: "asc" },
          include: {
            author: { select: { id: true, name: true, role: true } },
          },
        },
      },
    });
    return NextResponse.json(comments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Kamu harus login dulu" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createCommentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const comment = await prisma.comment.create({
      data: { ...parsed.data, authorId: session.user.id },
      include: {
        author: { select: { id: true, name: true, role: true } },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
