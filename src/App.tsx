// #region ##################################################################################### IMPORTS
// ---------------------------------------------------------------------- NORMAL IMPORTS
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { cipher, parseNumber } from "scripts/FunctionsBundle";
import * as _T from "@utils/ClassTypes";
import { initializeApp } from "firebase/app";
import * as FS from "firebase/firestore";
import * as AO from "firebase/auth";
import HomeScreen from "@screens/HomeScreen";
import LandingScreen from "@screens/LandingScreen";
import AdminScreen from "@screens/AdminScreen";
import GoldenTicket from "@screens/GoldenTicket";
import ConfirmationScreen from "@screens/ConfirmationScreen";
import { useEffect } from "react";
import TicketExpiredScreen from "@screens/TicketExpiredScreen";

// ---------------------------------------------------------------------- TYPESCRIPT IMPORTS
type _LoaderFunctionArgs = import("react-router-dom").LoaderFunctionArgs;
type _ActionFunctionArgs = import("react-router-dom").ActionFunctionArgs;
// #endregion

// #region ##################################################################################### FIREBASE INIT
export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
});
const db = FS.getFirestore(firebaseApp); // FIRESTORE (data db)
export const auth = AO.getAuth(firebaseApp); // AUTHETICATION (users db)
const CF_URL = process.env.REACT_APP_FUNCTIONS;

// Override with emulator settings in development
if (process.env.NODE_ENV === "development") {
  AO.connectAuthEmulator(
    auth,
    `http://192.168.0.2:${process.env.REACT_APP_EMULATOR_AUTH}/`
  );
  FS.connectFirestoreEmulator(
    db,
    "192.168.0.2",
    parseNumber(process.env.REACT_APP_EMULATOR_FIRESTORE || "8080")
  );
}
// #endregion

// #region ##################################################################################### FIRESTORE
// ---------------------------------------------------------------------- FS ACTION
/**
 * Función con diversas utilidades para leer y manipular información dentro de `Firestore` (FS) rápidamente.
 * @param action Tipo de acción a realizar:
 *  1. `"read"`: Lee información de un documento en concreto a través de su ID.
 *  2. `"getall"`: Similar a `"read"`, pero con todos los documentos de la colección indicada.
 *  3. `"add"`: Guarda un nuevo registro dentro de la colección indicada con un ID aleatorio.
 *  4. `"insert"`: Reemplaza toda la info de un registro en concreto a través de su ID (si no existe, se crea).
 *  5. `"update"`: Modifica solamente los datos indicados de un registro en concreto a través de su ID (si no existe, marca error).
 *  6. `"delete"`: Elimina un registro a través de su ID (**DISABLED**).
 * @param ticketID ID del documento que queremos modificar.
 * @param data Información con la cual trabajar.
 * @returns `null` siempre que la operación falle. `object` en caso de leer, o el mismo param `data` de otra manera.
 */
