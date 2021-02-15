import { Application, application, request, response } from "express";
import express,{Request,Response} from 'express';
import Producto from './Productos';
import bodyp from 'body-parser';

const app:Application = express();

app.use(bodyp.json());


const productos = [
    {
        "title": "producto 1",
        "price": 230,
        "thumbnail": "url del primer producto"
    },
    {
        "title": "producto 2",
        "price": 123,
        "thumbnail": "url del segundo producto"
    },
    {
        "title": "producto 3",
        "price": 1280,
        "thumbnail": "url del tercer producto"
    },
    {
        "title": "producto 4",
        "price": 988,
        "thumbnail": "url del cuarto producto"
    },
    {
        "title": "producto 5",
        "price": 450,
        "thumbnail": "url del quinto producto"
    },
    {
        "title": "producto 6",
        "price": 890,
        "thumbnail": "url del sexto producto"
    },
    {
        "title": "producto 7",
        "price": 665,
        "thumbnail": "url del septimo producto"
    },
    {
        "title": "producto 8",
        "price": 1562,
        "thumbnail": "url del octavo producto"
    }
]

let aProductos : any[] = [];



app.post("/api/productos", verificarDatosinsertProducto, (req:Request,res:Response) => {
    try {
        const { title, price, thumbnail } = req.body;
        let objeto = {
            "title": title,
            "price": price,
            "thumbnail": thumbnail
        }
        let productoNuevo = new Producto(aProductos.length + 1, objeto);
        aProductos = [...aProductos, productoNuevo];
        res.status(200);
        res.json(productoNuevo);    
    } catch (error) {
        res.status(400);
        res.json({ codigo: 'Error', mensaje : "error inesperado, " + error});
    }
});

app.get("/api/productos", (req:Request,res:Response) => { 
    if (aProductos.length > 0){
        res.status(200);
        res.json(aProductos);
    } else {
        res.status(400);
        res.json({ codigo: 'Error', mensaje : "No hay productos cargados"});
    }
});

app.get("/api/productos/:id", Verificardatos, (req:Request,res:Response) => {
    let id: string = req.params.id;
    var productoSeleccionado = aProductos.filter((array) => array.Id == id);
    if (productoSeleccionado.length > 0){
        res.status(200);
        res.json(productoSeleccionado);
    } else {
        res.status(404);
        res.json({ codigo: 'Error', mensaje : "Producto no encontrado"});
    }
    
});

function GenerarListaProductos() {
    let indice: number = 0;
    productos.forEach(element => {
        indice ++;
        let X = new Producto(indice, element);
        aProductos = [...aProductos, X];
    });
}

async function verificarDatosinsertProducto(req: Request, res: Response, next: Function) {
    const { title, price, thumbnail } = req.body;
    if (title == "" || !price || thumbnail == "") {
        res.status(400);
        res.json({codigo: '400', error : "Faltan valores, por favor verifique"});
    } else {
        next();
    };
};

async function Verificardatos(req: Request, res: Response, next: Function) {
    if (isNaN(parseInt(req.params.id))) {    
        res.status(404);
        res.json({ codigo: '404', mensaje : "error en la URL, verifique"});
    }else{
        next();
    }
};

app.listen(8080,()=>{
    try {
        GenerarListaProductos();
        console.log("server iniciado en puerto 8080, recuerde que es /api/");
    } catch (error) {
        console.log("error: " + error);
    }
});