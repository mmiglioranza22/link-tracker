import { Injectable } from '@nestjs/common';
import { CreateLinkDTO } from './dto/create-link.dto';
import { Link } from './entities/link.entity';
import { DatabaseService } from './db';
import { LinkStatsDTO } from './dto/link-stats.dto';
import { checkExpireDate } from './utils';

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

  modifyLinkStats(id: string) {
    DatabaseService.modifyRedirectStats(id);
  }

  getStats(id: string): LinkStatsDTO {
    return { redirected: DatabaseService.getLinkStats(id) };
  }

  _getLink(id: string) {
    return DatabaseService.getLink(id);
  }

  _checkExpireDate(id: string) {
    const { expires } = DatabaseService.getLink(id);
    return checkExpireDate(expires);
  }
}
