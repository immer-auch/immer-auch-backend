import { Injectable } from '@nestjs/common';
import {
  getKleinanzeigenUser,
  KleinanzeigenUser,
} from './kleinanzeigen.parser';

@Injectable()
export class KleinanzeigenService {
  public getUserInformationByProductUrl(
    productUrl: string,
  ): Promise<KleinanzeigenUser> {
    return getKleinanzeigenUser(productUrl);
  }

  public async isSuspiciousKleinanzeigenUser(productUrl: string) {
    const user = await this.getUserInformationByProductUrl(productUrl);
    // Überprüfen der relevanten Informationen
    const nutzungsDauer = new Date(user.timeActiveSince);
    const gesamtProdukte = user.products.total;
    const onlineProdukte = user.products.online;
    const nutzerTyp = user.profile.type;

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
    return (
      (aktiveSeitMindestensSechsMonaten && vieleProdukte) ||
      (hoherOnlineAnteil && privaterNutzer)
    );
  }
}
