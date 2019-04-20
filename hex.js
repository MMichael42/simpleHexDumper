console.log('hello world');

const hex = document.querySelector('#hex');
const status = document.querySelector('#status');
const fileUploadInput = document.querySelector('#romUploader');

fileUploadInput.addEventListener('change', function(e) {
  const reader = new FileReader();

  if (fileUploadInput.files[0].size > 4096) {
    status.textContent = 'file too big, this tool is only for roms <= 4096 bytes, the file you are attempting to upload is ' + fileUploadInput.files[0].size + ' bytes';
    return;
  } else {
    status.textContent = fileUploadInput.files[0].name + ' loaded, size = ' + fileUploadInput.files[0].size + ' bytes';
  }

  reader.readAsArrayBuffer(fileUploadInput.files[0]);

  reader.onload = () => {
    console.log(reader.result);
    loadRom(reader.result);
  }
  
});

function loadRom(arrayBuffer) {
  let gameRom;
  let decArr = [];

  if (arrayBuffer) {
    gameRom = new Uint8Array(arrayBuffer);
  } else {
    throw new Error('file loading error');
  }

  let hexText = '';

  gameRom.forEach( byte => {
    let textByte = byte.toString();

    // we do this so the numbers are more uniform
    if (textByte.length === 1) {
      textByte = '00' + textByte; 
    } else if (textByte.length === 2) {
      textByte = '0' + textByte;
    }
    decArr.push(parseInt(textByte, 10));
  });

  decArr.forEach( num => {
    let hex = num.toString(16);
    if (hex.length === 1) {
      hex = '0' + hex;
    }
    hexText += hex + ' ';
  });
  // remove the last comma and space
  hexText = hexText.slice(0, -1);
  // show the hex div
  hex.classList.add('show');

  hex.textContent = hexText.toUpperCase();  
}