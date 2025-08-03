import express, { Request, Response } from "express"
import { JWT_SECRET } from "@repo/backend-common/config"
import jwt from "jsonwebtoken"
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/db"
import bcrypt from "bcrypt"
import { Middleware } from "./middleware.js"
import cors from "cors"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from "passport";
import dotenv from 'dotenv'
import session from "express-session"

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) return done(new Error("No email found in Google profile"), false);
                let user = await prismaClient.user.findUnique({ where: { email } });

                if (!user) {
                    user = await prismaClient.user.create({
                        data: {
                            email,
                            name: profile.displayName,
                            photo: profile.photos?.[0]?.value || null,
                            password: "", // Google login, no password
                        },
                    });
                }

                return done(null, user ?? false);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prismaClient.user.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
    })
);

// Initialize Passport and restore login sessions
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.status(200).json("This is the server")
})
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/dashboard' })
);

app.post("/signin", async (req, res) => {

    const parsedData = SigninSchema.safeParse(req.body)

    if (!parsedData.success) {
        res.json({ message: "Incorrect inputs" })
        return;
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.username
            }
        })

        if (!user) {
            res.status(403).json({
                message: "Not authorised"
            })
        }
        let result = await bcrypt.compare(parsedData.data.password, user?.password || "")
        if (result) {
            const token = jwt.sign({ userID: user?.id }, JWT_SECRET)
            res.status(200).json(token)
            return;
        }
        res.json({ message: "No user found" })
    }
    catch (err) {
        res.json({ message: err })
    }

    return;
})

app.post("/signup", async (req: Request, res: Response) => {

    const parsedData = CreateUserSchema.safeParse(req.body)
    console.log(parsedData);

    if (!parsedData.success) {
        res.json({ message: "Incorrect inputs" })
        return
    }

    try {

        const newUser = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                password: bcrypt.hashSync(parsedData.data?.password, 3),
                name: parsedData.data.name
            }
        })
        res.status(200).json(newUser)
        return
    } catch (err) {
        res.status(411).json({
            message: "User already exists with this username"
        })
        return
    }
})


app.get('/logout', (req, res) => {
    req.logout(() => res.redirect('/'));
});

app.post("/room", Middleware, async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/auth/google');
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({ message: "Incorrect Inputs" })
        return;
    }

    const userId = req.userID;

    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
    }

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });

        res.status(200).json({ roomID: room.id });
    } catch (err) {
        res.status(500).json({ message: "Error creating room", error: err });
    }

    return
})

app.get("/chats/:roomId", async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/auth/google');
    const roomId = Number(req.params.roomId);
    console.log(roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })
    res.json({
        messages
    })
    return;
})

app.get("/room/:slug", async (req, res) => {
    console.log("slug endpoint")
    const slug = req.params.slug;
    console.log(slug)
    const room = await prismaClient.room.findFirst({
        where: {
            slug: slug
        }
    })
    res.json({
        room
    })
    return;
})

app.listen(3004, () => {
    console.log("server is running on 3004", JWT_SECRET)
})