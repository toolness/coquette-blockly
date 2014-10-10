(function() {
  // Workspace save/load functionality.

  var KEY_NAME = 'blockly_xml?' + window.location.pathname;

  function getCurrentWorkspaceXml() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    return Blockly.Xml.domToText(xml);
  }

  function loadSavedWorkspace() {
    var lastXML = window.sessionStorage[KEY_NAME] || getInitialWorkspace();
    if (lastXML) {
      var xml = Blockly.Xml.textToDom(lastXML);
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
  }

  function saveCurrentWorkspace() {
    window.sessionStorage[KEY_NAME] = getCurrentWorkspaceXml();
  }

  function linkifyCurrentWorkspace() {
    return window.location.origin + window.location.pathname + '?' +
           'initialWorkspace=' + B64Gzip.compress(getCurrentWorkspaceXml());
  }

  function getInitialWorkspace() {
    var match = window.location.search.match(/initialWorkspace=([^&]+)/);
    try { return B64Gzip.decompress(match[1]); } catch(e) {}
  }

  // Initialization.

  function startup(gameHTML) {
    var playOrStop = function(event) {
      if (event.which == 32 && event.ctrlKey &&
          $('#blockly').is(':visible'))
        return $('#play').click();
      if (event.which == 27 && $('#game').is(':visible'))
        return $('#stop').click();
    };

    var generateGameHTML = function() {
      var script = Blockly.JavaScript.workspaceToCode();
      var lastSlash = window.location.pathname.lastIndexOf('/');
      var baseURL = window.location.origin +
                    window.location.pathname.slice(0, lastSlash + 1);

      return gameHTML
        .replace(/src=".\//g, 'src="' + baseURL)
        .replace('// INSERT GENERATED CODE HERE', script);
    };

    $('#pop-out').click(function() {
      var html = generateGameHTML();
      var url = 'data:text/html;base64,' + base64EncArr(strToUTF8Arr(html));

      window.open(url);
    });

    $('#play').click(function() {
      var iframe = document.createElement('iframe');
      var html = generateGameHTML();

      console.log(html);

      $('#blockly').hide();
      $('#game').show();
      $('#game').prepend(iframe);

      iframe.focus();
      iframe.contentDocument.open();
      iframe.contentDocument.write(html);
      iframe.contentDocument.close();
      iframe.contentWindow.addEventListener('keydown', playOrStop, true);
    });

    $(window).on('keydown', playOrStop);

    $('#stop').click(function() {
      $('#game iframe').remove();
      $('#game').hide();
      $('#blockly').show();
      $(window).focus();
    });

    $('#linkify').click(function() {
      prompt('Here is a link to your game.', linkifyCurrentWorkspace());
    });

//    $('#play').click();
  }

  $(function() {
    Blockly.inject($('#blockly')[0], {
      path: 'vendor/blockly/',
      toolbox: $('#toolbox')[0]
    });

    Blockly.addChangeListener(saveCurrentWorkspace);
    loadSavedWorkspace();

    $.get('game.html', startup);
  });
})();
