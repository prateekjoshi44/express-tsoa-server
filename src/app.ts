// src/app.ts
import { RegisterRoutes } from "../build/routes";
import express, { json, urlencoded, Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../build/swagger.json";
import * as fs from 'fs';

export const app = express();
const router = express.Router();

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Override the title dynamically
(swaggerDocument as any).info.title = "Express TSOA Server";
(swaggerDocument as any).info.description = "API documentation for the Express TSOA Server";

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    const html = swaggerUi.generateHTML(swaggerDocument, {
        customSiteTitle: "TSOA Express Server", // <-- Browser tab title

    });
    return res.send(html);
});


RegisterRoutes(router);
app.use(router);
// Global error handler

app.use((err: any, res: express.Response) => {
    // Log the error to console
    console.error('Error:', err);
    // Optionally, log to a file (uncomment below to enable file logging)
    fs.appendFileSync('error.log', `${new Date().toISOString()} - ${err.stack || err}\n`);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
});


// async function main() {
//     // ... you will write your Prisma Client queries here
//     // const product = await prisma.products.create({
//     //     data: {
//     //         name: "Sample Product",
//     //         price: 19.99,
//     //         description: "This is a sample product.",
//     //     }
//     // });
//     // console.log(product)
//     await prisma.products.deleteMany()

//     const allProducts = await prisma.products.findMany()
//     console.log(allProducts)
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

// Error handling