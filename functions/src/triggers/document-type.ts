import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { DocumentType } from '../models';

export const cleanUpDocumentsOfType = functions.handler.firestore.document.onDelete(async (snap, context) => {
  console.log('Deleting documents..')
  const documentType = snap.data() as DocumentType;
  const querySnaps = await admin.firestore()
    .collection('tanam').doc(context.params.siteId)
    .collection('documents').where('documentType', '==', documentType.id)
    .get();

  const promises = [];
  for (const doc of querySnaps.docs) {
    promises.push(doc.ref.delete());
  }

  return Promise.all(promises);
});

export const updateDocumentsStandaloneValue = functions.handler.firestore.document.onUpdate(async (snap, context) => {
  const documentTypeBefore = snap.before.data() as DocumentType;
  const documentTypeAfter = snap.after.data() as DocumentType;
  if (documentTypeAfter.standalone === documentTypeBefore.standalone) {
    console.log('[Update document standalone value] Nothing to update')
    return null;
  }
  console.log(`Updating standalone documents ${documentTypeAfter.id}..`)
  const querySnaps = await admin.firestore()
    .collection('tanam').doc(context.params.siteId)
    .collection('documents').where('documentType', '==', documentTypeAfter.id)
    .get();

  const promises = [];
  for (const doc of querySnaps.docs) {
    promises.push(doc.ref.update({
      standalone: documentTypeAfter.standalone
    }));
  }

  return Promise.all(promises);
});
