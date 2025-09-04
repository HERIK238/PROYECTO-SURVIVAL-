$(document).ready(function(){
  $('#goRight').on('click', function(){
    $('#slideBox').animate({ 'marginLeft' : '0' });
    $('.topLayer').animate({ 'marginLeft' : '100%' });
  });

  $('#goLeft').on('click', function(){
    $('#slideBox').animate({
      'marginLeft': (window.innerWidth > 769 ? '50%' : '20%')
    });
    $('.topLayer').animate({ 'marginLeft': '0' });
  });
});

// Canvas Paper.js
paper.install(window);
paper.setup(document.getElementById("canvas"));

let canvasWidth, canvasHeight, canvasMiddleX, canvasMiddleY;
const shapeGroup = new Group();
let positionArray = [];

function getCanvasBounds() {
  canvasWidth = view.size.width;
  canvasHeight = view.size.height;
  canvasMiddleX = canvasWidth / 2;
  canvasMiddleY = canvasHeight / 2;

  positionArray = [
    { x: (canvasMiddleX - 50) + (canvasMiddleX / 2), y: 150 },
    { x: 200, y: canvasMiddleY },
    { x: canvasWidth - 130, y: canvasHeight - 75 },
    { x: 0, y: canvasMiddleY + 100 },
    { x: (canvasMiddleX / 2) + 100, y: 100 },
    { x: canvasMiddleX + 80, y: canvasHeight - 50 },
    { x: canvasWidth + 60, y: canvasMiddleY - 50 },
    { x: canvasMiddleX + 100, y: canvasMiddleY + 100 }
  ];
}

function initializeShapes() {
  getCanvasBounds();

  const shapePathData = [
    'M231,352l445-156L600,0L452,54L331,3L0,48L231,352',
    'M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z',
    'M0,65l16,138l96,107l270-2L470,0L337,4L0,65z',
    'M333,0L0,94l64,219L29,437l570-151l-196-42L333,0',
    'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
    'M389,352l92-113l195-43l0,0l0,0L445,48l-80,1L122.7,0L0,275.2L162,297L389,352',
    'M 50 100 L 300 150 L 550 50 L 750 300 L 500 250 L 300 450 L 50 100',
    'M 700 350 L 500 350 L 700 500 L 400 400 L 200 450 L 250 350 L 100 300 L 150 50 L 350 100 L 250 150 L 450 150 L 400 50 L 550 150 L 350 250 L 650 150 L 650 50 L 700 150 L 600 250 L 750 250 L 650 300 L 700 350 '
  ];

  for (let i = 0; i < shapePathData.length; i++) {
    const shape = new Path({
      pathData: shapePathData[i],
      strokeColor: 'rgba(255, 255, 255, 0.5)',
      strokeWidth: 2,
      parent: shapeGroup
    });
    shape.scale(2);
    shape.position = positionArray[i];
  }
}

initializeShapes();

view.onFrame = function(event) {
  if (event.count % 4 === 0) {
    shapeGroup.children.forEach((shape, i) => {
      shape.rotate(i % 2 === 0 ? -0.1 : 0.1);
    });
  }
};

//-----------------------SPACE FOR AJAX------------------------

$('#logIn').on('click', function () {
  const username = $('#username-login').val();
  const password = $('#password-login').val();

  $.ajax({
    url: 'auth.php',
    method: 'POST',
    data: {
      action: 'login',
      username: username,
      password: password
    },
    dataType: 'json',
    success: function (response) {
      if (response.success) {
        console.log('Login exitoso. Datos del usuario:', response.user);
        alert('Bienvenido ' + response.user.username);
      } else {
        alert('Login fallido: ' + response.message);
      }
    },
    error: function (xhr, status, error) {
      console.error('Error en la petición AJAX:', error);
    }
  });
});

$('#signUp').on('click', function () {
  const email = $('#email').val();
  const username = $('#username-signup').val();
  const password = $('#password-signup').val();

  $.ajax({
    url: 'auth.php',
    method: 'POST',
    data: {
      action: 'register',
      email: email,
      username: username,
      password: password
    },
    dataType: 'json',
    success: function (response) {
      if (response.success) {
        alert('Registro exitoso');
        console.log('Usuarios en sesión:', response);
      } else {
        alert('Error al registrar: ' + response.message);
      }
    },
    error: function (xhr, status, error) {
      console.error('Error en el registro AJAX:', error);
    }
  });
});

//-----------------------------------------------------------------
