(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("./login");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfODhlYTMxNjAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vbG9naW5cIjtcclxuIl19
},{"./login":2}],2:[function(require,module,exports){
"use strict";

var body = document.querySelector("body");
var loginForm = document.getElementById("jsLogin");
var NICKNAME = "nickname";
var LOGGED_OUT = "loggedOut";
var LOGGED_IN = "loggedIn";
var nickname = localStorage.getItem(NICKNAME);

var logIn = function logIn(nickname) {
  window.socket = io("/");
  window.socket.emit(window.events.setNickname, {
    nickname: nickname
  });
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

var handleFormSubmit = function handleFormSubmit(e) {
  e.preventDefault();
  var input = loginForm.querySelector("input");
  var value = input.value;
  console.log(value);
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  logIn(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsIk5JQ0tOQU1FIiwiTE9HR0VEX09VVCIsIkxPR0dFRF9JTiIsIm5pY2tuYW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxvZ0luIiwid2luZG93Iiwic29ja2V0IiwiaW8iLCJlbWl0IiwiZXZlbnRzIiwic2V0Tmlja25hbWUiLCJjbGFzc05hbWUiLCJoYW5kbGVGb3JtU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiaW5wdXQiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJzZXRJdGVtIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxJQUFJLEdBQUNDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0EsSUFBTUMsU0FBUyxHQUFHRixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBbEI7QUFFQSxJQUFNQyxRQUFRLEdBQUcsVUFBakI7QUFDQSxJQUFNQyxVQUFVLEdBQUcsV0FBbkI7QUFDQSxJQUFNQyxTQUFTLEdBQUcsVUFBbEI7QUFFQSxJQUFNQyxRQUFRLEdBQUdDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQkwsUUFBckIsQ0FBakI7O0FBRUEsSUFBTU0sS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQ0gsUUFBRCxFQUFjO0FBQ3hCSSxFQUFBQSxNQUFNLENBQUNDLE1BQVAsR0FBZ0JDLEVBQUUsQ0FBQyxHQUFELENBQWxCO0FBQ0FGLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjRSxJQUFkLENBQW1CSCxNQUFNLENBQUNJLE1BQVAsQ0FBY0MsV0FBakMsRUFBNkM7QUFBQ1QsSUFBQUEsUUFBUSxFQUFSQTtBQUFELEdBQTdDO0FBQ0gsQ0FIRDs7QUFNQSxJQUFHQSxRQUFRLEtBQUksSUFBZixFQUFvQjtBQUNoQlIsRUFBQUEsSUFBSSxDQUFDa0IsU0FBTCxHQUFnQlosVUFBaEI7QUFDSCxDQUZELE1BRU07QUFDRk4sRUFBQUEsSUFBSSxDQUFDa0IsU0FBTCxHQUFlWCxTQUFmO0FBQ0FJLEVBQUFBLEtBQUssQ0FBQ0gsUUFBRCxDQUFMO0FBQ0g7O0FBSUQsSUFBTVcsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDQyxDQUFELEVBQU87QUFDNUJBLEVBQUFBLENBQUMsQ0FBQ0MsY0FBRjtBQUNBLE1BQU1DLEtBQUssR0FBR25CLFNBQVMsQ0FBQ0QsYUFBVixDQUF3QixPQUF4QixDQUFkO0FBRjRCLE1BR3JCcUIsS0FIcUIsR0FHWkQsS0FIWSxDQUdyQkMsS0FIcUI7QUFJNUJDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaO0FBQ0FELEVBQUFBLEtBQUssQ0FBQ0MsS0FBTixHQUFjLEVBQWQ7QUFDQWQsRUFBQUEsWUFBWSxDQUFDaUIsT0FBYixDQUFxQnJCLFFBQXJCLEVBQThCa0IsS0FBOUI7QUFDQXZCLEVBQUFBLElBQUksQ0FBQ2tCLFNBQUwsR0FBaUJYLFNBQWpCO0FBQ0FJLEVBQUFBLEtBQUssQ0FBQ1ksS0FBRCxDQUFMO0FBQ0gsQ0FURDs7QUFXQSxJQUFHcEIsU0FBSCxFQUFhO0FBQ1RBLEVBQUFBLFNBQVMsQ0FBQ3dCLGdCQUFWLENBQTJCLFFBQTNCLEVBQXFDUixnQkFBckM7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHk9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbmNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNMb2dpblwiKTtcclxuXHJcbmNvbnN0IE5JQ0tOQU1FID0gXCJuaWNrbmFtZVwiO1xyXG5jb25zdCBMT0dHRURfT1VUID0gXCJsb2dnZWRPdXRcIjtcclxuY29uc3QgTE9HR0VEX0lOID0gXCJsb2dnZWRJblwiO1xyXG5cclxuY29uc3Qgbmlja25hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShOSUNLTkFNRSk7XHJcblxyXG5jb25zdCBsb2dJbiA9IChuaWNrbmFtZSkgPT4ge1xyXG4gICAgd2luZG93LnNvY2tldCA9IGlvKFwiL1wiKTtcclxuICAgIHdpbmRvdy5zb2NrZXQuZW1pdCh3aW5kb3cuZXZlbnRzLnNldE5pY2tuYW1lLHtuaWNrbmFtZX0pO1xyXG59XHJcblxyXG5cclxuaWYobmlja25hbWU9PT0gbnVsbCl7XHJcbiAgICBib2R5LmNsYXNzTmFtZT0gTE9HR0VEX09VVDtcclxufWVsc2Uge1xyXG4gICAgYm9keS5jbGFzc05hbWU9TE9HR0VEX0lOO1xyXG4gICAgbG9nSW4obmlja25hbWUpO1xyXG59XHJcblxyXG5cclxuXHJcbmNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBsb2dpbkZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xyXG4gICAgY29uc3Qge3ZhbHVlfSA9IGlucHV0O1xyXG4gICAgY29uc29sZS5sb2codmFsdWUpO1xyXG4gICAgaW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTklDS05BTUUsdmFsdWUpO1xyXG4gICAgYm9keS5jbGFzc05hbWUgPSBMT0dHRURfSU47XHJcbiAgICBsb2dJbih2YWx1ZSk7XHJcbn1cclxuXHJcbmlmKGxvZ2luRm9ybSl7XHJcbiAgICBsb2dpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBoYW5kbGVGb3JtU3VibWl0KTtcclxufSJdfQ==
},{}]},{},[1])