export function FSAction(
  action: "read" | "getall" | "add" | "insert" | "update" | "delete",
  ticketID: string,
  data: { [x: string]: any }
) {
  return new Promise<object | null>(async (resolve) => {
    // -------------------------------------------------- INSUFFICIENT DATA
    if (!["read", "update"].includes(action) && !auth.currentUser?.uid) {
      GS.setAlert({
        _type: "error",
        _message: "Es necesario iniciar sesión para realizar esta acción.",
      });
      return resolve(null);
    }

    // -------------------------------------------------- INIT DATA
    /** Colección para rápido acceso. */
    const colref = FS.collection(db, "tickets");
    /** `any` - Información a guardar en la base de datos. */
    const newdata =
      action === "delete" ? {} : (parseToFS(data) as { [x: string]: any });

    // -------------------------------------------------- QUICK ERROR HANDLE
    function handleError(e: any) {
      GS.setAlert({
        _type: "error",
        _message: "Algo salió mal... revise su conexión e inténtelo de nuevo.",
      });
      console.error(e);
      resolve(null);
      return null;
    }

    // -------------------------------------------------- ACTIONS
    // ============================== READ ONCE
    if (action === "read") {
      const docref = FS.doc(colref, ticketID);
      const snap = await FS.getDoc(docref).catch(handleError);
      if (!snap || !snap.exists()) return resolve(null);

      resolve({ ...parseToFS(snap.data()), id: snap.id });
    }

    // ============================== READ ALL
    if (action === "getall") {
      const snap = await FS.getDocs(colref).catch(handleError);
      if (!snap) return resolve(null);

      const resp: any[] = [];
      snap.forEach((it) => resp.push({ ...parseToFS(it.data()), id: it.id }));
      resolve(resp);
    }

    // ============================== ADD
    if (action === "add") {
      const docref = await FS.addDoc(colref, newdata).catch(handleError);
      if (!docref) return resolve(null);

      resolve({ ...newdata, id: docref.id });
    }

    // ============================== INSERT
    if (action === "insert") {
      const docref = FS.doc(colref, ticketID);
      await FS.setDoc(docref, newdata).catch(handleError);
      resolve({ ...newdata, id: docref.id });
    }

    // ============================== UPDATE
    if (action === "update") {
      const docref = FS.doc(colref, ticketID);
      const temp = { ...newdata };
      if (data.files !== undefined) temp.files = data.files;
      await FS.updateDoc(docref, temp).catch(handleError);
      resolve({ ...temp, id: docref.id });
    }

    // ============================== DELETE (enabled)
    if (action === "delete") {
      const docref = FS.doc(colref, ticketID);
      await FS.deleteDoc(docref).catch(handleError);
      resolve({ ...newdata, id: docref.id });
    }

    resolve(null); // QUIT
  });
}

// ---------------------------------------------------------------------- PARSE TO FS
/**
 * Remueve las propiedades de `_specifics`(legacy), `update` y `id`,
 * y convierte todos los `Date` en `Timestamp` de Firebase de momento.
 * Otras propiedades que sean funciones o `undefined` simplemente las omite.
 *
 * @param obj Objeto a transformar.
 * @returns Un nuevo objeto para ingresar directamente a FS (puede contener mutaciones).
 */
export function parseToFS(obj: any) {
  if (obj instanceof Date) return FS.Timestamp.fromDate(obj);
  if (obj instanceof FS.Timestamp) return obj.toDate();
  if (!obj || typeof obj !== "object") return null;
  let newobj: any;

  // -------------------------------------------------- IS PRIMITIVE
  /**
   * Los tipos de datos primitivos son `number`, `string` y `boolean`.
   * @param el Variable a revisar.
   * @returns `boolean` - Revisa si el `el` es uno de los tipos de datos anteriores.
   */
  function isPrimitive(el: any) {
    return (
      typeof el === "boolean" ||
      typeof el === "number" ||
      typeof el === "string"
    );
  }

  // -------------------------------------------------- ELEMENT IS ARRAY
  if (Array.isArray(obj)) {
    newobj = [];

    for (const item of obj) {
      if (isPrimitive(item)) newobj.push(item);
      else if (typeof item === "function" || item === undefined) continue;
      else newobj.push(parseToFS(item));
    }
  } else {
    // -------------------------------------------------- ELEMENT IS OBJECT
    const { update, _specifics, id, people, studies, ...rest } = obj;
    newobj = {};

    for (const key in rest) {
      const item = rest[key];
      if (isPrimitive(item)) newobj[key] = item;
      else if (typeof item === "function" || item === undefined) continue;
      else newobj[key] = parseToFS(item);
    }
  }

  return newobj;
}
// #endregion

// #region ##################################################################################### AUTHENTICATION
// ---------------------------------------------------------------------- LOG IN USER
/**
 * Inicia una sesión de usuario para trabajar con `Firestore` (FS).
 *
 * Utiliza el método `signInWithEmailAndPassword` de Firebase Auth.
 * @param email Email para iniciar sesión.
 * @param pass Contraseña para inicar sesión con *Firebase* (**NO ES LA CONTRASEÑA DEL EMAIL**).
 */
