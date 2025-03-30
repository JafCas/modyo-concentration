export type CardEntry = {
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

export const entriesSample = [
  {
    meta: {
      name: "bear",
      slug: "bear",
      tags: [],
      type: "game",
      uuid: "a4452fe5-ca10-4b35-ad7a-62fc44c60d27",
      space: "animals",
    },
    fields: {
      image: {
        url: "https://cdn.modyo.cloud/uploads/f0753a4f-87b2-484d-aeb1-a22c3278cb50/original/bear.jpg",
        uuid: "f0753a4f-87b2-484d-aeb1-a22c3278cb50",
        title: "Bear",
        alt_text: null,
      },
    },
  },
  {
    meta: {
      name: "bird",
      slug: "bird",
      tags: [],
      type: "game",
      uuid: "e5a7f1c5-c8dd-43f5-a87b-12bf01b684ba",
      space: "animals",
    },
    fields: {
      image: {
        url: "https://cdn.modyo.cloud/uploads/651e2381-dc33-43fc-8762-58079ffb36d1/original/bird.jpg",
        uuid: "651e2381-dc33-43fc-8762-58079ffb36d1",
        title: "Bird",
        alt_text: null,
      },
    },
  },
];
