import * as XLSX from "xlsx";

const csvEscape = (value: unknown) => `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;

export const toCsv = (rows: Record<string, unknown>[]) => {
  if (rows.length === 0) {
    return "";
  }

  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(","))
  ];

  return lines.join("\n");
};

export const toWorkbookBuffer = (sheets: Array<{ name: string; rows: Record<string, unknown>[] }>) => {
  const workbook = XLSX.utils.book_new();

  for (const sheet of sheets) {
    const worksheet = XLSX.utils.json_to_sheet(sheet.rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
  }

  return XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer"
  });
};
