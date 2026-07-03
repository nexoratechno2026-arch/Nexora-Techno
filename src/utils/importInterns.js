import { supabase } from "../supabaseClient.js";
import internsData from "../data/interns.json" assert { type: "json" };

/**
 * Bulk import all interns from JSON to Supabase
 * Run this once to populate the database
 */
export async function importInternsToSupabase() {
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

    // Insert in batches of 100 to avoid hitting size limits
    const batchSize = 100;
    for (let i = 0; i < formattedData.length; i += batchSize) {
      const batch = formattedData.slice(i, i + batchSize);
      const { error, data } = await supabase
        .from("interns")
        .insert(batch);

      if (error) {
        console.error(`Error importing batch ${i / batchSize + 1}:`, error);
        return { success: false, error };
      }

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
