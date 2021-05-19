<template>
  <footer>
    <div class="container-fluid">
      <div class="row row-cols-xs row-cols-md-2 row-cols-lg-2">
        <div class="col-xs col-md col justify-content-center">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold pb-2">Get to Know Us</li>
            <li><a class="footer-link font-weight-light" href="#">About Us</a></li>
            <li>
              <a class="footer-link font-weight-light" href="#">Android App</a><br />
            </li>
            <li><a class="footer-link font-weight-light" href="#">iOS App</a><br /></li>
          </ul>
        </div>

        <div class="col-xs col-md col justify-content-center">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold">Connect With Us</li>
            <li><a class="footer-link font-weight-light" href="#">Facebook</a></li>
            <li><a class="footer-link font-weight-light" href="#">Twitter</a><br /></li>
            <li><a class="footer-link font-weight-light" href="#">Instagram</a><br /></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 100px;
  background-color: #2c2b2b;
  font-size: 16px;
}
li {
  padding-left: 0;
  padding-bottom: 10px;
}
a {
  text-decoration: none;
}
.footer-link {
  color: rgb(255, 253, 253);
}
#logo {
  width: 150px;
}
footer {
  font-family: "Roboto", sans-serif;
}
</style>
