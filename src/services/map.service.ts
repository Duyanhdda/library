import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Map } from 'src/models/map.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map) private mapRespository: Repository<Map>,
  ) {}

  async getAll(): Promise<Map[]> {
    return await this.mapRespository.find();
  }

  async add(map: Map): Promise<void> {
    //console.log(student);
    await this.mapRespository.insert(map);
  }

  async edit(map: Map): Promise<void> {
    await this.mapRespository.update(map.id, map);
  }

  async delete(map: Map): Promise<void> {
    await this.mapRespository.delete(map.id);
  }
  async getById(id: string): Promise<Map> {
    return await this.mapRespository.findOne(id);
  }
//   async getCurrent(): Promise<Student[]> {
//     return await this.mapRespository.find({ currentStatus: true });
//   }
}
