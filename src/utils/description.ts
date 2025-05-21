interface Character {
    id: number;
    name: string;
    role: string;
    description: string;
    tagline: string;
  }
  
  const characters: Record<number, Character> = {
    1: {
      id: 1,
      name: "Sarah Chen",
      role: "Emergency Management Director",
      description: "A crisis strategist committed to protecting lives and resources during emergencies, Sarah leads with precision and compassion. She ensures effective coordination, rapid response, and recovery strategies to safeguard the city. With a sharp focus on community resilience, she empowers teams to act decisively under pressure.",
      tagline: "Emergency response and resource allocation."
    },
    2: {
      id: 2,
      name: "James Rodriguez",
      role: "Chief of Police",
      description: "A stalwart guardian of public safety, James blends tactical expertise with strategic oversight to uphold law and order. He fosters community trust while deploying innovative solutions to address crime and unrest, ensuring peace and security in turbulent times.",
      tagline: "Law enforcement and public safety."
    },
    3: {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Power Grid Administrator",
      description: "A pioneering engineer with a passion for innovation, Emily ensures the seamless operation of the city's power infrastructure. She balances cutting-edge technologies with meticulous planning to deliver energy security, even in the face of unprecedented challenges.",
      tagline: "Energy systems and infrastructure stability."
    },
    4: {
      id: 4,
      name: "Michael O'Connor",
      role: "National Security Advisor",
      description: "An astute strategist, Michael anticipates and mitigates security risks to protect the city from external threats. With sharp intelligence and unwavering vigilance, he coordinates federal efforts to secure Eden's sovereignty.",
      tagline: "Threat assessment and federal coordination."
    },
    5: {
      id: 5,
      name: "Dr. Lisa Park",
      role: "Health Services Director",
      description: "A compassionate leader dedicated to community well-being, Lisa manages the city's healthcare systems with precision. She ensures access to critical medical resources, bridging the gap between public health and emergency response.",
      tagline: "Healthcare systems and public health management."
    },
    6: {
      id: 6,
      name: "Anna Liu",
      role: "Transportation Coordinator",
      description: "An innovative planner with a vision for connectivity, Anna keeps the city moving even in the toughest times. She designs resilient transit systems, ensuring efficient and equitable access to resources and mobility.",
      tagline: "Transportation systems and logistics."
    },
    7: {
      id: 7,
      name: "David Kim",
      role: "Environmental Protection Specialist",
      description: "A passionate advocate for sustainability, David safeguards the city's natural resources while mitigating environmental risks. He champions green initiatives and disaster-resilient practices to ensure a harmonious balance between urban life and nature.",
      tagline: "Sustainability and environmental resilience."
    },
    8: {
      id: 8,
      name: "Sophia Martinez",
      role: "Urban Planner",
      description: "A visionary architect of urban harmony, Sophia designs inclusive, sustainable spaces that foster community growth. Her innovative plans balance development and preservation, paving the way for a resilient and vibrant future.",
      tagline: "City design and infrastructure planning."
    },
    9: {
      id: 9,
      name: "Robert Patel",
      role: "Economic Development Officer",
      description: "A dynamic economist, Robert drives sustainable growth by fostering innovation and economic stability. He navigates challenges with strategic investments and initiatives, empowering businesses and individuals to thrive.",
      tagline: "Economic growth and resource optimization."
    },
    10: {
      id: 10,
      name: "Emma Thompson",
      role: "Education Services Director",
      description: "A dedicated educator, Emma champions lifelong learning by adapting to the needs of the community. She fosters innovation in education systems to ensure access, equity, and resilience, even during crises.",
      tagline: "Education access and community learning."
    }
  };
  
  export function getCharacter(id: number): Character {
    const character = characters[id];
    if (!character) {
      throw new Error(`No character found with id: ${id}`);
    }
    return character;
  }
  
  export function getAllCharacters(): Character[] {
    return Object.values(characters);
  }