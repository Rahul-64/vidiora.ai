import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../config/Db";
import { usersTable } from "../../../../config/Schema";
import {eq} from "drizzle-orm"
import { use } from "react";

export async function POST(req:NextRequest) {

    const user = await currentUser();

    //if user in DB 
    const users = await db.select().from(usersTable).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress as string))

    //if user is new user in DB 
    if(users.length == 0 ){
        const newuser = await db.insert(usersTable).values({
            email : user?.primaryEmailAddress?.emailAddress as string,
            name : user?.fullName as string

        }).returning();

        return NextResponse.json(newuser[0]);
    }

    return NextResponse.json(users[0]);

}