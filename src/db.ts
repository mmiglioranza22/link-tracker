import { Link } from './entities/link.entity';

interface Dictionary {
  [key: string]: Link;
}

const database: Dictionary = {};

// TODO validation to see if link exists
export class DatabaseService {
  static getLinks() {
    return Object.values(database);
  }

  static addNewLink(link: Link) {
    database[link.id] = link;
    return { el: database[link.id], database };
  }

  static modifyLinkValidation(linkId: string) {
    database[linkId].toggleValid();
    return database[linkId];
  }

  static getTargetLink(linkId: string) {
    database[linkId].increaseRedirected();
    return database[linkId].target;
  }

  static getLinkStats(linkId: string) {
    return database[linkId].redirected;
  }
}
