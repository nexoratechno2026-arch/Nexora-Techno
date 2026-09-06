import { jsPDF } from "jspdf";
import QRCode from "qrcode";

/**
 * Safely load an image for jsPDF
 */
async function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Draw a crisp 5-pointed star in jsPDF
 */
function drawStar(doc, cx, cy, spikes, outerRadius, innerRadius, fillColor) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;
  const points = [];

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    points.push([x, y]);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    points.push([x, y]);
    rot += step;
  }

  const startX = points[0][0];
  const startY = points[0][1];
  const relativeLines = [];
  for (let i = 1; i < points.length; i++) {
    relativeLines.push([points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]]);
  }
  relativeLines.push([points[0][0] - points[points.length - 1][0], points[0][1] - points[points.length - 1][1]]);

  doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
  doc.lines(relativeLines, startX, startY, [1, 1], "F", true);
}

/**
 * Generate a Nexora Techno certificate PDF in the luxury gold & navy corporate style.
 * Includes official company logo, company seal, karthi sign, kapil sign, and dynamic QR verification.
 * Returns a Blob URL string.
 */
export async function generateCertificatePDF({
  name = "Participant",
  domain = "Technology",
  batchName,
  startDate,
  endDate,
  certNumber = "NT-CERT",
  projectName,
  regNo,
  college,
  role,
  type,
}) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;

  // ── Color Palette ───────────────────────────────────────────────────────────
  const NAVY = [11, 25, 44];        // #0B192C (Luxury Navy)
  const GOLD = [197, 160, 89];       // #C5A059 (Brushed Gold)
  const GOLD_DARK = [155, 115, 45];  // Shaded Gold for ribbon depth
  const SLATE = [100, 116, 139];     // #64748B
  const SLATE_DARK = [30, 41, 59];   // #1E293B

  // ── 1. Pristine Canvas & Subtle Geometric Grid Watermark ────────────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");

  doc.setDrawColor(242, 245, 248);
  doc.setLineWidth(0.18);
  const gridSize = 11;
  for (let x = 14; x <= W - 14; x += gridSize) {
    doc.line(x, 12, x, H - 12);
  }
  for (let y = 12; y <= H - 12; y += gridSize) {
    doc.line(14, y, W - 14, y);
  }

  // ── 2. Dual Luxury Framing Borders & Corner Accents ─────────────────────────
  // Outer Navy Border
  doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setLineWidth(1.15);
  doc.rect(10, 8, W - 20, H - 16);

  // Inner Gold Border
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.55);
  doc.rect(13, 11, W - 26, H - 22);

  // Corner Art-Deco Geometric Diagonal Triples
  const corners = [
    { x: 10, y: 8, dx: 1, dy: 1 },         // Top-Left
    { x: W - 10, y: 8, dx: -1, dy: 1 },    // Top-Right
    { x: 10, y: H - 8, dx: 1, dy: -1 },    // Bottom-Left
    { x: W - 10, y: H - 8, dx: -1, dy: -1 } // Bottom-Right
  ];

  corners.forEach(({ x, y, dx, dy }) => {
    [11, 15, 19].forEach((off, idx) => {
      const isNavy = idx === 1;
      doc.setDrawColor(isNavy ? NAVY[0] : GOLD[0], isNavy ? NAVY[1] : GOLD[1], isNavy ? NAVY[2] : GOLD[2]);
      doc.setLineWidth(isNavy ? 0.6 : 0.4);
      doc.line(x, y + dy * off, x + dx * off, y);
    });
  });

  // ── 3. Top Header Branding & Company Logo ───────────────────────────────────
  const logoImg = (await loadImage("/nt_symbol_clean.png")) || (await loadImage("/NT Logo (2).jpeg"));
  if (logoImg) {
    const sW = 18;
    const sH = 13.8;
    doc.addImage(logoImg, "PNG", W / 2 - sW / 2, 14, sW, sH);
  } else {
    // Vector fallback apex emblem
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.setLineWidth(0.7);
    doc.lines([[4.5, 3.8], [-1.2, 5.2], [-6.6, 0], [-1.2, -5.2], [4.5, -3.8]], W / 2, 17.5, [1, 1], "S", true);
    doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
    doc.circle(W / 2, 22.8, 0.85, "F");
  }

  // Company Name
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("N E X O R A   T E C H N O", W / 2, 33, { align: "center" });

  // Subtitle
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.text("INNOVATION & PROFESSIONAL DEVELOPMENT", W / 2, 37.2, { align: "center" });

  // ── 4. Certificate Title ───────────────────────────────────────────────────
  const isWebinar =
    (type && type.toLowerCase() === "webinar") ||
    (batchName && batchName.toLowerCase().includes("webinar")) ||
    (certNumber && certNumber.toUpperCase().includes("WEB"));

  const certTitle = isWebinar ? "CERTIFICATE OF PARTICIPATION" : "CERTIFICATE OF COMPLETION";
  const spacedTitle = certTitle.split("").join(" ");

  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("times", "bold");
  doc.setFontSize(19);
  doc.text(spacedTitle, W / 2, 48.5, { align: "center" });

  // Small Gold Dot Divider
  doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.circle(W / 2, 52.2, 0.75, "F");

  // "THIS IS PROUDLY PRESENTED TO"
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("T H I S   I S   P R O U D L Y   P R E S E N T E D   T O", W / 2, 57.5, { align: "center" });

  // ── 5. Recipient Name ───────────────────────────────────────────────────────
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("times", "bolditalic");
  doc.setFontSize(30);
  doc.text(name, W / 2, 71.5, { align: "center" });

  // Underline beneath recipient name
  const nameWidth = doc.getTextWidth(name);
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.6);
  doc.line(W / 2 - nameWidth / 2 - 4, 75, W / 2 + nameWidth / 2 + 4, 75);

  // ── 6. Recipient Affiliation / College ─────────────────────────────────────
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
  if (college && college.trim()) {
    affiliationParts.push(college.trim().toUpperCase());
  }
  if (affiliationParts.length > 0) {
    const affiliationLine = affiliationParts.join("  ·  ");
    let affFontSize = 8.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(affFontSize);
    if (doc.getTextWidth(affiliationLine) > W - 50) {
      affFontSize = 7.2;
      doc.setFontSize(affFontSize);
    }
    doc.setTextColor(SLATE_DARK[0], SLATE_DARK[1], SLATE_DARK[2]);
    doc.text(affiliationLine, W / 2, 81.5, { align: "center" });
  }

  // ── 7. Narrative / Body Text ───────────────────────────────────────────────
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  const introText = isWebinar
    ? (isStaff ? "for actively participating in the technical live webinar on" : "for successfully participating in the technical live webinar on")
    : "for successfully completing the internship program in";
  doc.text(introText, W / 2, 93, { align: "center" });

  // Domain / Topic Highlight
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(`“${domain}”`, W / 2, 101.5, { align: "center" });

  // Organization & Date Line
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);

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
    ? `Organized by Nexora Techno on ${dateText}`
    : `at Nexora Techno · ${batchName || "Internship"} · ${dateText}`;

  doc.text(orgLine, W / 2, 108.5, { align: "center" });

  if (projectName) {
    doc.setTextColor(SLATE_DARK[0], SLATE_DARK[1], SLATE_DARK[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`Project: ${projectName}`, W / 2, 114.5, { align: "center" });
  }

  // ── 8. Bottom Three-Column Section ─────────────────────────────────────────

  // ── Column A: QR Code & Verification Identifiers ──────────
  const qrUrl = `https://nexoratechno.in/verify?certId=${encodeURIComponent(certNumber)}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(qrUrl, {
      margin: 1,
      width: 160,
      color: { dark: "#0B192C", light: "#FFFFFF" },
    });
    doc.addImage(qrDataUrl, "PNG", 24, 135, 18, 18);
  } catch (e) {
    doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
    doc.rect(24, 135, 18, 18);
  }

  // Metadata labels & values
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.text("CERTIFICATE ID", 46, 140);

  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(certNumber, 46, 145);

  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.text(isStaff ? "STAFF ID" : "REGISTRATION NO", 46, 151);

  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(regNo || "N/A", 46, 156);

  // Authenticity text & issue date below QR
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.text("Verify authenticity at: nexoratechno.in/verify", 24, 161.5);

  const issuedOnDate = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  doc.text(`Issued on: ${issuedOnDate}`, 24, 165.8);

  // ── Column B: Signatures & Company Seal ───────────────────
  // 1. Karthikeyan A (Project Manager)
  const sig1X = 208;
  const sig1LineY = 154;
  doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setLineWidth(0.45);
  doc.line(sig1X - 18, sig1LineY, sig1X + 18, sig1LineY);

  const karthiSignImg = await loadImage("/karthi_sign_clean.png");
  if (karthiSignImg) {
    doc.addImage(karthiSignImg, "PNG", sig1X - 12, sig1LineY - 14, 24, 13);
  } else {
    doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(16);
    doc.text("Karthikeyan", sig1X, sig1LineY - 4, { align: "center" });
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Karthikeyan A", sig1X, sig1LineY + 4.5, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFontSize(6.5);
  doc.text("Project Manager", sig1X, sig1LineY + 8, { align: "center" });

  // 2. Kapil JS (Founder & CEO) with Company Seal & Signature
  const sig2X = 254;
  const sig2LineY = 154;
  doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setLineWidth(0.45);
  doc.line(sig2X - 18, sig2LineY, sig2X + 18, sig2LineY);

  // Official Company Rubber Stamp Top ("For NEXORA TECHNO")
  const sealTopImg = await loadImage("/company_seal_top.png");
  if (sealTopImg) {
    doc.addImage(sealTopImg, "PNG", sig2X - 17, sig2LineY - 15.5, 34, 4.5);
  }

  // Kapil Signature (Medium size, cropped tightly to ink)
  const kapilSignImg = await loadImage("/kapil_sign_clean.png");
  if (kapilSignImg) {
    doc.addImage(kapilSignImg, "PNG", sig2X - 13.5, sig2LineY - 10.2, 27, 9.5);
  } else {
    doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(16);
    doc.text("Kapil JS", sig2X, sig2LineY - 4, { align: "center" });
  }

  // Official Company Rubber Stamp Bottom ("PROPRIETOR.")
  const sealBottomImg = await loadImage("/company_seal_bottom.png");
  if (sealBottomImg) {
    doc.addImage(sealBottomImg, "PNG", sig2X - 10, sig2LineY + 1.2, 20, 2.3);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.text("Kapil JS", sig2X, sig2LineY + 6.8, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFontSize(6.5);
  doc.text("Founder & CEO", sig2X, sig2LineY + 10.5, { align: "center" });

  // ── 9. Official Footer ──────────────────────────────────────────────────────
  doc.setTextColor(SLATE[0], SLATE[1], SLATE[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.text(
    "nexoratechno.in    |    nexoratechno2026@gmail.com    |    Salem, Tamil Nadu    (MSME Registered Micro-Enterprise)",
    W / 2,
    191,
    { align: "center" }
  );

  const blob = doc.output("blob");
  return URL.createObjectURL(blob);
}

/**
 * Trigger a PDF download directly
 */
export function downloadCertificatePDF(doc, filename = "certificate.pdf") {
  doc.save(filename);
}
