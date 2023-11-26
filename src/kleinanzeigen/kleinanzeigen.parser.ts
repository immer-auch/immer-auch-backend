import { HttpException, HttpStatus } from '@nestjs/common';
import puppeteer from 'puppeteer';

export type KleinanzeigenUserProducts = {
  online: number | null;
  total: number | null;
};

export type KleinanzeigenUser = {
  userId: number | string;
  timeActiveSince: Date;
  profile: {
    pro: boolean;
    name: string | null;
    type: string | null;
  };
  products: KleinanzeigenUserProducts | null;
};

async function getProductHtml(productUrl: string): Promise<string> {
  const productResponse = await fetch(productUrl);
  return await productResponse.text();
}

export async function getKleinanzeigenUser(
  productUrl: string,
): Promise<KleinanzeigenUser | null> {
  const normalUser = await readUser(productUrl);
  if (normalUser === undefined || normalUser === null) {
    const proUser = await readProUser(productUrl);
    if (proUser === undefined || proUser === null) {
      throw new HttpException(
        'KleinanzeigenUser not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return proUser;
  }
  return normalUser;
}

export async function readUser(
  productUrl: string,
): Promise<KleinanzeigenUser | null> {
  console.log('ProductUrl: ', productUrl);
  function getUserId(html: string): number | null {
    const regex = /userId=(\d+)/;
    const match = html.match(regex);
    return match && match[1] ? parseInt(match[1], 10) : null;
  }

  function getTimeActiveSince(html: string): Date {
    const regex = /Aktiv seit (\d{2}\.\d{2}\.\d{4})/;
    const match = html.match(regex);
    if (match && match[1]) {
      const dateString = match[1];
      const [day, month, year] = dateString.split('.').map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  }

  function getProfileName(html: string): string | null {
    const regex = /<h2\s+class="[^"]*userprofile--name[^"]*">([^<]*)<\/h2>/i;
    const match = html.match(regex);
    return match ? match[1] : null;
  }

  function getProducts(html: string): KleinanzeigenUserProducts | null {
    const regex = /(\d+)\s+Anzeigen\s+online\s*\/\s*(\d+)\s+gesamt/;
    const match = html.match(regex);
    if (match && match.length === 3) {
      const online = parseInt(match[1], 10);
      const total = parseInt(match[2], 10);
      return { online, total };
    }
    return null;
  }

  function getProfileType(html: string): string | null {
    const regex = /<span\s+class="userprofile-details">([^<]*)<\/span>/i;
    const match = html.match(regex);
    return match ? match[1].trim() : null;
  }

  const productHtml = await getProductHtml(productUrl);
  const userId = getUserId(productHtml);
  if (userId === undefined || userId === null) {
    return null;
  }
  const userUrl = `https://www.kleinanzeigen.de/s-bestandsliste.html?userId=${userId}`;

  const userReponse = await fetch(userUrl);
  const userHtml = await userReponse.text();

  return {
    userId: userId,
    timeActiveSince: getTimeActiveSince(userHtml),
    profile: {
      pro: false,
      name: getProfileName(userHtml),
      type: getProfileType(userHtml),
    },
    products: getProducts(userHtml),
  };
}

export async function readProUser(
  productUrl: string,
): Promise<KleinanzeigenUser | null> {
  function getUsername(html: string): string | null {
    const regex = /href="\/pro\/([^"]+)"/;
    const match = html.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  function getTimeActiveSince(inputString: string): Date | null {
    const regex = /Aktiv Seit (\d{2}\.\d{2}\.\d{4})/gi;
    const match = regex.exec(inputString);
    if (match && match[1]) {
      const dateParts = match[1].split('.');
      return new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
    }
    return null;
  }

  async function getUserHtml(username: string): Promise<string | null> {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--log-level=3',
        '--ignore-certificate-errors',
        '--ignore-urlfetcher-cert-requests',
        '--disable-popup-blocking',
      ],
      defaultViewport: null,
    });

    try {
      const page = await browser.newPage();
      await page.goto(`https://www.kleinanzeigen.de/pro/${username}`, {
        waitUntil: 'domcontentloaded',
      });
      return await page.content();
    } catch (e) {
      console.log(e);
    } finally {
      await browser.close();
    }
  }

  const productHtml = await getProductHtml(productUrl);
  const username = getUsername(productHtml);
  if (username === undefined || username === null) {
    return null;
  }
  const userHtml = await getUserHtml(username);
  const timeActiveSince = getTimeActiveSince(userHtml);

  return {
    userId: username,
    timeActiveSince: timeActiveSince,
    profile: {
      pro: true,
      name: username,
      type: null,
    },
    products: null,
  };
}
