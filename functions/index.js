const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setCustomClaims = functions.https.onRequest(async (req, res) => {
  const { uid, role, displayName } = req.body;
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    await admin.firestore().collection('Users').doc(uid).set({ role, displayName }, { merge: true });
    res.status(200).send({ message: 'Custom claims set successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

exports.storeFCMToken = functions.https.onRequest(async (req, res) => {
  const { uid, token } = req.body;
  try {
    await admin.firestore().collection('Users').doc(uid).set({ fcmToken: token }, { merge: true });
    res.status(200).send({ message: 'Token stored successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

exports.submitReport = functions.https.onRequest(async (req, res) => {
  const { title, description, location, reporterId } = req.body;
  try {
    const reportRef = await admin.firestore().collection('Reports').add({
      title,
      description,
      location,
      reporterId,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    const users = await admin.firestore().collection('Users').where('role', 'in', ['responder', 'admin']).get();
    const tokens = users.docs.map(doc => doc.data().fcmToken).filter(token => token);
    if (tokens.length > 0) {
      await admin.messaging().sendMulticast({
        tokens,
        notification: {
          title: 'New Emergency Report',
          body: `New report: ${title}`
        }
      });
    }
    res.status(200).send({ message: 'Report submitted successfully', reportId: reportRef.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

exports.getReports = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('Reports').orderBy('timestamp', 'desc').limit(10).get();
    const reports = snapshot.docs.map(doc => ({ reportId: doc.id, ...doc.data() }));
    res.status(200).send(reports);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});