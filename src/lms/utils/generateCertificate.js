import { jsPDF } from "jspdf";

/**
 * Generate a Nexora Techno internship completion certificate PDF.
 * Returns a Blob URL string.
 */
export async function generateCertificatePDF({
  name,
  domain,
  batchName,
  startDate,
  endDate,
  certNumber,
  projectName,
  regNo,
  college,
  role,
  type,
}) {
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

  // ── Certificate type & title determination ──────────────────────────────
  const isWebinar =
    (type && type.toLowerCase() === "webinar") ||
    (batchName && batchName.toLowerCase().includes("webinar")) ||
    (certNumber && certNumber.toUpperCase().includes("WEB"));

  const certTitle = isWebinar ? "CERTIFICATE OF PARTICIPATION" : "CERTIFICATE OF COMPLETION";

  doc.setTextColor(14, 165, 233);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(certTitle, W / 2, 50, { align: "center" });

  // Decorative line under title
  const titleWidth = doc.getTextWidth(certTitle);
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.8);
  doc.line(W / 2 - titleWidth / 2 - 8, 53.5, W / 2 + titleWidth / 2 + 8, 53.5);

  // ── Presented to ────────────────────────────────────────────────────────
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("This is to certify that", W / 2, 65, { align: "center" });

  // Recipient name (large)
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text(name, W / 2, 79, { align: "center" });

  // Underline name
  const nameWidth = doc.getTextWidth(name);
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - nameWidth / 2, 82, W / 2 + nameWidth / 2, 82);

  // ── Affiliation / Academic Details (Reg No, College, Role) ───────────────
  const cleanRole = (role || "").trim();
  const isStaff =
    cleanRole &&
    (cleanRole.toLowerCase().includes("prof") ||
      cleanRole.toLowerCase().includes("staff") ||
      cleanRole.toLowerCase().includes("faculty") ||
      cleanRole.toLowerCase().includes("lecturer") ||
      cleanRole.toLowerCase().includes("hod") ||
      cleanRole.toLowerCase().includes("teacher"));

  let affiliationParts = [];
  if (isStaff) {
    const roleDisplay = cleanRole.toLowerCase() === "staff" ? "Faculty / Staff" : cleanRole;
    affiliationParts.push(roleDisplay);
    if (regNo && regNo.trim()) {
      affiliationParts.push(`(ID: ${regNo.trim()})`);
    }
  } else {
    if (cleanRole && cleanRole.toLowerCase() !== "student" && cleanRole.toLowerCase() !== "intern") {
      affiliationParts.push(cleanRole);
    }
    if (regNo && regNo.trim()) {
      affiliationParts.push(`Reg. No: ${regNo.trim()}`);
    }
  }

  if (college && college.trim()) {
    affiliationParts.push(college.trim());
  }

  if (affiliationParts.length > 0) {
    const affiliationLine = affiliationParts.join("  ·  ");
    let affFontSize = 9.5;
    doc.setFontSize(affFontSize);
    doc.setFont("helvetica", "bold");
    if (doc.getTextWidth(affiliationLine) > W - 50) {
      affFontSize = 8;
      doc.setFontSize(affFontSize);
    }
    doc.setTextColor(51, 65, 85); // slate-700
    doc.text(affiliationLine, W / 2, 91, { align: "center" });
  }

  // ── Body text ────────────────────────────────────────────────────────────
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const introText = isWebinar
    ? (isStaff ? "has actively participated in the live webinar on" : "has successfully participated in the live webinar on")
    : "has successfully completed the internship program in";

  doc.text(introText, W / 2, 101, { align: "center" });

  // Domain highlight
  doc.setTextColor(14, 165, 233);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(domain, W / 2, 112, { align: "center" });

  // Duration / Organization line
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const formattedStart = startDate
    ? new Date(startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";
  const formattedEnd = endDate
    ? new Date(endDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

  let dateText = `${formattedStart} to ${formattedEnd}`;
  if (formattedStart === formattedEnd || !endDate) {
    dateText = formattedStart;
  }

  const orgLine = isWebinar
    ? `organized by Nexora Techno on ${dateText}`
    : `at Nexora Techno · ${batchName || "Internship"} · ${dateText}`;

  doc.text(orgLine, W / 2, 122, { align: "center" });

  if (projectName) {
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Project: ${projectName}`, W / 2, 130, { align: "center" });
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
