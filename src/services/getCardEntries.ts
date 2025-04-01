export type Card = {
  meta: CardMeta;
  fields: CardFields;
};

export type CardMeta = {
  name: string;
  slug: string;
  tags: string[];
  type: string;
  uuid: string;
  space: string;
};

export type CardFields = {
  image: {
    url: string;
    uuid: string;
    title: string;
    alt_text: string | null;
  };
};

export const getCardEntries = async (entries: number): Promise<Card[]> => {
  const apiUrl = process.env.REACT_APP_MODYO_URL as string;
  const response = await fetch(
    `${apiUrl}/api/content/spaces/animals/types/game/entries?per_page=${entries}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch card entries");
  }
  const data = await response.json();
  return data.entries;
};
