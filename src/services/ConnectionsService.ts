import { getCustomRepository, Repository } from "typeorm"
import {ConnectionsRepository} from '../repositories/ConnectionsRepository'
import {Connection} from '../entities/connection'

interface ConnectionCreate{
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;

}

class ConnectionsService{
  private connectionsRepository: Repository<Connection>
  constructor(){
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }
  async create({socket_id,admin_id,user_id,id}: ConnectionCreate){
    const connection = this.connectionsRepository.create({
      socket_id,
      admin_id,
      user_id,
      id
    })
    await this.connectionsRepository.save(connection);
    return connection

  }
  async findById(user_id:string){
    const connection = await this.connectionsRepository.findOne({user_id})
    return connection

  }
  async findAllWithoutAdmin(){
    const connections = await this.connectionsRepository.find({
        where: { admin_id: null},
        relations: ["user"]
    });

    return connections;
}
  async findBySocketId(socket_id:string ){
    const connection = await this.connectionsRepository.findOne({socket_id})
    return connection;
  }
  async updateAdminId(user_id: string, admin_id:string){
    await this.connectionsRepository.createQueryBuilder().
    update(Connection)
    .set({ admin_id })
    .where("user_id = :user_id", {
        user_id,
    }).execute();
  }
  async removeAdminId(user_id: string){
    await this.connectionsRepository.createQueryBuilder().
    update(Connection)
    .set({ admin_id:null })
    .where("user_id = :user_id", {
        user_id,
    }).execute();
  }
}

export {ConnectionsService}