export async function LogIn(email: string, pass: string) {
  // -------------------------------------------------- INITIAL VALUES
  // En caso de que queramos buscar alguna sesión guardada...
  await LogOut(true); // primero limpiamos todo por si acaso...

  // -------------------------------------------------- SIGNIN
  /** Function shortcut. */
  const er = (e: any) => {
    GS.setAlert({
      _type: "error",
      _message: "Correo o contraseña incorrecta.",
    });
    return null;
  };
  return await AO.signInWithEmailAndPassword(auth, email, pass).catch(er);
}

// ---------------------------------------------------------------------- LOG OUT USER
/**
 * Eliminar toda información almacenada en `GS` {@link GS}.
 * @param resetOnly Indica si se reinicia la `app` también, o solo los parámetros de `GS`.
 */
export async function LogOut(resetOnly = false) {
  await auth.signOut();
  GS.cache = {};
  GS.isAdmin = false;
  if (!resetOnly) GS.refresh();
}

// ---------------------------------------------------------------------- IS ADMIN
/** Indica si el usuario registrado en la sesión actual es admin o no. */
export async function isAdmin(user = auth.currentUser) {
  if (!user) return false;

  const token = await user.getIdTokenResult(true).catch((err) => {
    console.error(err);
    return null;
  });

  console.log(token);
  return token && token.claims["role"] === "admin";
}
// #endregion

// #region ##################################################################################### GLOBAL STATE
/**
 * Objeto principal de estado global. Almacena toda la información de la base de datos relevante.
 */
export const GS = new _T.Global();
// #endregion

// #region ##################################################################################### CLOUD FUNCTIONS
/** Verifica la última fecha de acceso de un ticket, y ejecuta la Cloud Function "lastSeen". */
// ---------------------------------------------------------------------- CHECK LAST SEEN
async function checkLastSeen(ticketid: string) {
  console.log("### ### CheckLastSeen start...");

  const timethen = parseNumber(localStorage.getItem(ticketid + "-dat") || 0);
  const timenow = Date.now();

  const hoursnow = Math.floor(timenow / 1000 / 3600);
  const hoursthen = Math.floor(timethen / 1000 / 3600);

  // Refresh only after +12hrs from previous "lastSeen".
  if (hoursnow - hoursthen < 12) return;

  console.log("### ### ### CLOUD FUNCTION fetch...");
  const res = await fetch(CF_URL + "updateLastSeen", {
    method: "post",
    body: JSON.stringify({
      apikey: "custompass",
      ticketid,
    }),
  }).catch((err) => {
    console.error(err);
    return null;
  });
  console.log("### ### ### ...done func");

  if (res?.ok) {
    try {
      localStorage.setItem(ticketid + "-dat", Date.now() + "");
    } catch (e) {
      console.error(e);
    }
  }
}

/** Actualiza la información de un ticket con respecto a sus miembros. */
async function updateTicketInfo(ticketid: string, members: _T.Member[]) {
  console.log("### ### updateTicketInfo start...");

  const res = await fetch(CF_URL + "updateTicketInfo", {
    method: "post",
    body: JSON.stringify({
      apikey: "custompass",
      ticketid,
      members,
    }),
  }).catch((err) => {
    console.error(err);
    return null;
  });

  console.log("### ### ...done updateTicketInfo");

  if (!res?.ok) {
    GS.setAlert({
      _type: "error",
      _message: "Ocurrió un error al mandar la información...",
    });
  }

  return res?.ok ?? false;
}
// #endregion

// #region ##################################################################################### FUNCIONES LOADERS
/** Verifica si el usuario actual tiene iniciada la sesión, de lo contrario regresa a login. */
// ---------------------------------------------------------------------- CHECK USER
async function checkUser(req: _LoaderFunctionArgs) {
  if (GS.firstTime) return false;
  console.log("### CHECK USER...", GS.isAdmin);

  // ============================== CHECK USER
  if (!auth.currentUser) {
    GS.setAlert({
      _message: "Inicie sesión para continuar",
      _type: "warning",
    });
    return (GS.isAdmin = false);
  }

  return GS.isAdmin;
}

