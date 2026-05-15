import type { Metadata } from "next";
import { MedicalReferencePage } from "@/components/medical-reference-page";
import { getOutbreak, getSourcesByIds } from "@/lib/outbreak";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Where Does Hantavirus Come From?",
  description:
    "Hantavirus origin explained: rodent reservoirs, contaminated dust, Andes virus in South America, and what is known about the MV Hondius exposure context.",
  alternates: { canonical: canonical("/origin") },
  openGraph: {
    title: "Where Does Hantavirus Come From?",
    description:
      "Rodent reservoirs, contaminated dust, Andes virus context, and the MV Hondius exposure question.",
    url: canonical("/origin"),
    type: "article",
  },
};

const faq = [
  {
    question: "Where does hantavirus usually come from?",
    answer:
      "Hantaviruses are maintained in rodent reservoirs. People are usually exposed through rodent urine, droppings, saliva, nesting material, or contaminated dust.",
  },
  {
    question: "Did the MV Hondius outbreak start on the ship?",
    answer:
      "Public sources identify the MV Hondius-linked cluster and voyage timeline, but this tracker does not assert a precise exposure location unless official sources do.",
  },
  {
    question: "Is Andes virus linked to South America?",
    answer:
      "Yes. CDC describes Andes virus as a South American hantavirus, and WHO identified confirmed MV Hondius cases as Andes virus.",
  },
  {
    question: "Can a person get hantavirus from another person?",
    answer:
      "For most hantaviruses, person-to-person spread is not the usual route. Andes virus is the exception with documented limited spread after close contact.",
  },
];

export default function HantavirusOriginPage() {
  const data = getOutbreak();
  const sources = getSourcesByIds([
    "src-cdc-hantavirus",
    "src-cdc-andes",
    "src-cdc-prevention",
    "src-who-don-2026-05-08",
    "src-ecdc-outbreak-2026-05-14",
  ]);

  return (
    <MedicalReferencePage
      path="/origin"
      eyebrow="Origin guide"
      title="Where Does Hantavirus Come From?"
      description={metadata.description as string}
      intro="Most hantavirus infections begin with rodent exposure. For MV Hondius, public sources confirm an Andes virus cluster but do not make every exposure detail public."
      data={data}
      sources={sources}
      faq={faq}
      facts={[
        {
          label: "Main source",
          value: "Rodents",
          description: "Urine, droppings, saliva, nests, or dust",
        },
        {
          label: "MV Hondius",
          value: "Andes",
          description: "WHO identified the confirmed strain",
          tone: "amber",
        },
        {
          label: "P2P spread",
          value: "Rare",
          description: "Documented for Andes virus only",
          tone: "red",
        },
        {
          label: "Precision",
          value: "Limited",
          description: "Exact exposure site is not always public",
        },
      ]}
      condition={{
        name: "Hantavirus disease",
        alternateName: ["Andes virus infection", "Hantavirus pulmonary syndrome"],
        transmissionMethod: [
          "Rodent urine, droppings, saliva, and nesting material",
          "Contaminated dust",
          "Rare close contact transmission for Andes virus",
        ],
      }}
      sections={[
        {
          id: "rodent-origin",
          title: "The Usual Origin: Infected Rodents",
          subtitle: "Reservoirs and Contaminated Dust",
          children: (
            <>
              <p>
                Hantaviruses are carried by infected rodents. People are usually exposed when
                rodent waste or nesting material contaminates dust, enclosed spaces, tools, cabins,
                sheds, or other environments.
              </p>
              <p>
                That is why prevention guidance focuses on avoiding dust-generating cleanup and
                using safe rodent-control practices.
              </p>
            </>
          ),
        },
        {
          id: "mv-hondius",
          title: "MV Hondius Exposure Context",
          subtitle: "What Public Sources Do and Do Not Say",
          children: (
            <>
              <p>
                Public updates identify a cluster linked to MV Hondius passengers and crew and say
                confirmed cases were Andes virus. They do not make every possible exposure location
                or contact chain public.
              </p>
              <p>
                This tracker therefore avoids assigning a precise origin point unless an official
                source states it directly.
              </p>
            </>
          ),
        },
        {
          id: "south-america",
          title: "Why South America Appears in This Outbreak",
          subtitle: "Andes Virus Context",
          children: (
            <p>
              Andes virus is described by CDC as a South American hantavirus. The MV Hondius voyage
              departed Ushuaia, Argentina, before the cluster was identified, but departure location
              alone is not proof of the precise exposure site.
            </p>
          ),
        },
      ]}
      related={[
        { href: "/rodents", label: "Which rodents carry hantavirus" },
        { href: "/prevention", label: "Prevention and cleanup guidance" },
        { href: "/cruise/mv-hondius", label: "MV Hondius outbreak tracker" },
      ]}
    />
  );
}
