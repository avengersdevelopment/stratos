export interface IOption {
  option: string;
  url: string;
  title: string;
  description: string;
  type: string;
}

export interface IStory {
  id: string;
  title: string;
  description: string;
  options: IOption[];
}

export const stories: IStory[] = [
  {
    id: "presidential-crisis",
    title: "Presidential Crisis",
    description:
      "A catastrophic blackout plunges Metropolis into chaos. As President, you must manage the crisis and uncover the sabotage source. The city is on the brink of disaster.",
    options: [
      {
        option: "Focus on Internal Investigation",
        url: "/chatbot/internal-investigation",
        title: "",
        description: "",
        type: "Good",
      },
      {
        option: "Prioritize External Defense",
        url: "/chatbot/external-defense",
        title: "",
        description: "",
        type: "Neutral",
      },
      {
        option: "Strengthen Infrastructure and Resilience",
        url: "/chatbot/strengthen-infrastructure",
        title: "",
        description: "",
        type: "Bad",
      },
    ],
  },
  {
    id: "internal-investigation",
    title: "Internal Investigation",
    description:
      "An impostor sabotages recovery efforts. Tensions rise as council members suspect each other. Uncover the truth to restore order. Trust is fragile, and time is running out.",
    options: [
      {
        option: "Investigate James Rodriguez (Chief of Police)",
        url: "",
        title: "Order Restored",
        description:
          "The investigation uncovers that James was coerced by an underground faction to destabilize the city. His arrest leads to renewed public trust and stability.",
        type: "Good",
      },
      {
        option: "Investigate Dr. Emily Watson (Power Grid Administrator)",
        url: "",
        title: "Unintended Consequences",
        description:
          "The investigation stalls progress as Emily is wrongfully accused. The true impostor exploits the delay to sabotage critical recovery efforts, pushing the city into disarray.",
        type: "Neutral",
      },
      {
        option: "Investigate Michael O'Connor (National Security Advisor)",
        url: "",
        title: "Betrayal Revealed",
        description:
          "Michael is exposed as the impostor, working with external collaborators to destabilize Eden City. His arrest prevents further sabotage and secures the city.",
        type: "Good",
      },
    ],
  },
  {
    id: "external-defense",
    title: "External Defense",
    description:
      "Focus shifts to protecting Eden City from external threats, leaving internal issues temporarily unattended. Uncover clues about the impostor. Security measures are heightened across all borders.",
    options: [
      {
        option: "Confront the External Threat",
        url: "",
        title: "The Shield Stands",
        description:
          "The confrontation exposes the external faction's role and dismantles their operations. The city stabilizes as Eden's defenses are reinforced, and public morale improves.",
        type: "Good",
      },
      {
        option: "Focus on Cybersecurity",
        url: "",
        title: "The Phantom Trail",
        description:
          "Cybersecurity measures thwart further attacks, but the external faction disappears, leaving Eden vulnerable to future threats. The city stabilizes, but the impostor remains at large.",
        type: "Neutral",
      },
      {
        option: "Reallocate Resources Internally",
        url: "",
        title: "The Siege Within",
        description:
          "Internal stability is partially restored, but the external faction uses the delay to fortify its position. Future attacks seem inevitable, and Eden remains in peril.",
        type: "Bad",
      },
    ],
  },
  {
    id: "strengthen-infrastructure",
    title: "Strengthen Infrastructure",
    description:
      "Efforts focus on restoring critical systems. Tensions rise as resources are stretched thin, delaying the impostor's identification. Infrastructure improvements are crucial for long-term resilience.",
    options: [
      {
        option: "Investigate Power Grid Anomalies",
        url: "",
        title: "The Saboteur's Circuit",
        description:
          "The investigation uncovers a mole planted by external forces to sabotage the grid. The impostor is caught, and power is restored, leading to the city's recovery.",
        type: "Good",
      },
      {
        option: "Deploy Security to Key Infrastructure",
        url: "",
        title: "The Guarded Collapse",
        description:
          "Security prevents further sabotage, but the focus on protection slows recovery efforts. The city stabilizes, but the impostor escapes, leaving lingering vulnerabilities.",
        type: "Neutral",
      },
      {
        option: "Accelerate Reconstruction Without Investigation",
        url: "",
        title: "The Fragile Rebuild",
        description:
          "Reconstruction efforts succeed, and the city begins to recover, but the impostor remains free. Their continued interference ensures the stability is short-lived.",
        type: "Bad",
      },
    ],
  },
];