// ---------------------------------------------------------------------- LOAD ADMIN DATA
/** Obtiene todos los tickets existentes. */
async function loadAdmin(req: _LoaderFunctionArgs) {
  // ============================== PREV CHECK
  if (!(await checkUser(req))) return null;

  // ============================== GET ALL USERS
  console.log("### ### LOAD ADMIN...");
  const data = await FSAction("getall", "", { id: "" });
  console.log("### ### ...done");

  // NO DATA
  if (!data) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "No se han encontrado tickets.",
    });
  }

  // ============================== DATA
  GS.isAdmin = true;
  return data;
}

/** Verifica si el usuario actual tiene iniciada la sesión, de lo contrario regresa a login. */
// ---------------------------------------------------------------------- CHECK USER
async function callLogout(req: _LoaderFunctionArgs) {
  await LogOut();
  return redirect("/");
}

// ---------------------------------------------------------------------- CHECK TICKET
/** Revisa un ticket específico y marca `lastSeen` en caso de que exista. */
async function checkTicket(req: _LoaderFunctionArgs) {
  if (GS.firstTime) return false;

  if (!GS.firstTime) {
    return redirect("/expired");
  }

  // ============================== GET PARAMS
  const { ticketid } = req.params;
  const askey = cipher(ticketid || "", true);
  const asval = cipher(ticketid || "");

  // ============================== CHECK CACHE
  console.log("### CHECK TICKET (cache)...");
  if (ticketid) {
    if (localStorage.getItem(askey) === asval) {
      // Somehow the ticketid got into localstorage,
      // which means that the user already had it
      console.log("### ...(cache) done");
      await checkLastSeen(ticketid);
      console.log("### ### ...done CheckLastSeen");
      return true;
    }
    localStorage.removeItem(askey);
  }
  console.log("### (cache) fail");

  // ============================== GET TICKET
  const data = await loadTicket(req);
  if (!data || !ticketid) return false;

  // ============================== SAVE CACHE
  // At this point, the user will get access and we can
  // facilitate the next request for the same ticketid
  try {
    localStorage.setItem(askey, asval);
    await checkLastSeen(ticketid);
  } catch (e) {
    console.error(e);
  }

  // RETURN DATA
  return true;
}

// ---------------------------------------------------------------------- LOAD TICKET
/** Obtiene información sobre un ticket específico. */
async function loadTicket(req: _LoaderFunctionArgs) {
  if (GS.firstTime) return null;

  if (!GS.firstTime) {
    return redirect("/expired");
  }

  // ============================== GET PARAMS
  const { ticketid } = req.params;

  // ============================== GET FIRESTORE
  console.log("### LOAD TICKET TO FIRESTORE...");
  const data = ticketid ? await FSAction("read", ticketid, { id: "" }) : null;
  console.log("### ...done FSAction");

  // NO DATA
  if (!data) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "No se encontró el ticket ingresado.",
    });
  }

  // RETURN DATA
  return data;
}
// #endregion

// #region ##################################################################################### FUNCIONES ACTIONS
// ---------------------------------------------------------------------- ACTION ADMIN CRUD
/** Se encarga del CRUD de admin para administrar los Tickets y familias. */
async function actionAdmin(req: _ActionFunctionArgs) {
  // ============================== PREV CHECK
  if (!(await checkUser(req))) return null;

  // ============================== RETRIEVE CACHE
  const data = GS.cache?.ticket as _T.Ticket;
  const action = GS.cache?.action as "delete" | "edit" | "add";
  const fun = GS.cache?.closeModal || (() => {});
  GS.cache = {};

  if (!data) {
    GS.setAlert({
      _message: "Falta información importante!",
      _type: "error",
    });
    return null;
  }

  console.log("### ACTION ADMIN start... ");

  // ============================== CHECK DATA
  data.members.forEach((memb) => {
    if (memb.accepted !== !!memb.acceptedDate) {
      memb.acceptedDate = memb.accepted ? new Date() : null;
    }
  });

  // ============================== FS ACTION
  let success: object | null = null;
  if (action === "delete") {
    success = await FSAction("delete", data.id || "error", {});
  } else if (action === "edit") {
    success = await FSAction("update", data.id || "error", data);
  } else {
    success = await FSAction("add", "n/a", data);
  }

  console.log("### ...done ACTION ADMIN");

  if (success) {
    GS.setAlert({
      _message: "Se han guardado los cambios!",
      _type: "success",
    });
  }

  // ============================== RETURN
  fun?.(); // CLOSE MODAL ACTIVATOR
  return null;
}

