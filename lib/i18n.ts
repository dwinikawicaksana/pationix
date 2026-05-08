export type Language = "id" | "en";

export interface LocalizedField {
  id: string;
  en: string;
}

export const defaultLanguage: Language = "id";

export function localize(field: LocalizedField, language: Language) {
  return field?.[language] ?? field?.id ?? "";
}
