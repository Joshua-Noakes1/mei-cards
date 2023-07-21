const { createCanvas } = require('@napi-rs/canvas');

export default async function handler(request, response) {
  // api/[name].js -> /api/lee
  // request.query.name -> "lee"

  // do canvas stuff
  const canvas = createCanvas(300, 320)
  const ctx = canvas.getContext('2d')

  ctx.lineWidth = 10
  ctx.strokeStyle = '#03a9f4'
  ctx.fillStyle = '#03a9f4'

  // Wall
  ctx.strokeRect(75, 140, 150, 110)

  // Door
  ctx.fillRect(130, 190, 40, 60)

  // Roof
  ctx.beginPath()
  ctx.moveTo(50, 140)
  ctx.lineTo(150, 60)
  ctx.lineTo(250, 140)
  ctx.closePath()
  ctx.stroke()

  response.setHeader('Content-Type', 'image/png');
  const pngCanvas = await canvas.encode('png');
  return response.end(pngCanvas);

  const { game } = request.query;
  return response.end(`Hello ${game}!`);
}