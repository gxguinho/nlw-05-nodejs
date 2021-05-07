import express, { response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
 
import './database'

import {routes} from './routes'

const App = express();

App.use(express.static(path.join(__dirname, '..', 'public')));
App.set('views', path.join(__dirname, '..', 'public'));
App.engine('html',require('ejs').renderFile);
App.set("view engine", "html");

App.get("/pages/client", (request,response)=>{
  return response.render('html/client.html')
})

App.get("/pages/admin", (request,response)=>{
  return response.render('html/admin.html')
})

const http = createServer(App);
const io = new Server(http)

io.on("connection", (socket: Socket)=>{
  console.log(" Se conectou:", socket.id)
})

App.use(express.json())
App.use(routes);

export {http,io}