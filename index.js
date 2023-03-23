const puppeteer = require("puppeteer");
const cliProgress = require("cli-progress");

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

(async () => {
  const EMAIL = process.argv[2];
  const PASSWORD = process.argv[3];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Abriendo pagina curso.seguridadvial.gob.ar...");
  await page.goto("https://curso.seguridadvial.gob.ar/ansv/index.php/registracion#");
  await page.click(".btn-info");
  console.log("Iniciando sesión...");
  await page.$eval("#login-email", (el, EMAIL) => (el.value = EMAIL), EMAIL);
  await page.$eval("#login-password", (el, PASSWORD) => (el.value = PASSWORD), PASSWORD);
  await page.click("#btn-ingresar");
  console.log("Sesion Iniciada!");
  console.log("Recorriendo capitulos...");
  setTimeout(async () => {
    progressBar.start(330, 0);

    for (let i = 1; i <= 330; i++) {
      progressBar.update(i);
      await page.goto(`https://curso.seguridadvial.gob.ar/ansv/index.php/capitulos/ver_subcapitulo/${i}`);
    }
    progressBar.stop();
    await page.goto("https://curso.seguridadvial.gob.ar/ansv/index.php/cursos/finalizado/1");
    await page.goto("https://curso.seguridadvial.gob.ar/ansv/index.php/cursos/finalizado/3").then(() => {
      console.log(
        "Cursos terminados ! \n",
        "Podes descargar los certificados en los siguientes links: \n",
        "Auto: https://curso.seguridadvial.gob.ar/ansv/index.php/cursos/descargar_pdf/1 \n",
        "Moto: https://curso.seguridadvial.gob.ar/ansv/index.php/cursos/descargar_pdf/3"
      );
      browser.close();
    });
  }, 100);
})();
