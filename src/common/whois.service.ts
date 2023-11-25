import { Injectable } from '@nestjs/common';
import * as whois from 'whoiser';
import { transformCamelCaseKeys } from '../composables/key-replacement.composable';

@Injectable()
export class WhoIsService {
  public async getWhoIsInformation(
    domain: string,
  ): Promise<Record<string, any>> {
    const whoisSearchResult = await whois.domain(domain);
    return transformCamelCaseKeys(whoisSearchResult);
  }
}
