function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.quadraticCurveTo(width, 0, width, radius);
  ctx.lineTo(width, height - radius);
  ctx.quadraticCurveTo(width, height, width - radius, height);
  ctx.lineTo(radius, height);
  ctx.quadraticCurveTo(0, height, 0, height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
}

const MAX_CANVAS_SIZE = 4096;

export async function generateWrappedCardPNG(
  elementId: string
): Promise<Blob> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
  });

  const roundedCanvas = document.createElement("canvas");
  roundedCanvas.width = canvas.width;
  roundedCanvas.height = canvas.height;
  const ctx = roundedCanvas.getContext("2d")!;
  const radius = 48;

  drawRoundedRect(ctx, roundedCanvas.width, roundedCanvas.height, radius);
  ctx.clip();
  ctx.drawImage(canvas, 0, 0);

  return new Promise<Blob>((resolve, reject) => {
    roundedCanvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Canvas toBlob failed")),
      "image/png"
    );
  });
}
