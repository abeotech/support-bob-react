"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SupportBot;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireWildcard(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _reactFeather = require("react-feather");
var _framerMotion = require("framer-motion");
var _reactHotToast = require("react-hot-toast");
var _material = require("@mui/material");
var _reactDeviceDetect = require("react-device-detect");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function SupportBot(_ref) {
  let {
    projectKey,
    user
  } = _ref;
  const ref = (0, _react.useRef)(null);
  // first option menu
  const [popup, setPopup] = (0, _react.useState)(false);
  // bigger focus nesting into an option
  const [focused, setFocused] = (0, _react.useState)(false);
  const [border, setBorder] = (0, _react.useState)('none');
  const [border2, setBorder2] = (0, _react.useState)('none');
  const [focusId, setFocusId] = (0, _react.useState)(null);
  const [subject, setSubject] = (0, _react.useState)('');
  const [description, setDescription] = (0, _react.useState)('');
  async function newRequest(request) {
    return fetch('https://t6hfvo.deta.dev/api/new-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }).then(data => data.json()).catch(error => console.log(error));
  }
  async function handleSubmit() {
    if (focusId === 0) {
      if (subject.length > 5 && description.length > 10) {
        const request = {
          key: crypto.randomUUID().substring(0, 13),
          subject,
          description,
          user,
          device: _reactDeviceDetect.browserName + " " + _reactDeviceDetect.browserVersion + ", " + _reactDeviceDetect.osName + " " + _reactDeviceDetect.osVersion,
          notes: [],
          time: new Date().getTime(),
          state: 'active',
          archived: false,
          opened: false
        };
        const res = await newRequest({
          request,
          projectKey
        });
        if (res === null) {
          // request was posted
          setFocusId(null);
          (0, _reactHotToast.toast)("Thanks. Your request has been submitted. You'll hear back as soon as possible.");
        } else {
          console.log(res);
          (0, _reactHotToast.toast)("Support Bob ran into an error submitting the request. Please try again");
        }
      } else {
        (0, _reactHotToast.toast)("Please enter a subject and description.");
      }
    }
  }
  return (
    /*#__PURE__*/
    // you must position this component in a div with position fixed and width and height set at 100%
    // this component does not have an email or phone number or first name input so you must pass these when sending the request
    _react.default.createElement("div", {
      ref: ref,
      style: {
        position: 'absolute',
        bottom: 96,
        right: 16
      }
    }, /*#__PURE__*/_react.default.createElement(_reactHotToast.Toaster, {
      toastOptions: {
        style: {
          fontFamily: "Inter",
          background: "#F9F3EE",
          borderRadius: "12px"
        }
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        maxWidth: 340,
        gap: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
      }
    }, focusId == 0 ? /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/_react.default.createElement(_reactFeather.X, {
      onClick: () => {
        setFocusId(null);
      },
      style: {
        cursor: "pointer",
        marginLeft: "auto",
        marginBottom: -12,
        zIndex: 1,
        background: "red",
        color: "white",
        borderRadius: 16,
        padding: 2
      }
    }), /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
      initial: {
        y: 16
      },
      animate: {
        y: 0
      },
      style: {
        display: "flex",
        flexDirection: "column",
        background: "#f3f3f3",
        padding: 16,
        gap: 16,
        borderRadius: 16
      }
    }, /*#__PURE__*/_react.default.createElement("h3", null, "Leave us a message"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("b", null, "Subject")), /*#__PURE__*/_react.default.createElement(_material.TextField, {
      multiline: "true",
      maxRows: 3,
      onFocus: () => {
        setBorder('1px solid #B2E0F2');
      },
      onBlur: () => {
        setBorder('none');
      },
      value: subject,
      onChange: e => {
        setSubject(e.target.value);
      },
      style: {
        background: "white",
        borderRadius: "4px"
      }
    }), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("b", null, "Description")), /*#__PURE__*/_react.default.createElement("p", null, "Please describe your request in as much detail as you can. We'll be in touch with you as soon as possible"), /*#__PURE__*/_react.default.createElement(_material.TextField, {
      multiline: "true",
      Ï: true,
      minRows: 3,
      maxRows: 6,
      onFocus: () => {
        setBorder2('1px solid #B2E0F2');
      },
      onBlur: () => {
        setBorder2('none');
      },
      value: description,
      type: "text",
      onChange: e => {
        setDescription(e.target.value);
      },
      style: {
        background: "white",
        width: 300,
        minHeight: 50,
        borderRadius: "4px"
      }
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: () => {
        handleSubmit();
      },
      style: {
        borderRadius: 32,
        background: "#2A2550",
        color: "white"
      }
    }, "Send"))) : /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, popup ? /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
      initial: {
        y: 16
      },
      animate: {
        y: 0
      },
      style: {
        display: "flex",
        flexDirection: "column",
        background: "#f3f3f3",
        padding: 16,
        gap: 8,
        borderRadius: 16
      }
    }, /*#__PURE__*/_react.default.createElement("p", {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setFocused(true);
        setFocusId(0);
      }
    }, "Contact us"), /*#__PURE__*/_react.default.createElement("p", {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        setFocused(true);
        setFocusId(1);
      }
    }, "Suggest an improvement")) : "", /*#__PURE__*/_react.default.createElement(_framerMotion.motion.div, {
      style: {
        marginLeft: 'auto'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      style: {
        borderRadius: 32,
        background: "#2A2550",
        color: "white"
      },
      onClick: () => {
        setPopup(!popup);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "row",
        gap: 8
      }
    }, popup ? /*#__PURE__*/_react.default.createElement(_reactFeather.XCircle, null) : /*#__PURE__*/_react.default.createElement(_reactFeather.HelpCircle, null), /*#__PURE__*/_react.default.createElement("p", null, popup ? "Close" : "Support")))))))
  );
}