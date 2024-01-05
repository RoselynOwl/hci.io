const footerContent = `
  <footer>
    <div class="footerContainer" id="footerContainer">
        <div class="socialMedia" id="socialMedia">
            <a href="https://www.facebook.com/" class="fa fa-facebook"></a>
            <a href="https://twitter.com/" class="fa fa-twitter"></a>
            <a href="https://www.instagram.com/" class="fa fa-instagram"></a>
        </div>
        <p>&copy;2023 Yummy Restaurant All Rights Reserved.</p>
    </div>
  </footer>
`;

window.onload = function () {
  const footerContainer = document.getElementById('footer');
  if (footerContainer) {
    footerContainer.innerHTML = footerContent;
  }
};