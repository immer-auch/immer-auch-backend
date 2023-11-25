import * as tls from 'tls';
import { transformCamelCaseKeys } from '../composables/key-replacement.composable';

export class CertificateService {
  public async getCertificate(
    domain: string,
  ): Promise<tls.PeerCertificate | undefined> {
    const options: tls.ConnectionOptions = {
      host: domain,
      port: 443,
    };
    return new Promise((resolve, reject) => {
      const socket = tls.connect(options, () => {
        const certificate = socket.getPeerCertificate();
        if (!certificate || Object.keys(certificate).length === 0) {
          resolve(undefined);
        } else {
          resolve(transformCamelCaseKeys(certificate));
        }
        socket.end();
      });
      socket.on('error', (error) => reject(error));
    });
  }
}
