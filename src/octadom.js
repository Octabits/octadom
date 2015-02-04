var com_octabits_octadom = function (oConfig) {
  "use strict";
  var privy = {},
    exposed,
    config = oConfig || {
      isTest: false
    };



  privy = {
    schema: {},
    valTypes: {
      ARRAY: 0,
      OBJECT: 1,
      STRING: 2
    },
    // Find the value of a nested property on a parent object
    // Object represents the parent object
    // path is the nested property in dor notation as a string i.e. "prop1.subprop.underprop" 
    // This would get the value "taco" from the floowing object {prop1: { subProp: { underProp: "taco"}}}
    getProp: function (obj, path) {
      var pathArr = path.split("."),
        tarObj,
        len = pathArr.length,
        i;

      tarObj = obj;
      for (i = 0; i < len; i++) {
        tarObj = tarObj[pathArr[i]];
      }
      return tarObj;
    },
    // determine if the value of the element is an array, object, or string
    checkValType: function (odom) {
      var valType = privy.valTypes.OBJECT;

      if (typeof odom.val === "string") {
        valType = privy.valTypes.STRING;
      } else if (Array.isArray(odom.val)) {
        valType = privy.valTypes.ARRAY;
      }
      return valType;
    },
    // Figure out how to render the value if it is a string value
    applyValString: function (valStr) {
      return valStr;
    },
    // Figure out how to render the value if it is an object
    // This should be a single element with optional child elements
    applyValObject: function (valObj) {
      return privy.wrapel(valObj);
    },
    // Figure out how to render the value if it is a string value
    applyValArray: function (valArr) {
      var i,
        len = valArr.length,
        valStr = "";

      for (i = 0; i < len; i++) {
        valStr += privy.wrapel(valArr[i]);
      }
      return valStr;
    },
    // Figure out how to render the value if it is a string value
    bindValArray: function (odom) {
      var i,
        valStr = "",
        propVal,
        el = {},
        props = privy.getProp(provider, odom.each.key),
        len = props.length;

      for (i = 0; i < len; i++) {
        propVal = props[i];
        valStr += privy.wrapel({
          "el": odom.each.el,
          "val": propVal
        });
      }
      return valStr;
    },
    getVal: function (odom) {

      var inner = "",
        innerEl,
        valLen,
        j,
        len,
        i;

      if (odom.hasOwnProperty("val")) {
        switch (privy.checkValType(odom)) {
        case privy.valTypes.ARRAY:
          inner += privy.applyValArray(odom.val);
          break;
        case privy.valTypes.OBJECT:
          inner += privy.applyValObject(odom.val);
          break;
        case privy.valTypes.STRING:
          inner += privy.applyValString(odom.val);
          break;
        }
      } else if (odom.hasOwnProperty("each")) {
        inner += privy.bindValArray(odom);
      }

      return inner;
    },

    getAtts: function (odom) {

      var att,
        atts = "",
        attArr = [],
        attStr = "";
      if (odom.hasOwnProperty("el") &&
        odom.hasOwnProperty("atts")) {
        for (att in odom.atts) {
          if (odom.atts.hasOwnProperty(att)) {
            attArr.push(att + '="' + odom.atts[att] + '"');
          }
        }
        if (attArr.length > 0) {
          atts = " " + attArr.join(" ");
        }

      }
      return atts;
    },

    wrapel: function (odom) {
      var wrapped = "",
        hasEl = false;
      if (odom.hasOwnProperty("el")) {
        hasEl = true;
        wrapped += "<";
        wrapped += odom.el;
        wrapped += privy.getAtts(odom);
        wrapped += " >";
      }

      wrapped += privy.getVal(odom);

      if (hasEl === true) {
        wrapped += "</";
        wrapped += odom.el;
        wrapped += ">";
      }
      return wrapped;
    }
  };

  exposed = {

    fromTemplate: function (args) {
      var provider = args.provider;
      return privy.wrapel(args.template);
    }
  };
  // Expose inner closure "privy" object as "exposed.loophole" for unit testing
  // this will only happen if a config obecjt is passed in with a property of "isTest:true"
  if (config.hasOwnProperty("isTest") &&
    config.isTest === true) {
    exposed.loophole = privy;
  }
  // return the clean public interface that has closure access to the private functions and variables
  return exposed;
};
