import express, { ErrorRequestHandler, Request, Response, NextFunction } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"


import "express-async-errors";
import path from "path"
const app = express()
app.use(express.json())
app.use(cors())

import * as OpenApiValidator from 'express-openapi-validator';

const openApiDocPath = "./openapi.json"
import swaggerDocument from "./openapi.json";

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(__dirname , openApiDocPath),
        validateRequests: {
            coerceTypes: true,
            removeAdditional: "all",
      },
        validateResponses: {
            coerceTypes: true,
            removeAdditional:"all"
        },
        validateApiSpec: true
    }),
);

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.get("/ToDos", async (req, res) => {
    return res.send(await prisma.toDo.findMany())
})

app.post("/ToDos", async (req, res) => {
    const todo = await prisma.toDo.create({
        data: req.body
    })
    return res.status(201).send(todo)
})

app.delete("/ToDos/:id", async (req, res) => {
    const toDo = await prisma.toDo.delete({
        where: {
        id: parseInt(req.params.id)
        }
    })
    return res.send(toDo)
})

app.patch("/ToDos/:id", async (req, res) => {
    const toDo = await prisma.toDo.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })

    return res.send(toDo)
})

app.use((err: ErrorRequestHandler & {
    status: number,
    message: string,
    errors : []
}, req:Request, res:Response, next:NextFunction) => {
    let status = err.status || 500;
    let errors : String[] =  err.errors || []
    let message = err.message || "some error occured"
    if (err.message?.toLowerCase().includes("not found")) {
        status = 404
        message = "resource not found"
        errors.push("resource not found")
    }

    return res.status(status).send({
      message,
      errors
    });
});
  
const PORT = process.env.PORT||8000
app.listen(PORT,() => {
    console.log("server running on port "+PORT)
})