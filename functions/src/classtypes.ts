/* eslint-disable linebreak-style */
/* eslint-disable max-len */

// #region ##################################################################################### ESSENTIALS
// ---------------------------------------------------------------------- ONLY KEYS
/**
 * Selecciona todas las propiedades de un objeto, sin importar el tipo de dato.
 */
export type OnlyKeys<T> = { [P in keyof T]?: unknown };

// ---------------------------------------------------------------------- AUTO KEYS
/**
 * Selecciona todas las propiedades y permite agregar nuevas.
 */
export type AutoKeys<T> = OnlyKeys<T> & { [key: string]: unknown };
// #endregion

// #region ##################################################################################### DATABASE MODELS
// ---------------------------------------------------------------------- TICKET
/**
 * Representa un ticket de la base de datos. Contiene el nombre de la familia y todos sus miembros.
 * 1. {@link family} - `string`.
 * 1. {@link members} - `Member[]`.
 * 1. {@link lastSeen} - `Date | null`.
 */
export class Ticket {
  /** `string` - Representa los apellidos de la familia. */
  family = "";
  /** `Member[]` - Representa la lista de miembros invitados. */
  members: Member[] = [];
  /** `Date | null` - Representa la última vez que se accedió al ticket. */
  lastSeen: Date | null = null;
}

// ---------------------------------------------------------------------- MEMBER
/**
 * Representa a un miembro invitado de una familia.
 *
 * Los invitados son las personas específicas a las que va dirigida la invitación.
 *
 * 1. {@link name} - `string`.
 * 1. {@link accepted} - `boolean`.
 * 1. {@link acceptedDate} - `Date | null`.
 */
export class Member {
  /** `string` - Nombre de la persona invitada. */
  name = "";
  /** `boolean` - Representa si la persona aceptó la invitación o no. */
  accepted = false;
  /** `Date | null` - Fecha de aceptación de la invitación. */
  acceptedDate: Date | null = null;
}
// #endregion
