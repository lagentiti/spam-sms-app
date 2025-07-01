window.addEventListener('DOMContentLoaded', () => {
  const { Titlebar } = require("custom-electron-titlebar");
  const fs = require('fs');
  const path = require('path');

  new Titlebar({
    backgroundColor: '#55a630',
    icon: "./icons/icon_512.png",
    menu: null,
    maximizable: null
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  };

  /**
   * langs
   */
  const lang = localStorage.getItem('lang');
  if (lang == null) {
    localStorage.setItem('lang', 'english');
    return location.reload();
  } else {
    let lang2 = require(`./langs/${lang}.js`);

    const directoryPath = path.join('./langs/');

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return console.log('Impossible de scanner le dossier : ' + err);
      }

      let optionsHTML = '';
      var sel = '';
      files.forEach((file) => {
        if (path.extname(file) === '.js') {
          if(file.split('.js')[0] == lang) {
            var sel = 'selected';
          } else {
            var sel  = '';
          };

          optionsHTML += `<option style="color: black !important;"${sel}>${file.split('.js')[0]}</option>`;
        }
      });

      return document.querySelector("select[id='browsers']").innerHTML = optionsHTML;
    });


    document.getElementById('list_number').innerHTML = lang2.msglist.tuto.list_number;
    document.getElementById('connectphone').innerHTML = lang2.msglist.tuto.connect_phone.msg;
    document.getElementById('tuto').innerHTML = lang2.msglist.tuto.connect_phone.link;
    document.getElementById('downloadapp').innerHTML = lang2.msglist.tuto.download_app.msg;
    document.getElementById('link').innerHTML = lang2.msglist.tuto.download_app.link;
    document.getElementById('btnspamstart').innerHTML = lang2.btnspam.off;
    document.getElementById('btnspamstop').innerHTML = lang2.btnspam.on;
    document.getElementById('txtphonelist').innerHTML = lang2.menu.phoneList;
    document.getElementById('messagemenu').innerHTML = lang2.menu.message;
    document.getElementById('dwn').innerHTML = lang2.download_ex;
    document.getElementById('changelangtxt').innerHTML = lang2.change_lang_txt;
    document.getElementById('btnlang').innerHTML = lang2.btn_lang;
    document.getElementById('btnmessage').innerHTML = lang2.btn_msg;
    document.getElementById('messageinput').value = localStorage.getItem('message');
    document.getElementById('btntest').innerHTML = lang2.btn_test;
    document.getElementById('btnconnectphone').innerHTML = lang2.btn_connect_phone;
  };
});