// ---------------------------------------------------------------------- ACTION TICKET CRUD
/** Se encarga de enviar los checks para confirmar un ticket. */
async function actionTicket(req: _ActionFunctionArgs) {
  console.log("tst", GS.cache);

  // ============================== RETRIEVE CACHE
  const ticketid = GS.cache?.ticketid as string;
  const members = GS.cache?.members as _T.Member[];
  GS.cache = {};

  if (!ticketid || !members || !members.length) {
    GS.setAlert({
      _message: "Falta información importante!",
      _type: "error",
    });
    return null;
  }

  // CHECKS ALREADY HANDLED BY CLOUD FUNCTION
  console.log("### ACTION TICKET start... ");
  const success = await updateTicketInfo(ticketid, members);
  console.log("### ...done ACTION TICKET", success);

  if (success) {
    GS.setAlert({
      _message: "Gracias por confirmar!",
      _type: "success",
    });

    if (members.every((m) => m.accepted))
      return redirect("/tickets/" + ticketid);
  }

  // ============================== RETURN
  return null;
}
// #endregion

// #region ##################################################################################### MAIN APPLICATION
function App() {
  // ---------------------------------------------------------------------- WATCH FOR AUTH CHANGES
  useEffect(() => {
    console.log("RENDER WHOLE APP");

    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (GS.firstTime) console.log("########################## FIRST TIME");

      console.log(" === AUTH CHANGE === ", u);
      GS.isAdmin = !!(await isAdmin(u));
      console.log(" === IS ADMIN === ", GS.isAdmin);

      GS.refresh();
    });
    return () => unsubscribe();
  }, []);

  // ---------------------------------------------------------------------- RETURN
  return (
    <RouterProvider
      router={createBrowserRouter([
        // -------------------------------------------------- APPLICATION ROOT
        {
          path: "/",
          errorElement: <HomeScreen isNotFound />,
          element: <HomeScreen />,
          children: [
            // -------------------------------------------------- SEARCH TICKET CONTROLS
            {
              index: true,
              element: <LandingScreen />,
            },
            // -------------------------------------------------- LOGOUT SHORTCUT
            {
              path: "logout",
              loader: callLogout,
              element: <>...</>,
            },
            // -------------------------------------------------- ADMIN PAGE
            {
              path: "admin",
              loader: loadAdmin,
              action: actionAdmin,
              element: <AdminScreen />,
            },
            // -------------------------------------------------- TICKETS PAGE
            {
              path: "tickets/:ticketid",
              loader: checkTicket,
              action: undefined,
              element: <GoldenTicket />,
            },
            // -------------------------------------------------- CONFIRMATION PAGE
            {
              path: "tickets/:ticketid/confirm",
              loader: loadTicket,
              action: actionTicket,
              element: <ConfirmationScreen />,
            },
            // -------------------------------------------------- EXPIRED PAGE
            {
              path: "expired",
              loader: undefined,
              action: undefined,
              element: <TicketExpiredScreen />,
            },
          ],
        },
        // -------------------------------------------------- NOT FOUND SCREEN
        {
          path: "*",
          element: <HomeScreen isNotFound />,
        },
      ])}
    />
  );
}
// #endregion

// #region ##################################################################################### EXPORTS
export default App;
// #endregion
