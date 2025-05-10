import prisma from "@/lib/prisma"

export default async function handler(req, res) {
    try {
        const { email, password } = req.body
        // Get user from the database
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' })
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials.' })
        }

        res.status(200).json({ success: true })
    } catch (error) {
        if (error.type === 'CredentialsSignin') {
            res.status(401).json({ error: 'Invalid credentials.' })
        } else {
            res.status(500).json({ error: 'Something went wrong.' })
        }
    }
}