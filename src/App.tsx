// #region ##################################################################################### IMPORTS
// ---------------------------------------------------------------------- NORMAL IMPORTS
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { useRefresh } from "scripts/FunctionsBundle";
import * as _T from "@utils/ClassTypes";
import { initializeApp } from "firebase/app";
import * as FS from "firebase/firestore";
import * as AO from "firebase/auth";
import LoginScreen from "@screens/LoginScreen";
import { useEffect } from "react";
import HomeScreen from "@screens/HomeScreen";
import LandingScreen from "@screens/LandingScreen";
import TicketScreen from "@screens/TicketScreen";
import AdminScreen from "@screens/AdminScreen";

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

const adminids = ["k8CneZeguQMyVzX2GuQ97M5Q9NO2"];
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
  if (!resetOnly) GS.refresh();
}

// ---------------------------------------------------------------------- IS ADMIN
/** Indica si el usuario registrado en la sesión actual es admin o no. */
export function isAdmin(uid?: string) {
  return adminids.includes(uid || auth.currentUser?.uid || "");
}
// #endregion

// #region ##################################################################################### GLOBAL STATE
/**
 * Objeto principal de estado global. Almacena toda la información de la base de datos relevante.
 */
export const GS = new _T.Global();
// #endregion

// #region ##################################################################################### FUNCIONES LOADERS
/** Verifica si el usuario actual tiene iniciada la sesión, de lo contrario regresa a login. */
// ---------------------------------------------------------------------- CHECK USER
async function checkUser(req: _LoaderFunctionArgs) {
  if (!auth.currentUser) {
    GS.setAlert({
      _message: "Inicie sesión para continuar",
      _type: "warning",
    });
    return redirect("/login");
  }
  return null;
}

// ---------------------------------------------------------------------- LOAD ADMIN DATA
/** Obtiene todos los tickets existentes. */
async function loadAdmin(req: _LoaderFunctionArgs) {
  // ============================== PREV CHECK
  const prev = await checkUser(req);
  if (prev) return prev;

  // ============================== GET ALL USERS
  if (isAdmin()) {
    const data = await FSAction("getall", "", { id: "" });

    // NO DATA
    if (!data) {
      throw new Response("Not Found", {
        status: 404,
        statusText: "No se han encontrado tickets.",
      });
    }

    // RETURN DATA
    return data;
  }

  // ============================== DEFAULT RETURN
  return null;
}

// ---------------------------------------------------------------------- LOAD TICKET
/** Obtiene información sobre un ticket específico. */
async function loadTicket(req: _LoaderFunctionArgs) {
  // ============================== PREV CHECK
  // no needed

  /** ============================== GET PARAMS */
  const { ticketid } = req.params;

  // ============================== GET ALL USERS
  const data = ticketid ? await FSAction("read", ticketid, { id: "" }) : null;

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
  const prev = await checkUser(req);
  if (prev) return prev;

  // ============================== RETRIEVE CACHE
  const data = GS.cache?.ticket as _T.Ticket;
  const action = GS.cache?.action as "delete" | "edit" | "add";

  if (!data) {
    GS.setAlert({
      _message: "Falta información importante!",
      _type: "error",
    });
    return null;
  }

  // ============================== CHECK DATA
  data.members.forEach((memb) => {
    if (memb.accepted !== !!memb.acceptedDate) {
      memb.acceptedDate = memb.accepted ? new Date() : null;
    }
  });

  // ============================== FS ACTION
  let success: object | null = null;
  if (action === "delete")
    success = await FSAction("delete", data.id || "error", {});
  else if (action === "edit")
    success = await FSAction("update", data.id || "error", data);
  else success = await FSAction("add", "n/a", data);

  if (success) {
    GS.setAlert({
      _message: "Se han guardado los cambios!",
      _type: "success",
    });
  }

  // ============================== RETURN
  GS.cache?.closeModal?.(); // CLOSE MODAL ACTIVATOR
  GS.cache = {};
  return null;
}

// ---------------------------------------------------------------------- ACTION TICKET CRUD
/** Se encarga de enviar los checks para confirmar un ticket. */
async function actionTicket(req: _ActionFunctionArgs) {
  // ============================== PREV CHECK
  // no needed

  // ============================== RETRIEVE CACHE
  const data = GS.cache?.ticket as _T.Ticket;

  if (!data) {
    GS.setAlert({
      _message: "Falta información importante!",
      _type: "error",
    });
    return null;
  }

  // ============================== CHECK DATA
  data.members.forEach((memb) => {
    if (memb.accepted !== !!memb.acceptedDate) {
      memb.acceptedDate = memb.accepted ? new Date() : null;
    }
  });

  // ============================== FS ACTION
  const success = await FSAction("update", data.id || "error", {
    members: data.members,
  });

  if (success) {
    GS.setAlert({
      _message: "Gracias por confirmar!",
      _type: "success",
    });
  }

  // ============================== RETURN
  GS.cache = {};
  return null;
}
// #endregion

// #region ##################################################################################### MAIN APPLICATION
function App() {
  // ---------------------------------------------------------------------- GLOBAL STATE
  const [refresh] = useRefresh();
  GS.refresh = refresh;

  // ---------------------------------------------------------------------- FIRST TIME
  useEffect(() => {
    const a = (GS.cache = setTimeout(() => {
      GS.firstTime = false;
      GS.refresh();
    }, 1000));

    return () => {
      GS.firstTime = false;
      clearTimeout(a);
    };
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
            // -------------------------------------------------- ADMIN LOGIN
            {
              path: "login",
              element: <LoginScreen />,
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
              loader: loadTicket,
              action: actionTicket,
              element: <TicketScreen />,
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
