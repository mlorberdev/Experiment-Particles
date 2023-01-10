import { no1 } from "./no1.js";
import { no2 } from "./no2.js";
import { no3 } from "./no3.js";

!(function () {

  // RESPOND TO USER SELECTION BY RUNNING SELECTED PROGRAM
  document.getElementById("balldrop").addEventListener("change", function () {
    switch (this.value) {
      case "no1": no1(); break;
      case "no2": no2(); break;
      case "no3": no3(); break;
      default: break;
    }
  });

  

})();