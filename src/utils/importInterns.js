import { db } from "../firebase.js";
import { collection, doc, writeBatch } from "firebase/firestore";
import internsData from "../data/interns.json" assert { type: "json" };

/**
 * Bulk import all interns from JSON to Firebase
 * Run this once to populate the database
 */
export async function importInternsToFirebase() {
  try {
    console.log(`Starting import of ${internsData.length} interns...`);

    // Prepare data with required fields
    const formattedData = internsData.map(intern => ({
      id: intern.id,
      name: intern.name,
      department: intern.department,
      program: getDepartmentProgram(intern.department),
      status: "Completed",
      completionDate: new Date().toISOString().split('T')[0],
      duration: "05/05/2026 - 25/05/2026",
    }));

    // Insert in batches of 400 to avoid hitting size limits
    const batchSize = 400;
    for (let i = 0; i < formattedData.length; i += batchSize) {
      const chunk = formattedData.slice(i, i + batchSize);
      const batch = writeBatch(db);
      chunk.forEach(intern => {
        const docRef = doc(collection(db, "interns"));
        batch.set(docRef, intern);
      });
      await batch.commit();

      console.log(`✅ Imported ${Math.min(i + batchSize, formattedData.length)}/${formattedData.length} records`);
    }

    console.log("✅ Import completed successfully!");
    return { success: true, count: formattedData.length };

  } catch (err) {
    console.error("Import failed:", err);
    return { success: false, error: err };
  }
}

function getDepartmentProgram(dept) {
  const programMap = {
    "FS": "Full Stack Development",
    "UD": "UI/UX Development",
    "PE": "Prompt Engineering & AI/ML",
  };
  return programMap[dept] || "Full Stack Development";
}
