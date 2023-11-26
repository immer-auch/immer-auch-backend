import { Injectable } from '@nestjs/common';

const USER_URL: string =
  'https://www.kleinanzeigen.de/s-bestandsliste.html?userId=';

type KleinanzeigenUserInformation = {
  userId: number;
  timeActiveSince: Date;
  profile: {
    name: string | null;
    type: string | null;
  };
  products: { online: number | null; total: number | null };
};

@Injectable()
export class KleinanzeigenService {
  public async getUserInformationByProductUrl(
    url: string,
  ): Promise<KleinanzeigenUserInformation> {
    const userId = await this.getUserId(url);
    return await this.getUserInformation(userId);
  }

  public async getUserId(url: string): Promise<number> {
    const response = await fetch(url);
    const data = await response.text();
    const userId = this.extractUserId(data);
    if (userId === undefined || userId === null) {
      throw new Error('No UserId found');
    }
    return userId;
  }

  public async getUserInformation(
    userId: number,
  ): Promise<KleinanzeigenUserInformation> {
    const url = `${USER_URL}${userId}`;
    const response = await fetch(url);
    const html = await response.text();

    const timeActiveSince = this.extractUserActiveSince(html);
    const profileName = this.extractUserProfileName(html);
    const profileType = this.extractUserProfileType(html);
    const productCount = this.extractUserProductCount(html);

    return {
      userId: userId,
      timeActiveSince: timeActiveSince,
      profile: {
        name: profileName,
        type: profileType,
      },
      products: {
        ...productCount,
      },
    };
  }

  private extractUserId(input: string): number | null {
    const regex = /userId=(\d+)/;
    const match = input.match(regex);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return null;
  }

  private extractUserActiveSince(input: string): Date {
    const regex = /Aktiv seit (\d{2}\.\d{2}\.\d{4})/;
    const match = input.match(regex);
    if (match && match[1]) {
      const dateString = match[1];
      const [day, month, year] = dateString.split('.').map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  }

  private extractUserProfileName(html: string): string | null {
    const regex = /<h2\s+class="[^"]*userprofile--name[^"]*">([^<]*)<\/h2>/i;
    const match = html.match(regex);
    return match ? match[1] : null;
  }

  private extractUserProductCount(html: string): {
    online: number | null;
    total: number | null;
  } {
    const regex = /(\d+)\s+Anzeigen\s+online\s*\/\s*(\d+)\s+gesamt/;
    const match = html.match(regex);
    if (match && match.length === 3) {
      const online = parseInt(match[1], 10);
      const total = parseInt(match[2], 10);
      return { online, total };
    }
    return { online: null, total: null };
  }

  private extractUserProfileType(html: string): string | null {
    const regex = /<span\s+class="userprofile-details">([^<]*)<\/span>/i;
    const match = html.match(regex);
    return match ? match[1].trim() : null;
  }

  private istPotenziellerBetrueger(nutzerInformationen) {
    // Überprüfen der relevanten Informationen
    const nutzungsDauer = new Date(nutzerInformationen.timeActiveSince);
    const gesamtProdukte = nutzerInformationen.products.total;
    const onlineProdukte = nutzerInformationen.products.online;
    const nutzerTyp = nutzerInformationen.profile.type;

    // Aktuelles Datum
    const jetzt = new Date();

    // Beispielbedingungen (können je nach Kontext angepasst werden)
    const aktiveSeitMindestensSechsMonaten =
      nutzungsDauer <= jetzt &&
      nutzungsDauer >=
        new Date(jetzt.getFullYear(), jetzt.getMonth() - 6, jetzt.getDate());
    const vieleProdukte = gesamtProdukte > 50; // Beispiel: Mehr als 50 Produkte insgesamt
    const hoherOnlineAnteil = onlineProdukte / gesamtProdukte > 0.5; // Beispiel: Mehr als die Hälfte der Produkte sind online
    const privaterNutzer = nutzerTyp === 'Privater Nutzer'; // Beispiel: Nutzer ist als "Privater Nutzer" kategorisiert

    // Gesamtbewertung (Beispiel: Mindestens zwei Bedingungen müssen erfüllt sein)
    const betrugsVerdacht =
      (aktiveSeitMindestensSechsMonaten && vieleProdukte) ||
      (hoherOnlineAnteil && privaterNutzer);

    return betrugsVerdacht;
  }
}
