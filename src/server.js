require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/appError");
const uploadConfig = require("./configs/uploads");

const cors = require("cors");
const express = require("express"); //importar express

const routes = require("./routes");

migrationsRun();

const app = express(); // inicializar express
app.use(cors());
app.use(express.json()); // informação específicada como formato json"

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);


app.use( (error, request, response, next) =>{
  if(error instanceof AppError){ // erro do lado do cliente
    return response.status(error.statusCode).json( {
      status: "error",
      message: error.message
    }
    );
  }
  
  console.error(error);

  return response.status(500).json( {
    status: "error",
    message: "Internal server error"
  }
  );
})

const PORT = process.env.PORT || 3333;
app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`) );

// métodos https: get, post, put, patch, delete 