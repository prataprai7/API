import express, { Application, NextFunction, Request, Response} from 'express';

// import {router} from './routes/person.route'; => no because in person.route there has been use of default while exporting
import personRoute from './routes/person.route';
import { HttpException } from './exceptions/http-exception';
import { ApiResponseHelper } from './utils/api-response';


const app: Application = express();

app.use(express.json()); //use json a request
app.use(express.urlencoded({extended: true})); //use form-urlencoded as request

app.use("/api/persons",personRoute);

type Product ={
    id: number;
    name: string;
    price: number;
    category? : string;
}
const products: Product[]=[
    {id:1, name: 'Apple', price: 250, category: 'A'},
    {id:2, name: 'Orange', price: 200, category: 'B'},
    {id:3, name: 'Mango', price: 220, category: 'A'},
    {id:4, name: 'Banana', price: 350, category: 'C'},
    {id:5, name: 'Cherry', price: 300, category: 'B'},

];
//task fill this products array with 5 products
// 1. Make all 5 api endpoints for products
// On create and update, request.body, if name and price is not provided
// default to "Unknown Product" and 0 respectively
// On each find query, if not found return 404 with message "Product not found"


const data = [
    {id: 1, name: 'Jo', age: 30},
    {id: 2, name: 'No', age: 31},
    {id: 3, name: 'Bo', age: 33},
]
//5.major api endpoints:
//1.GET all
app.get(
    "/api/persons",
    (req: Request, res: Response)=> {
        //later paginated results
        return res.status(200).json(data)
    }
);

app.get(
    "/api/products",
    (req: Request, res: Response)=>{
        return res.status(404).json(data)
    }
);

//2. GET by id-Get one
app.get(
    "/api/persons/:id",
    (req: Request, res: Response)=>{
        const {id} = req. params; //:id
        const person = data.find(p => p.id == parseInt(id as string));
        return res.status(200).json(person);
    }
);

// app.get(
//   "/api/products/:id",
//   (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const product = products.find(p => p.id === id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.json(product);
//   }
// );

//3. POST-Create
app.post(
    "/api/persons",
    (req: Request, res: Response)=>{
        const {name, age}= req.body; //client request body
        const newPerson= {
            id: data.length+1,
            name,
            age
        }
        data.push(newPerson);
        return res.status(201).json(newPerson);
    }
);

// app.post(
//     "/api/products",
//     (req: Request, res: Response)=>{
//         const {name, product} = req.body;
//         const newProduct= {
//             id: product.length+1,
//             name: name || 'Unknown Product',
//             price: price || 0,
//             category
//         };
//         product.push(newProduct);
//         return res.status(404).json(newProduct);
//     }
// );
//Update (get one and update)
//4.1 PUT - update whole/most resource
//4.2 PATCH - update part of resource
app.put(
    "/api/persons/:id",
    (req: Request, res: Response)=>{
        const {id} = req.params; //:id
        const {name, age} = req.body; //client request body
        const personIndex = data.findIndex(p => p.id === parseInt(id as string));

        const updatePerson = {
            name,
            age
        }
        data[personIndex] = {...data[personIndex], ...updatePerson};

        return res.status(200).json(updatePerson);
    }
);

// app.put(
//     "/products/:id",
//     (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const product = products.find(p => p.id === id);

//     if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//     }

//     const { name, price, category } = req.body;

//     product.name = name || "Unknown Product";
//     product.price = price || 0;
//     product.category = category;

//     res.json(product);
//     }
// );

//5. DELETE - delete one
app.delete(
    "/api/persons/:id",
    (req: Request, res: Response)=>{
        const {id}= req.params; 
        const personIndex = data.findIndex(p=> p.id === parseInt(id as string));
        data.splice(personIndex,1);
        return res.status(204).json({message: "Person deleted"});
    }
);

// app.delete(
//     "/products/:id", 
//     (req: Request, res: Response) => {
//     const { id } = req.params;

//     const index = products.findIndex(
//         (p) => p.id === parseInt(id)
//     );

//     if (index === -1) {
//         return res.status(404).json({
//         message: "Product not found"
//         });
//     }

//     const deleted = products.splice(index, 1);
//     res.json(deleted[0]);
//     }
// );


app.get(
    '/hello',//declaring the path
    (req: Request, res: Response) => {
        return res.send('Hello World');
    }
);


app.get(
    '/hello/:name',//declaring the path
    (req: Request, res: Response) => {
        //const name = req.params.name
        const {name} = req.params; //:name
        const {title} = req.query; // ?title=Dr.
        return res.send(`Hello, ${title} ${name}!`);
    }
);


//task
app.get(
    '/hello/:name/:age',//declaring the path
    (req: Request, res: Response) => {
        //const name = req.params.name
        const {name, age} = req.params; //:name, :age
        const { title, category } = req.query; //title=Dr.&category=doctor
        //return "Hello Dr. John, you are 30 years old and your category is doctor"
        return res.send(`Hello ${title} ${name}, you are ${age} years old and your category is ${category}`);
    }
);
// localhost:8088/hello/John/21?title=Dr.&category=doctor

// global handler if no route match, return 404
app.use(
    (req: Request, res: Response)=>{
        return res.status(404).json({message: "Route not found"});
    }
);

// global error handler
app.use(
    (err: Error, req: Request, res: Response, next: NextFunction)=> {
        if(err instanceof HttpException){
            return ApiResponseHelper.error(
                res,
                err.message,
                err.status
            );
        }
        return ApiResponseHelper.error(
            res,
            err?.message || "Internal Server Error",
            500
        );
        
    }
);


const PORT: number = 8088;
const dummy: string ="Dummy"

export{
    PORT,
    dummy
}
export default app;

// app.listen(
//     PORT,
//     ()=>{
//         console.log(`Server running: ${PORT}`);
//     }
// );
//execute script: npx tsx --watch app.ts
//http://localhost:8088

