(function() {
  // Workspace save/load functionality.

  var KEY_NAME = 'blockly_xml?' + window.location.search.slice(1);

  function loadSavedWorkspace() {
    var lastXML = window.sessionStorage[KEY_NAME];
    if (lastXML) {
      var xml = Blockly.Xml.textToDom(lastXML);
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
  }

  function saveCurrentWorkspace() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    window.sessionStorage[KEY_NAME] = Blockly.Xml.domToPrettyText(xml);
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

    $('#play').click(function() {
      var iframe = document.createElement('iframe');
      var scriptTag = '<script>\n' +
                      Blockly.JavaScript.workspaceToCode() +
                      '</script>';
      var html = gameHTML + scriptTag;

      console.log(scriptTag);

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
