/* eslint-disable import/first */

// #region ##################################################################################### BACKGROUND
import bg_church from "@theme/images/bg/church.jpg";
import bg_common_decoration from "@theme/images/bg/common-decoration.jpg";
import bg_petals from "@theme/images/bg/petals.jpg";
import bg_standing_dark from "@theme/images/bg/standing-dark.jpg";
import bg_standing_light from "@theme/images/bg/standing-light.jpg";
import bg_argollas from "@theme/images/bg/argollas.jpg";
import bg_granular from "@theme/images/bg/granular.jpg";
import bg_terranova from "@theme/images/bg/terranova.jpg";
// #endregion

// #region ##################################################################################### SHAPE
// import shape_not_found from "@theme/images/shape/not-found.png";
import shape_golden_separator from "@theme/images/shape/golden-separator.png";
import shape_flower_ring_full from "@theme/images/shape/flower-ring-full.png";
import shape_flower_ring_half from "@theme/images/shape/flower-ring-half.png";
import shape_flower_ring_empty from "@theme/images/shape/flower-ring-empty.png";
import shape_alert_success from "@theme/images/shape/alert-success.png";
import shape_alert_warning from "@theme/images/shape/alert-warning.png";
import shape_alert_error from "@theme/images/shape/alert-error.png";
import shape_alert_info from "@theme/images/shape/alert-info.png";
import shape_aniversario from "@theme/images/shape/aniversario.jpg";
// #endregion

// #region ##################################################################################### ICON
import icon_close from "@theme/images/icon/close.png";
import icon_eye_off from "@theme/images/icon/eye-off.png";
import icon_eye_on from "@theme/images/icon/eye-on.png";
import icon_heart from "@theme/images/icon/heart.png";
// #endregion

// #region ##################################################################################### MISC
// #endregion

/** Objeto **I**mage**P**rovider que almacena todas las rutas de todas las imágenes y contenido de la aplicación. */
const IP = {
  /** Imágenes utilizadas como **fondo de pantalla** (imágenes grandes). */
  bg: {
    church: bg_church,
    common_decoration: bg_common_decoration,
    petals: bg_petals,
    standing_dark: bg_standing_dark,
    standing_light: bg_standing_light,
    argollas: bg_argollas,
    granular: bg_granular,
    terranova: bg_terranova,
  },

  /** Imágenes utilizadas como **contenido** (imágenes medianas). */
  shape: {
    // not_found: shape_not_found,
    golden_separator: shape_golden_separator,
    flower_ring_full: shape_flower_ring_full,
    flower_ring_half: shape_flower_ring_half,
    flower_ring_empty: shape_flower_ring_empty,
    alert_success: shape_alert_success,
    alert_warning: shape_alert_warning,
    alert_error: shape_alert_error,
    alert_info: shape_alert_info,
    aniversario: shape_aniversario,
  },

  /** Imágenes utilizadas como **íconos** (imágenes pequeñas). */
  icon: {
    close: icon_close,
    eye_off: icon_eye_off,
    eye_on: icon_eye_on,
    heart: icon_heart,
  },

  /** Imágenes sin categoría utilizadas en ocasiones específicas. */
  misc: {},
};

export default IP;
