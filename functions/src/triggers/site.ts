import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { SiteInformation } from '../models/settings.models';
import * as documentService from '../services/document.service';
import { initializeSite } from '../services/site-info.service';

export const registerHost = functions.handler.database.ref.onCreate(async (snap) => {
    const promises = [];

    const host = snap.val();
    console.log(`[registerHost] Discovered request to new host: ${host}`);

    const siteInfoDoc = admin.firestore().collection('tanam').doc(process.env.GCLOUD_PROJECT);
    promises.push(admin.firestore().runTransaction(async (trx) => {
        const trxDoc = await trx.get(siteInfoDoc);
        const trxSettings = trxDoc.data() as SiteInformation;
        trxSettings.domains = trxSettings.domains || [];
        if (trxSettings.domains.indexOf(host) === -1) {
            console.log(`Discovered adding '${host}' to domain configuration`);
            trxSettings.domains.push(host);
            trx.update(siteInfoDoc, trxSettings);
        }
    }));

    return Promise.all(promises);
});

export const testingSetDefaultData = functions.handler.database.ref.onCreate(async (snap) => {
    return Promise.all([
        initializeSite(true),
        snap.ref.remove(),
    ]);
});

export const heartbeat = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
    console.log(`lub-dub`);
    return Promise.all([
        documentService.publishAllScheduledDocuments(),
    ]);
});
