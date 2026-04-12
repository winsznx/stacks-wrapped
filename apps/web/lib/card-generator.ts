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
  const radius = 48; // 24px * scale(2)

  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(roundedCanvas.width - radius, 0);
  ctx.quadraticCurveTo(roundedCanvas.width, 0, roundedCanvas.width, radius);
  ctx.lineTo(roundedCanvas.width, roundedCanvas.height - radius);
  ctx.quadraticCurveTo(
    roundedCanvas.width,
    roundedCanvas.height,
    roundedCanvas.width - radius,
    roundedCanvas.height
  );
  ctx.lineTo(radius, roundedCanvas.height);
  ctx.quadraticCurveTo(
    0,
    roundedCanvas.height,
    0,
    roundedCanvas.height - radius
  );
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
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
