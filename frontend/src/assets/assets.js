// icons
import cart_icon from "./cart_icon.png";
import search_icon from "./search_icon.png";
import add_icon_white from "./add_icon_white.png";
import add_icon_green from "./add_icon_green.png";
import remove_icon from "./remove_icon_red.png";
import cross_icon from "./cross_icon.png";

// others
import rating_starts from "./rating_starts.png";

// target pests
import target from "./placeholder_target.png";
import target_general from "./target_general.png";
import target_insects from "./target_insects.png";
import target_rodent from "./target_rodent.png";

// products
import cirrus from "./cirrus.png";
import delatacide from "./delatacide.png";
import fendona from "./fendona.png";
import optigard from "./optigard.png";
import oxyfly from "./oxyfly.png";
import permacap from "./permacap.png";
import pounce from "./pounce.png";
import resigen_ec from "./resigen_ec.png";
import storm_secure_wax_bait from "./storm_secure_wax_bait.png";
import sumilarv from "./sumilarv.png";

// logo
import uno_pest_co from "./uno_pest_co.svg";
import logo_title from "./logo_title.png";

//header
import header_img from "./header_img.png";

export const assets = {
  cart_icon,
  search_icon,
  cirrus,
  delatacide,
  fendona,
  optigard,
  oxyfly,
  permacap,
  pounce,
  resigen_ec,
  storm_secure_wax_bait,
  sumilarv,
  uno_pest_co,
  header_img,
  rating_starts,
  target,
  add_icon_green,
  add_icon_white,
  remove_icon,
  logo_title,
  cross_icon,
  target_general,
  target_insects,
  target_rodent,
};

export const target_pest = [
  {
    pest_target: "General",
    pest_img: target_general,
  },
  {
    pest_target: "Insect",
    pest_img: target_insects,
  },
  {
    pest_target: "Rodent",
    pest_img: target_rodent,
  },
];

export const product_list = [
  {
    _id: "P001",
    product_name: "Fendona",
    product_img: fendona,
    price: 3800.0,
    description:
      "A fast-acting pyrethroid insecticide that quickly and effectively eliminates disease-causing insects",
    category: "General",
  },
  {
    _id: "P002",
    product_name: "Storm Secure Wax Bait",
    product_img: storm_secure_wax_bait,
    price: 2350.0,
    description:
      "A ready to use rodenticide for the control of rats and mice in and around buildings",
    category: "Rodent",
  },
  {
    _id: "P003",
    product_name: "Pounce 500",
    product_img: pounce,
    price: 1388.88,
    description:
      "Timber and residual insecticide for the control of a range of insect pests in various timber and timber processing situations",
    category: "Insect",
  },
  {
    _id: "P004",
    product_name: "Deltacide",
    product_img: delatacide,
    price: 4400.0,
    description:
      "An effective pyrethroid spray to control all public health pests problem combining rapid knockdown and kill",
    category: "General",
  },
  {
    _id: "P005",
    product_name: "Sumilarv 0.5G",
    product_img: sumilarv,
    price: 150.0,
    description: "An advanced mosquito larval control agent",
    category: "Insect",
  },
  {
    _id: "P006",
    product_name: "Resigen EC",
    product_img: resigen_ec,
    price: 4400.0,
    description:
      "An environmentally-sensitive solution for flying insect pest and vector-borne disease control",
    category: "Insect",
  },
  {
    _id: "P007",
    product_name: "Optigard Ant Bait Gel",
    product_img: optigard,
    price: 688.88,
    description:
      "A sugar-based gel matrix of Optigard ant gel bait is highly attractive to ants",
    category: "Insect",
  },
  {
    _id: "P008",
    product_name: "Oxyfly Anti-Fly",
    product_img: oxyfly,
    price: 2688.88,
    description:
      "Acts against a broad range of insects affecting farm premises",
    category: "Insect",
  },
  {
    _id: "P009",
    product_name: "Permacap EC",
    product_img: permacap,
    price: 1688.88,
    description: "An insecticide that effectively kills more than 50 insects",
    category: "Insect",
  },
  {
    _id: "P010",
    product_name: "Cirrus Fogging Concentrate",
    product_img: cirrus,
    price: 2688.88,
    description:
      "A dual synergized formula that provides enhanced control of a wide range of commercial and residential pests",
    category: "General",
  },
];
