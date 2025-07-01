const { exec } = require('child_process');
const lang = require(`./langs/${localStorage.getItem('lang')}.js`);

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function openFile(callback) {
  const file = document.getElementById('file').files[0];
  const reader = new FileReader();
  
  reader.onload = function() {
    callback(reader.result);
  };
  
  reader.readAsText(file);
};

function sendToConsole(message, color) {
  document.getElementById("msglist").innerHTML = document.getElementById("msglist").innerHTML + `<div class="message" style="color: ${color} !important;">${message}</div>`;
};

function sendSMS(number) {
  function replaceSpaces(str) {
    return str.replace(/ /g, '\\ ');
  };
  
  exec(__dirname+`/platform-tools/adb.exe shell am startservice --user 0 -n com.android.shellms/.sendSMS -e contact "${number}" -e msg "${replaceSpaces(localStorage.getItem('message'))}"`, (err, stdout, stderr) => {
    if (err) {
      return sendToConsole(lang.msglist.code.error, "red");
    };

    return sendToConsole(`"${localStorage.getItem('message')}" ${lang.msglist.code.ok} "${number}"`, "green");
  });
};

setInterval(() => {
  const scrollable = document.getElementById("top");
  scrollable.scrollTop += 100;
  if (scrollable.scrollTop < scrollable.scrollHeight - scrollable.clientHeight) { 
    requestAnimationFrame(scrollDiv)
  }
},1);

document.getElementById('tuto').addEventListener('click', () => {
  window.open('https://www.youtube.com/watch?v=6UOIZWxPOL8&t=27s','_blank','top=250,left=200,nodeIntegration=no');
});

document.getElementById('num').addEventListener('click', () => {
  document.getElementById("cover").style.display = "flex";
});

document.getElementById('block_close').addEventListener('click', () => {
  document.getElementById("cover").style.display = "none";
});

document.getElementById('dwn').addEventListener('click', () => {
  exec(__dirname+`/exemple.txt`);
});

document.getElementById('link').addEventListener('click', () => {
  window.open('https://f-droid.org/packages/com.android.shellms/','_blank','top=250,left=200,nodeIntegration=no');
});

document.getElementById('btnspamstart').addEventListener('click', () => {
  if(document.getElementById("file").value !== "") {
    document.getElementById("btnspamstart").style.display = "none";
    document.getElementById("btnspamstop").style.display = "flex";
    
    openFile(async (content) => {
      const lines = content.split(/\r\n|\n/);
    
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        sendSMS(line);
    
        await delay(2500);
      }
    });
  } else {
    sendToConsole(lang.file_error, "red")
  };
});

document.getElementById('btnspamstop').addEventListener('click', () => {
  return location.reload();
});

document.getElementById('btnlang').addEventListener('click', () => {
  localStorage.setItem('lang', document.getElementById('browsers').value);
  return location.reload();
});

document.getElementById('btnmessage').addEventListener('click', () => {
  localStorage.setItem('message', document.getElementById('messageinput').value);
});

document.getElementById('btntest').addEventListener('click', () => {
  return sendSMS("1");
});
document.getElementById('btnconnectphone').addEventListener('click', () => {
  document.getElementById("btnspamstart").style.display = "flex";
  document.getElementById("btntest").style.display = "flex";
  document.getElementById("btnconnectphone").style.display = "none";

  exec(__dirname+`/platform-tools/adb.exe devices`, (err, stdout, stderr) => {
    if (err) {
      sendToConsole(lang.msglist.code.errordevice, "red");
    };

    sendToConsole(lang.msglist.code.okconnect, "green");
  });
});