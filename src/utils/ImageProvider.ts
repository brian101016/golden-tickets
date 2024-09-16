/* eslint-disable import/first */

// #region ##################################################################################### BACKGROUND
import bg_argollas from "@bg/argollas.jpg";
import bg_carmen from "@bg/carmen.jpg";
import bg_church from "@bg/church.jpg";
import bg_common_decoration from "@bg/common-decoration.jpg";
import bg_granular from "@bg/granular.jpg";
import bg_petals from "@bg/petals.jpg";
import bg_standing_dark from "@bg/standing-dark.jpg";
import bg_standing_light from "@bg/standing-light-cropped.jpg";
// standing_light original not included
import bg_terranova from "@bg/terranova.jpg";
// #endregion

// #region ##################################################################################### SHAPE
// import shape_not_found from "@theme/images/shape/not-found.png";
import shape_cloud from "@shape/cloud.png";
import shape_dots from "@shape/dots.png";
import shape_flower_blue from "@shape/flower-blue.png";
import shape_flower_branch from "@shape/flower-branch.png";
import shape_flower_dark from "@shape/flower-dark.png";
import shape_flower_gray from "@shape/flower-gray.png";
import shape_flower_light from "@shape/flower-light.png";
import shape_flower_lilac from "@shape/flower-lilac.png";
import shape_flower_white from "@shape/flower-white.png";
import shape_flower_yellow from "@shape/flower-yellow.png";
import shape_golden_frame from "@shape/golden-frame.svg";
import shape_golden_separator from "@shape/golden-separator.png";
import shape_golden_text_decor from "@shape/golden-text-decor.svg";
import shape_ring_empty from "@shape/ring-empty.png";
import shape_ring_full from "@shape/ring-full.png";
import shape_ring_half from "@shape/ring-half.png";
// #endregion

// #region ##################################################################################### ICON
import icon_alert_error from "@icon/alert-error.png";
import icon_alert_info from "@icon/alert-info.png";
import icon_alert_success from "@icon/alert-success.png";
import icon_alert_warning from "@icon/alert-warning.png";
import icon_close from "@icon/close.png";
import icon_envelope from "@icon/envelope.svg";
import icon_eye_off from "@icon/eye-off.png";
import icon_eye_on from "@icon/eye-on.png";
import icon_heart from "@icon/heart.svg";
// #endregion

// #region ##################################################################################### MISC
import misc_aniversario from "@misc/aniversario.jpg";
// #endregion

/** Objeto **I**mage**P**rovider que almacena todas las rutas de todas las imágenes y contenido de la aplicación. */
const IP = {
  /** Imágenes utilizadas como **fondo de pantalla** (imágenes grandes). */
  bg: {
    argollas: bg_argollas,
    carmen: bg_carmen,
    church: bg_church,
    common_decoration: bg_common_decoration,
    granular: bg_granular,
    petals: bg_petals,
    standing_dark: bg_standing_dark,
    standing_light: bg_standing_light,
    terranova: bg_terranova,
  },

  /** Imágenes utilizadas como **contenido** (imágenes medianas). */
  shape: {
    cloud: shape_cloud,
    dots: shape_dots,
    flower_blue: shape_flower_blue,
    flower_branch: shape_flower_branch,
    flower_dark: shape_flower_dark,
    flower_gray: shape_flower_gray,
    flower_light: shape_flower_light,
    flower_lilac: shape_flower_lilac,
    flower_white: shape_flower_white,
    flower_yellow: shape_flower_yellow,
    golden_frame: shape_golden_frame,
    golden_separator: shape_golden_separator,
    golden_text_decor: shape_golden_text_decor,
    ring_empty: shape_ring_empty,
    ring_full: shape_ring_full,
    ring_half: shape_ring_half,
  },

  /** Imágenes utilizadas como **íconos** (imágenes pequeñas). */
  icon: {
    alert_error: icon_alert_error,
    alert_info: icon_alert_info,
    alert_success: icon_alert_success,
    alert_warning: icon_alert_warning,
    close: icon_close,
    envelope: icon_envelope,
    eye_off: icon_eye_off,
    eye_on: icon_eye_on,
    heart: icon_heart,
  },

  /** Imágenes sin categoría utilizadas en ocasiones específicas. */
  misc: {
    aniversario: misc_aniversario,
  },
};

export default IP;
