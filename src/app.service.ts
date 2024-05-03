import { Injectable } from '@nestjs/common';
import { CreateLinkDTO } from './dto/create-link.dto';
import { Link } from './entities/link.entity';
import { DatabaseService } from './db';

@Injectable()
export class AppService {
  createLink(payload: CreateLinkDTO): Link {
    const newLink = new Link(payload);
    DatabaseService.addNewLink(newLink);
    return newLink;
  }

  modifyLink(id: string) {
    return DatabaseService.modifyLinkValidation(id);
  }

  getLinks() {
    return DatabaseService.getLinks();
  }

  redirect(id: string) {
    return DatabaseService.getTargetLink(id);
  }
}
