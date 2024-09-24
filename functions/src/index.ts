/* eslint-disable max-len */
/* eslint-disable operator-linebreak */

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";

import { Ticket } from "./classtypes";

// INIT VARIABLES
initializeApp();
const FS = getFirestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((req, res) => {
  res.send("Hello from Firebase not updated!");
});

// ---------------------------------------------------------------------- UPDATE TICKET INFO
/** Se encarga de enviar los checks para confirmar un ticket. */
export const updateTicketInfo = onRequest(async (req, res) => {
  // ============================== READ BODY
  const { apikey, ticketid, members } = JSON.parse(req.body) as {
    apikey: string;
    ticketid: string;
    members: Ticket["members"];
  };

  // ============================== VALIDATION
  if (!apikey || !ticketid || !members) {
    res.status(400).send("Missing info");
    return;
  } else if (apikey !== "custompass") {
    res.status(403).send("Forbidden");
    return;
  }

  // ============================== PARSE DATA
  const newMembers = members.map<{
    name: string;
    accepted: boolean;
    acceptedDate: Timestamp | null;
  }>((memb) => {
    if (memb.accepted !== !!memb.acceptedDate) {
      memb.acceptedDate = memb.accepted ? new Date() : null;
    }

    return {
      name: memb.name || "Undefined",
      accepted: memb.accepted ?? false,
      acceptedDate: memb.acceptedDate
        ? Timestamp.fromDate(memb.acceptedDate)
        : null,
    };
  });

  // ============================== UPDATE FIRESTORE
  const docref = FS.doc("/tickets/" + ticketid);
  const error = await FS.runTransaction(async (transaction) => {
    try {
      transaction.update(docref, {
        lastSeen: FieldValue.serverTimestamp(),
        members: newMembers,
      });
    } catch (error) {
      console.error("Error in transaction:", error);
      return error;
    }
    return null;
  });

  // ============================== CHECK ERROR
  if (error) {
    res.status(500).send(error);
    return;
  }

  // GOOD
  res.status(200).send("Confirmación enviada.");
});

// ---------------------------------------------------------------------- UPDATE LAST SEEN
/** Se encarga de actualizar el campo `lastSeen` de un ticket específico. */
export const updateLastSeen = onRequest(async (req, res) => {
  // ============================== READ BODY
  const { apikey, ticketid } = JSON.parse(req.body) as {
    apikey: string;
    ticketid: string;
  };

  // ============================== VALIDATION
  if (!apikey || !ticketid) {
    res.status(400).send("Missing info");
    return;
  } else if (apikey !== "custompass") {
    res.status(403).send("Forbidden");
    return;
  }

  // ============================== PARSE DATA
  // Not required

  // ============================== UPDATE FIRESTORE
  const docref = FS.doc("/tickets/" + ticketid);
  const error = await FS.runTransaction(async (transaction) => {
    try {
      console.log("before trans");
      transaction.update(docref, { lastSeen: FieldValue.serverTimestamp() });
      console.log("tras success");
    } catch (error) {
      console.error("Error in transaction:", error);
      return error;
    }
    return null;
  });

  // ============================== CHECK ERROR
  if (error) {
    res.status(500).send(error);
    return;
  }

  // GOOD
  res.status(200).send("Success");
});
