// This file is used for the standalone browser build
import Luminous from "./_luminous-base";
import LuminousGallery from "./_luminousGallery";

window["LuminousGallery"] = LuminousGallery;
window["Luminous"] = Luminous;

const zoom = document.querySelectorAll('.js--zoom');
new LuminousGallery(zoom, {}, {
		closeOnScroll: false
});