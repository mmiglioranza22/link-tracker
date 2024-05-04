import { Exclude, Expose } from 'class-transformer';
import { CreateLinkDTO } from 'src/dto/create-link.dto';
import { LinkResponseDTO } from 'src/dto/link-response.dto';
import { checkExpireDate, shortLinkGenerator } from 'src/utils';

@Exclude()
export class Link {
  private _target: string;
  private _link: string;
  private _valid: boolean;
  private _id: string;
  private _expires?: Date;
  private _redirected: number;
  private _password?: string;

  constructor(payload: CreateLinkDTO) {
    const linkId = shortLinkGenerator();
    this._id = linkId;
    this._target = payload.target;
    this._link = 'http://localhost:8080/l/' + linkId;
    this._valid = true;
    this._redirected = 0;
    this._password = payload.password;
    this._expires = payload.expires;
  }
  @Expose()
  public get link() {
    return this._link;
  }
  @Expose()
  public get target() {
    return this._target;
  }
  @Expose()
  public get valid() {
    return this._valid;
  }
  public get expires() {
    return this._expires;
  }
  public get redirected() {
    return this._redirected;
  }
  public get id() {
    return this._id;
  }
  public get password() {
    return this._password;
  }

  public toggleValid() {
    this._valid = !this._valid;
  }

  public increaseRedirected() {
    if (
      (this.expires && checkExpireDate(this.expires) && this.valid) ||
      this.valid
    ) {
      this._redirected = this._redirected + 1;
    }
  }

  // Class transform replaces this
  public toResponseObject(): LinkResponseDTO {
    return {
      target: this._target,
      link: this._link,
      valid: this.valid,
    };
  }
}
