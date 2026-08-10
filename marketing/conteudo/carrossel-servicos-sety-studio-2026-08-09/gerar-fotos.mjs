import https from 'https';
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.OPENAI_API_KEY;
const OUT = path.join(process.cwd());

const FOTOS = [
  {
    nome: 'foto-capa-sistema',
    prompt: `Cinematic photograph of a smartphone in a completely dark room, screen glowing with a single red notification bubble, dramatic red rim lighting, shallow depth of field, blurred dark background, premium tech product photography, editorial quality, high contrast black and red color palette, photorealistic. No readable text on screen, no visible human face, no logos. Portrait orientation.`,
  },
  {
    nome: 'foto-site',
    prompt: `Professional commercial photograph of a modern laptop on a minimalist dark wood desk, screen displaying an abstract dark website mockup with red accent elements, blurred unreadable interface, soft red side lighting, shallow depth of field, premium tech aesthetic, editorial quality, black and red color palette, photorealistic. No readable text, no visible human face, no real logos. Portrait orientation.`,
  },
  {
    nome: 'foto-whatsapp',
    prompt: `Close-up cinematic photograph of a smartphone screen glowing with abstract chat message bubbles in red and white tones, held in a dark room, shallow depth of field, dramatic single-source red lighting, premium tech product photography, editorial quality, high contrast black and red color palette, photorealistic. No readable text, no visible human face, no logos. Portrait orientation.`,
  },
  {
    nome: 'foto-crm',
    prompt: `Professional commercial photograph of a widescreen monitor on a dark minimalist desk displaying an abstract organized dashboard interface with card-style layout and red accent highlights, blurred unreadable UI, dramatic side lighting, shallow depth of field, premium tech aesthetic, editorial quality, black and red color palette, photorealistic. No visible human face, no readable text, no real logos. Portrait orientation.`,
  },
  {
    nome: 'foto-cta',
    prompt: `Cinematic photograph of a sleek dark modern office at night, subtle red ambient lighting glowing from below, empty minimalist workspace, moody atmosphere, premium editorial photography, high contrast black and red color palette, photorealistic. No visible human face, no readable text, no logos. Portrait orientation.`,
  },
];

function gerarImagem(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      n: 1,
      size: '1024x1536',
      quality: 'high',
      output_format: 'png',
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) { reject(new Error(json.error.message)); return; }
          const img = json.data[0];
          if (img.b64_json) resolve({ type: 'base64', data: img.b64_json });
          else if (img.url) resolve({ type: 'url', data: img.url });
          else reject(new Error('Sem imagem na resposta: ' + JSON.stringify(json)));
        } catch (e) { reject(e); }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

if (!API_KEY) {
  console.error('OPENAI_API_KEY não encontrada no ambiente.');
  process.exit(1);
}

console.log('Gerando fotos do carrossel via gpt-image-2...\n');

for (const foto of FOTOS) {
  try {
    console.log(`Gerando: ${foto.nome}...`);
    const result = await gerarImagem(foto.prompt);
    const filepath = path.join(OUT, `${foto.nome}.png`);

    if (result.type === 'base64') {
      fs.writeFileSync(filepath, Buffer.from(result.data, 'base64'));
    } else {
      await downloadImage(result.data, filepath);
    }
    console.log(`✓ ${foto.nome}.png`);
  } catch (err) {
    console.error(`✗ ${foto.nome}: ${err.message}`);
  }
}

console.log('\nPronto.');
