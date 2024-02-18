import { $Enums, User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function bodyToUser(body: any) : Promise<any> {
    return {
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        name: body.name,
        userType: body.userType as $Enums.UserType,
    }
}