import { Response, Request } from "express";

import express from "express";
import connectDB from "./db/dbConnect";
import ProductRouter from "./features/products/Routes";
const app = express();
app.use(express.json());
connectDB();
const port = 3001;

app.use('/',ProductRouter)

app.post('/', async (req:Request, res:Response)=>{
  res.send({name:'xyz'});
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

