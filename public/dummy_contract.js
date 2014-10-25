var data = {
  id: "something",
  name: "name of the radar" ,
  description: "description of the radar",
  template: {
    id: "some-id",
    segments: [{id:"id-segment", name:"techniques"}, {id:"some-id", name:"languages"}, {id:"languages", name:"languages"}, {id:"languages", name:"languages"}],
    tiers: [{id:"hold", name:"hold", description: "something"}, {id:"assess", name:"assess", description: "something"}, {id:"trial", name:"trial", description: "something"}]
  },
  blips: [
    {
      id: "some-blip-id",
      name: "clojure1",
      description: "some cool language",

      segment: "some-id",
      tier: "assess"
    },
      {
          id: "some-blip-id",
          name: "clojure2",
          description: "some cool language",

          segment: "id-segment",
          tier: "hold"
      },
      {
          id: "some-blip-id",
          name: "clojure3",
          description: "some cool language",

          segment: "id-segment",
          tier: "assess"
      },
      {
          id: "some-blip-id",
          name: "clojure7",
          description: "some cool language",

          segment: "id-segment",
          tier: "trial"
      },
      {
          id: "some-blip-id",
          name: "clojure6",
          description: "some cool language",

          segment: "id-segment",
          tier: "assess"
      }
  ]
};
