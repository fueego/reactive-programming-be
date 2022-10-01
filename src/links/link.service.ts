import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { LinkDto } from './link.dto';
import { LinkData } from './link.controller';

@Injectable()
export class LinkService {
  private links: LinkData[] = [];

  getAllLinks(): LinkData[] {
    return this.links;
  }

  getSingleLink(id: string): LinkData {
    const link = this.links.find((link) => link.linkId === id);
    return link;
  }

  createLink(body: LinkDto): LinkData {
    const linkId = uuid();
    const newLink = { ...body, linkId };
    this.links.push(newLink);

    return newLink;
  }

  deleteLink(id: string): boolean {
    const linkData = this.getSingleLink(id);

    if (!!linkData) {
      this.links = this.links.filter((link) => link.linkId !== id);
      return true;
    }

    return false;
  }

  deleteLinksByCategory(categoryId: string): void {
    this.links = this.links.filter((link) => link.categoryId !== categoryId);
  }
}
