"use strict";
var controller = require('./controller');

module.exports = function(appium) {
  var rest = appium.rest
    , inject = function(req, res, next) {
        req.appium = appium;
        req.device = appium.device;
        next();
      };

  // Make appium available to all REST http requests.
  rest.all('/wd/*', inject);
  rest.all('/wd/hub/session/*', controller.sessionBeforeFilter);

  rest.get('/wd/hub/status', controller.getStatus);
  rest.post('/wd/hub/session', controller.createSession);
  rest.get('/wd/hub/session/:sessionId?', controller.getSession);
  rest.delete('/wd/hub/session/:sessionId?', controller.deleteSession);
  rest.get('/wd/hub/sessions', controller.getSessions);
  rest.post('/wd/hub/session/:sessionId?/element', controller.findElement);
  rest.post('/wd/hub/session/:sessionId?/elements', controller.findElements);
  rest.post('/wd/hub/session/:sessionId?/element/:elementId?/value', controller.setValue);
  rest.post('/wd/hub/session/:sessionId?/element/:elementId?/click', controller.doClick);
  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/text', controller.getText);
  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/displayed', controller.elementDisplayed);
  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/enabled', controller.elementEnabled);
  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/location', controller.getLocation);
  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/size', controller.getSize);
  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/attribute/:name', controller.getAttribute);
  rest.post('/wd/hub/session/:sessionId?/element/:elementId?/clear', controller.clear);
  rest.post('/wd/hub/session/:sessionId?/frame', controller.frame);
  rest.post('/wd/hub/session/:sessionId?/keys', controller.keys);
  rest.get('/wd/hub/session/:sessionId?/source', controller.getPageSource);
  rest.get('/wd/hub/session/:sessionId?/alert_text', controller.getAlertText);
  rest.post('/wd/hub/session/:sessionId?/accept_alert', controller.postAcceptAlert);
  rest.post('/wd/hub/session/:sessionId?/dismiss_alert', controller.postDismissAlert);
  rest.post('/wd/hub/session/:sessionId?/timeouts/implicit_wait', controller.implicitWait);
  rest.get('/wd/hub/session/:sessionId/orientation', controller.getOrientation);
  rest.post('/wd/hub/session/:sessionId/orientation', controller.setOrientation);
  rest.get('/wd/hub/session/:sessionId/screenshot', controller.getScreenshot);
  rest.post('/wd/hub/session/:sessionId?/element/:elementId?/element', controller.findElementFromElement);
  rest.post('/wd/hub/session/:sessionId?/element/:elementId?/elements', controller.findElementsFromElement);
  rest.post('/wd/hub/session/:sessionId/touch/flick', controller.flick);
  rest.post('/wd/hub/session/:sessionId?/url', controller.postUrl);
  rest.post('/wd/hub/session/:sessionId?/element/active', controller.active);

  // keep this at the very end!
  rest.all('/*', controller.unknownCommand);
};

