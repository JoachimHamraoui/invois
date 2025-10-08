import { MailtrapClient } from "mailtrap"

export const emailClient = new MailtrapClient({
    token: process.env.API_KEY as string
})