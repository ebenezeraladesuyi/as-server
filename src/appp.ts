import express, { Application, Request, Response } from "express";
import cors from "cors";
import contactUsRouter from "./routes/ContactRoutes";
import subscribeRouter from "./routes/SubscribeRouter";
import blogRouter from "./routes/BlogRouter";
import commentRouter from "./routes/BlogInteractionRouter";
import adminRouter from "./routes/adminRouter";


const appConf = (app: Application) => {
    app.use(express.json()).use(cors());

    // routes
    app.use("/mail", contactUsRouter)
    app.use("/sub", subscribeRouter)
    app.use("/blog", blogRouter)
    app.use("/action", commentRouter)
    app.use("/admin", adminRouter)


    app.get("/", (req:Request, res: Response): any => {
        return res.status(200).json({
            message: "default get them wella"
        })
    })
}

export default appConf;