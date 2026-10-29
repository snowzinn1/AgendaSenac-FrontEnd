const sharp = require('sharp');

const dir = 'assets/images';
const svg = `${dir}/AgendaSenac.svg`;

async function gerar(nome, tamanhoLogo, fundo, escurecer = false) {
  let logo = sharp(svg, { density: 1200 }).resize({
    width: tamanhoLogo,
    height: tamanhoLogo,
    fit: 'inside',
  });
  if (escurecer) logo = logo.modulate({ brightness: 0 });

  const logoBuffer = await logo.png().toBuffer();

  await sharp({
    create: { width: 1024, height: 1024, channels: 4, background: fundo },
  })
    .composite([{ input: logoBuffer, gravity: 'center' }])
    .png()
    .toFile(`${dir}/${nome}`);

  console.log('Gerado:', nome);
}

(async () => {
  const branco = { r: 255, g: 255, b: 255, alpha: 1 };
  const transparente = { r: 0, g: 0, b: 0, alpha: 0 };

  await gerar('icon.png', 800, branco);
  await gerar('android-icon-background.png', 1, branco);
  await gerar('android-icon-foreground.png', 600, transparente);
  await gerar('android-icon-monochrome.png', 600, transparente, true);
})();