// TODO: http://cdn.memegenerator.net/instances/400x/33433130.jpg
// High priority to reach parity with PyAppium:
//  rest.post('/wd/hub/session/:sessionId?/execute     --> Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame.
//  rest.get('/wd/hub/session/:sessionId?/local_storage     --> Get all keys of the storage.
//  rest.post('/wd/hub/session/:sessionId?/local_storage     --> Set the storage item for the given key.
//  rest.delete('/wd/hub/session/:sessionId?/local_storage     --> Clear the storage.
//  rest.get('/wd/hub/session/:sessionId?/local_storage/key/:key     --> Get the storage item for the given key.
//  rest.delete('/wd/hub/session/:sessionId?/local_storage/key/:key     --> Remove the storage item for the given key.
//  rest.get('/wd/hub/session/:sessionId?/local_storage/size     --> Get the number of items in the storage.
//
//
// The rest of the API:
//  rest.post('/wd/hub/session/:sessionId?/timeouts     --> Configure the amount of time that a particular type of operation can execute for before they are aborted and a |Timeout| error is returned to the client.
//  rest.post('/wd/hub/session/:sessionId?/execute_async     --> Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame.
//  rest.post('/wd/hub/session/:sessionId?/timeouts/async_script     --> Set the amount of time, in milliseconds, that asynchronous scripts executed by /session/:sessionId/execute_async are permitted to run before they are aborted and a |Timeout| error is returned to the client.
//  rest.get('/wd/hub/session/:sessionId?/window_handle     --> Retrieve the current window handle.
//  rest.get('/wd/hub/session/:sessionId?/window_handles     --> Retrieve the list of all window handles available to the session.
//  rest.get('/wd/hub/session/:sessionId?/url     --> Retrieve the URL of the current page.
//  rest.post('/wd/hub/session/:sessionId?/forward     --> Navigate forwards in the browser history, if possible.
//  rest.post('/wd/hub/session/:sessionId?/back     --> Navigate backwards in the browser history, if possible.
//  rest.post('/wd/hub/session/:sessionId?/refresh     --> Refresh the current page.
//  rest.get('/wd/hub/session/:sessionId?/ime/available_engines     --> List all available engines on the machine.
//  rest.get('/wd/hub/session/:sessionId?/ime/active_engine     --> Get the name of the active IME engine.
//  rest.get('/wd/hub/session/:sessionId?/ime/activated     --> Indicates whether IME input is active at the moment (not if it's available.
//  rest.post('/wd/hub/session/:sessionId?/ime/deactivate     --> De-activates the currently-active IME engine.
//  rest.post('/wd/hub/session/:sessionId?/ime/activate     --> Make an engines that is available (appears on the listreturned by getAvailableEngines) active.
//  rest.post('/wd/hub/session/:sessionId?/window     --> Change focus to another window.
//  rest.delete('/wd/hub/session/:sessionId?/window     --> Close the current window.
//  rest.post('/wd/hub/session/:sessionId?/window/:windowHandle/size     --> Change the size of the specified window.
//  rest.get('/wd/hub/session/:sessionId?/window/:windowHandle/size     --> Get the size of the specified window.
//  rest.post('/wd/hub/session/:sessionId?/window/:windowHandle/position     --> Change the position of the specified window.
//  rest.get('/wd/hub/session/:sessionId?/window/:windowHandle/position     --> Get the position of the specified window.
//  rest.post('/wd/hub/session/:sessionId?/window/:windowHandle/maximize     --> Maximize the specified window if not already maximized.
//  rest.get('/wd/hub/session/:sessionId?/cookie     --> Retrieve all cookies visible to the current page.
//  rest.post('/wd/hub/session/:sessionId?/cookie     --> Set a cookie.
//  rest.delete('/wd/hub/session/:sessionId?/cookie     --> Delete all cookies visible to the current page.
//  rest.delete('/wd/hub/session/:sessionId?/cookie/:name     --> Delete the cookie with the given name.
//  rest.get('/wd/hub/session/:sessionId?/title     --> Get the current page title.
//  rest.get('/wd/hub/session/:sessionId?/element/:elementId?     --> Describe the identified element.
//  rest.post('/wd/hub/session/:sessionId?/element/:elementId?/submit     --> Submit a FORM element.
//  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/name     --> Query for an element's tag name.
//  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/selected     --> Determine if an OPTION element, or an INPUT element of type checkbox or radiobutton is currently selected.
//  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/equals/:other     --> Test if two element IDs refer to the same DOM element.
//  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/location_in_view     --> Determine an element's location on the screen once it has been scrolled into view.
//  rest.get('/wd/hub/session/:sessionId?/element/:elementId?/css/:propertyName     --> Query the value of an element's computed CSS property.
//  rest.post('/wd/hub/session/:sessionId?/moveto     --> Move the mouse by an offset of the specificed element.
//  rest.post('/wd/hub/session/:sessionId?/click     --> Click any mouse button (at the coordinates set by the last moveto command).
//  rest.post('/wd/hub/session/:sessionId?/buttondown     --> Click and hold the left mouse button (at the coordinates set by the last moveto command).
//  rest.post('/wd/hub/session/:sessionId?/buttonup     --> Releases the mouse button previously held (where the mouse is currently at).
//  rest.post('/wd/hub/session/:sessionId?/doubleclick     --> Double-clicks at the current mouse coordinates (set by moveto).
//  rest.post('/wd/hub/session/:sessionId?/touch/click     --> Single tap on the touch enabled device.
//  rest.post('/wd/hub/session/:sessionId?/touch/down     --> Finger down on the screen.
//  rest.post('/wd/hub/session/:sessionId?/touch/up     --> Finger up on the screen.
//  rest.post('/wd/hub/session/:sessionId?/touch/move     --> Finger move on the screen.
//  rest.post('/wd/hub/session/:sessionId?/touch/scroll     --> Scroll on the touch screen using finger based motion events.
//  rest.post('/wd/hub/session/:sessionId?/touch/scroll     --> Scroll on the touch screen using finger based motion events.
//  rest.post('/wd/hub/session/:sessionId?/touch/doubleclick     --> Double tap on the touch screen using finger motion events.
//  rest.post('/wd/hub/session/:sessionId?/touch/longclick     --> Long press on the touch screen using finger motion events.
//  rest.get('/wd/hub/session/:sessionId?/location     --> Get the current geo location.
//  rest.post('/wd/hub/session/:sessionId?/location     --> Set the current geo location.
//  rest.get('/wd/hub/session/:sessionId?/session_storage     --> Get all keys of the storage.
//  rest.post('/wd/hub/session/:sessionId?/session_storage     --> Set the storage item for the given key.
//  rest.delete('/wd/hub/session/:sessionId?/session_storage     --> Clear the storage.
//  rest.get('/wd/hub/session/:sessionId?/session_storage/key/:key     --> Get the storage item for the given key.
//  rest.delete('/wd/hub/session/:sessionId?/session_storage/key/:key     --> Remove the storage item for the given key.
//  rest.get('/wd/hub/session/:sessionId?/session_storage/size     --> Get the number of items in the storage.
//  rest.post('/wd/hub/session/:sessionId?/log     --> Get the log for a given log type.
//  rest.get('/wd/hub/session/:sessionId?/log/types     --> Get available log types.
//  rest.get('/wd/hub/session/:sessionId?/application_cache/status     --> Get the status of the html5 application cache.
