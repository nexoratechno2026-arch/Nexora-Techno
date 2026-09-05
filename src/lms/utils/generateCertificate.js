import { jsPDF } from "jspdf";

/**
 * Generate a Nexora Techno internship completion certificate PDF.
 * Returns a Blob URL string.
 */
export async function generateCertificatePDF({ name, domain, batchName, startDate, endDate, certNumber, projectName }) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;

  // ── Background ──────────────────────────────────────────────────────────────
  // White background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");

  // Subtle border frame
  doc.setDrawColor(14, 165, 233); // sky-500
  doc.setLineWidth(1.5);
  doc.rect(10, 10, W - 20, H - 20);

  // Inner border
  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.4);
  doc.rect(14, 14, W - 28, H - 28);

  // Top accent bar
  doc.setFillColor(14, 165, 233);
  doc.rect(10, 10, W - 20, 3, "F");

  // Bottom accent bar
  doc.rect(10, H - 13, W - 20, 3, "F");

  // ── Logo area (top left) ─────────────────────────────────────────────────
  try {
    const logoImg = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = "/Logo.jpeg"; // Assuming Logo.jpeg is in public/
    });
    // Draw the logo (adjusting coordinates and size)
    doc.addImage(logoImg, "JPEG", 20, 25, 20, 20);
  } catch (e) {
    // Fallback if logo cannot load
    doc.setFillColor(14, 165, 233, 0.15);
    doc.circle(30, 35, 12, "F");
    doc.setTextColor(14, 165, 233);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("N", 27, 38);
  }

  // Company name
  doc.setTextColor(14, 165, 233);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("NEXORA TECHNO", 45, 33);
  doc.setTextColor(71, 85, 105); // slate-500
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("IT Software Company · Salem, Tamil Nadu", 45, 39);

  // ── Certificate title ────────────────────────────────────────────────────
  doc.setTextColor(14, 165, 233);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICATE OF COMPLETION", W / 2, 52, { align: "center" });

  // Decorative line under title
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.8);
  doc.line(W / 2 - 45, 55, W / 2 + 45, 55);

  // ── Presented to ────────────────────────────────────────────────────────
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("This is to certify that", W / 2, 70, { align: "center" });

  // Intern name (large)
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text(name, W / 2, 88, { align: "center" });

  // Underline name
  const nameWidth = doc.getTextWidth(name);
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - nameWidth / 2, 91, W / 2 + nameWidth / 2, 91);

  // ── Body text ────────────────────────────────────────────────────────────
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    "has successfully completed the internship program in",
    W / 2, 102, { align: "center" }
  );

  // Domain highlight
  doc.setTextColor(14, 165, 233);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(domain, W / 2, 114, { align: "center" });

  // Duration
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const formattedStart = new Date(startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const formattedEnd = new Date(endDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  
  let dateText = `${formattedStart} to ${formattedEnd}`;
  if (formattedStart === formattedEnd) {
    dateText = formattedStart;
  }
  
  doc.text(
    `at Nexora Techno · ${batchName} · ${dateText}`,
    W / 2, 124, { align: "center" }
  );

  if (projectName) {
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Project: ${projectName}`, W / 2, 132, { align: "center" });
  }

  // ── Bottom row: Cert ID + Verification + Signatures ───────────────────────────────
  // Left: cert number
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("Certificate ID", 25, 155);
  doc.setTextColor(14, 165, 233);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(certNumber, 25, 161);

  // Center: Karthikeyan A signature line
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.4);
  doc.line(W/2 - 35, 163, W/2 + 35, 163);

  try {
    const karthikImg = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = "/Karthi Sign.png";
    });
    doc.addImage(karthikImg, "PNG", W/2 - 25, 142, 50, 20);
  } catch (e) {
    doc.setTextColor(14, 165, 233);
    doc.setFontSize(22);
    doc.setFont("times", "italic");
    doc.text("Karthikeyan A", W/2, 158, { align: "center" });
  }

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("Karthikeyan A, Project Manager", W/2, 168, { align: "center" });

  // Far-Right: Kapil JS signature line
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.4);
  doc.line(W - 85, 163, W - 15, 163);

  try {
    const kapilImg = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = "/Kapil Sign.png";
    });
    doc.addImage(kapilImg, "PNG", W - 75, 142, 50, 20);
  } catch (e) {
    doc.setTextColor(14, 165, 233);
    doc.setFontSize(22);
    doc.setFont("times", "italic");
    doc.text("Kapil JS", W - 50, 158, { align: "center" });
  }

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("Kapil JS, Founder & CEO", W - 50, 168, { align: "center" });

  // Center: Verification Link & Issue Date
  doc.setTextColor(14, 165, 233);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Verify authenticity at: nexoratechno.in/verify", W / 2, 175, { align: "center" });


  // Issue date bottom center
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7);
  const issuedOn = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  doc.text(`Issued on: ${issuedOn}`, W / 2, 178, { align: "center" });

  // ── Footer ───────────────────────────────────────────────────────────────
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("nexoratechno.in · nexoratechno2026@gmail.com · Salem, Tamil Nadu · MSME Registered", W / 2, H - 7, { align: "center" });

  const blob = doc.output("blob");
  return URL.createObjectURL(blob);
}

/**
 * Trigger a PDF download directly
 */
export function downloadCertificatePDF(doc, filename = "certificate.pdf") {
  doc.save(filename);
}
