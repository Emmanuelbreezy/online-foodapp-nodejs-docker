import bcrypt from "bcryptjs"

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password:string, salt:string) => {
    return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async (password:string, hashPassword:string) => {
    return await bcrypt.compare(password, hashPassword)
}

