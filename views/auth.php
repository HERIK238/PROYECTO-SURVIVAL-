<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login / Sign Up</title>
  <link rel="stylesheet" href="../css/style.css">
  
  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  
  <!-- Paper.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js"></script>

  <!-- Scripts -->
  <script defer src="../js/script.js"></script>
  <script defer src="../js/auth.js"></script>
  <script defer src="../js/theme.js"></script>
</head>
<body>
  <!-- Botón para cambiar de tema -->
  <button id="theme-toggle">🌙 Dark Mode</button>

  <div id="back">
    <canvas id="canvas" class="canvas-back" resize></canvas>
    <div class="backRight"></div>
    <div class="backLeft"></div>
  </div>

  <div id="slideBox">
    <div class="topLayer">
      <!-- SIGN UP -->
      <div class="left">
        <div class="content">
          <h2>Sign Up</h2>
          <form id="form-signup" method="post" >
            <div class="form-element form-stack">
              <label for="email-signup" class="form-label">Email</label>
              <input id="email-signup" type="email" name="email">
            </div>
            <div class="form-element form-stack">
              <label for="username-signup" class="form-label">Username</label>
              <input id="username-signup" type="text" name="username">
            </div>
            <div class="form-element form-stack">
              <label for="password-signup" class="form-label">Password</label>
              <input id="password-signup" type="password" name="password">
            </div>
            <div class="form-element form-checkbox">
              <input id="confirm-terms" type="checkbox" name="confirm" value="yes" class="checkbox">
              <label for="confirm-terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
            </div>
            <div class="form-element form-submit">
              <button id="signUp" class="signup" type="submit">Sign up</button>
              <button id="goLeft" class="signup off" type="button">Log In</button>
            </div>
          </form>
        </div>
      </div>

      <!-- LOGIN -->
      <div class="right">
        <div class="content">
          <h2>Login</h2>
          <form id="form-login" method="post" >
            <div class="form-element form-stack">
              <label for="username-login" class="form-label">Username</label>
              <input id="username-login" type="text" name="username">
            </div>
            <div class="form-element form-stack">
              <label for="password-login" class="form-label">Password</label>
              <input id="password-login" type="password" name="password">
            </div>
            <div class="form-element form-submit">
              <button id="logIn" class="login" type="submit">Log In</button>
              <button id="goRight" class="login off" type="button">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
