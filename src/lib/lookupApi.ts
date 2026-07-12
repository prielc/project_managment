import { NextRequest, NextResponse } from "next/server";

type LookupRecord = { id: string; name: string };

type LookupDelegate = {
  findMany: (args?: { orderBy: { name: "asc" } }) => Promise<LookupRecord[]>;
  create: (args: { data: { name: string } }) => Promise<LookupRecord>;
  update: (args: {
    where: { id: string };
    data: { name: string };
  }) => Promise<LookupRecord>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

type IdParams = { params: Promise<{ id: string }> };

export function lookupListHandlers(delegate: LookupDelegate, label: string) {
  async function GET() {
    const items = await delegate.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(items);
  }

  async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json(
        { error: `יש להזין ${label}` },
        { status: 400 },
      );
    }

    try {
      const item = await delegate.create({ data: { name } });
      return NextResponse.json(item, { status: 201 });
    } catch {
      return NextResponse.json(
        { error: `הערך "${name}" כבר קיים` },
        { status: 409 },
      );
    }
  }

  return { GET, POST };
}

export function lookupItemHandlers(delegate: LookupDelegate, label: string) {
  async function PATCH(request: NextRequest, ctx: IdParams) {
    const { id } = await ctx.params;
    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json(
        { error: `יש להזין ${label}` },
        { status: 400 },
      );
    }

    try {
      const item = await delegate.update({ where: { id }, data: { name } });
      return NextResponse.json(item);
    } catch {
      return NextResponse.json(
        { error: "עדכון נכשל — ייתכן שהערך נמחק, או שהשם כבר קיים" },
        { status: 400 },
      );
    }
  }

  async function DELETE(_request: NextRequest, ctx: IdParams) {
    const { id } = await ctx.params;

    try {
      await delegate.delete({ where: { id } });
      return new NextResponse(null, { status: 204 });
    } catch {
      return NextResponse.json(
        { error: "לא ניתן למחוק — ייתכן שהערך בשימוש בפרויקט קיים" },
        { status: 409 },
      );
    }
  }

  return { PATCH, DELETE };
}
