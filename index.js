const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://curso.seguridadvial.gob.ar/ansv/index.php/registracion#"
  );
  await page.click(".btn-info");
  await page.$eval("#login-email", (el) => (el.value = ""));
  await page.$eval("#login-password", (el) => (el.value = ""));
  await page.click("#btn-ingresar");
  setTimeout(async () => {
    for (let i = 1; i <= 330; i++) {
      await page.goto(
        `https://curso.seguridadvial.gob.ar/ansv/index.php/capitulos/ver_subcapitulo/${i}`
      );
    }
  }, 100);
})();
