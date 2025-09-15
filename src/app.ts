// src/app.ts
import { RegisterRoutes } from "../build/routes";
import express, { json, urlencoded, Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../build/swagger.json";

export const app = express();
const router = express.Router();

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());

// app.use(
//     "/docs",
//     swaggerUi.serve,
//     swaggerUi.setup(async (_req: ExRequest, res: ExResponse) => {
//         return res.send(
//             swaggerUi.generateHTML(await import("../build/swagger.json"))
//         );
//     },
//         { customSiteTitle: "Your Custom Site Title" }
//     )
// );

// 👇 Override the title dynamically
(swaggerDocument as any).info.title = "Express TSOA Server";
(swaggerDocument as any).info.description = "API documentation for the Express TSOA Server";

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    const html = swaggerUi.generateHTML(swaggerDocument, {
        customSiteTitle: "TSOA Express Server", // <-- Browser tab title

    });
    return res.send(html);
});


RegisterRoutes(router);