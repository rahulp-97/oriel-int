export const services = [
  {
    title: 'International sourcing',
    tag: 'THE RIGHT ORIGIN',
    description: 'Every opportunity begins with the right product and the right partner. Start with your specifications, quality expectations, and commercial goals.',
    detail: 'Product discovery · Supplier conversations · Sample coordination',
  },
  {
    title: 'Import & export',
    tag: 'THE NEXT HORIZON',
    description: 'Bring clarity to your next cross-border opportunity. Shape a considered plan around your product, origin, destination, and delivery requirements.',
    detail: 'Trade requirements · Commercial coordination · Shipment planning',
  },
  {
    title: 'Trade partnerships',
    tag: 'THE LONG VIEW',
    description: 'A strong connection can grow beyond a single transaction. Explore a working relationship built around clear communication and shared ambition.',
    detail: 'Buyer introductions · Supplier relationships · Repeat opportunities',
  },
];

// Illustrative product directions. Replace these with your verified catalogue.
// Product availability, specifications and trade terms are confirmed per inquiry.
export const categories = [
   {
    slug: 'tmt-steel-reinforcement',
    name: 'TMT Steel & Reinforcement Products',
    examples: 'TMT bars, structural steel & construction reinforcement',
    code: '01',
    icon: 'building-2',
    introduction: 'Explore high-quality steel and reinforcement solutions designed to meet the strength, durability and structural requirements of modern construction projects.',
    editorial: 'Strong foundations begin with reliable materials, precise specifications and a commitment to lasting structural integrity.',
    items: [
      {
        name: 'TMT Steel Bars',
        description: 'Thermo-mechanically treated reinforcement bars available in various grades and diameters for residential, commercial and infrastructure construction.'
      },
      {
        name: 'Structural Steel Products',
        description: 'Steel beams, channels, angles and sections selected according to structural specifications, load requirements and project applications.'
      },
      {
        name: 'Steel Reinforcement Materials',
        description: 'Reinforcement products including steel coils, wire rods and related materials for construction and industrial applications.'
      }
    ],
    buyerBrief: [
      'Product type, steel grade and intended application',
      'Required diameter, dimensions and technical specifications',
      'Quantity, weight and preferred packaging',
      'Destination country and expected delivery schedule',
      'Applicable quality standards, testing certificates and import documentation'
    ],
  },
  {
    slug: 'medical-healthcare-equipment',
    name: 'Medical & Healthcare Equipments',
    examples: 'Diagnostic devices, hospital equipment & medical supplies',
    code: '02',
    icon: 'heart-pulse',
    introduction: 'Discover medical and healthcare equipment sourcing opportunities focused on quality, reliability and the evolving needs of healthcare providers worldwide.',
    editorial: 'Better healthcare begins with dependable equipment, thoughtful sourcing and a commitment to quality at every stage.',
    items: [
      {
        name: 'Diagnostic & Monitoring Equipment',
        description: 'Medical devices including patient monitors, ECG machines, blood pressure monitors and diagnostic equipment selected according to clinical requirements.'
      },
      {
        name: 'Hospital & Clinical Equipment',
        description: 'Hospital beds, examination tables, surgical instruments and essential clinical equipment for hospitals, clinics and healthcare facilities.'
      },
      {
        name: 'Medical Supplies & Consumables',
        description: 'Healthcare essentials including examination gloves, syringes, dressings and disposable medical products based on applicable quality and safety requirements.'
      }
    ],
    buyerBrief: [
      'Equipment name, model and intended clinical application',
      'Required technical specifications and functionality',
      'Quantity, packaging and preferred manufacturer',
      'Destination country and expected delivery timeline',
      'Applicable regulatory approvals, certifications and import documentation'
    ],
  },
  // {
  //   slug: 'food-agriculture',
  //   name: 'Food & agriculture',
  //   examples: 'Spices, grains & carefully selected ingredients',
  //   code: '01',
  //   icon: 'wheat',
  //   introduction: 'Explore ingredients and agricultural products with a brief built around the qualities your market needs.',
  //   editorial: 'Good products begin with a clear understanding of their origin, specification and intended use.',
  //   items: [
  //     { name: 'Spices & seasonings', description: 'Whole or ground formats, with origin, grade and packaging requirements defined in your brief.' },
  //     { name: 'Grains & pulses', description: 'Product varieties and formats to explore against your quality expectations and intended application.' },
  //     { name: 'Nuts & ingredients', description: 'Potential ingredient opportunities considered around product specifications, handling and destination requirements.' },
  //   ],
  //   buyerBrief: ['Product name, variety and intended use', 'Required grade, composition or quality specification', 'Quantity and preferred packaging', 'Destination and requested delivery window', 'Applicable food, labelling or documentation requirements'],
  // },
  // {
  //   slug: 'natural-materials',
  //   name: 'Natural materials',
  //   examples: 'Fibres, textiles & considered raw materials',
  //   code: '02',
  //   icon: 'leaf',
  //   introduction: 'Consider materials through the details that matter: composition, finish, consistency and the way they will be used.',
  //   editorial: 'The right material is a meeting of character, purpose and a carefully defined specification.',
  //   items: [
  //     { name: 'Natural fibres', description: 'Explore fibre compositions and formats around your intended process and product requirements.' },
  //     { name: 'Textiles & fabrics', description: 'Discuss weave, weight, finish and colour requirements before considering suitable options.' },
  //     { name: 'Raw material opportunities', description: 'Build a focused brief for materials, with dimensions, grading and end-use expectations made clear.' },
  //   ],
  //   buyerBrief: ['Material composition and intended application', 'Dimensions, weight, grade or finish', 'Required samples and acceptance criteria', 'Quantity and packing requirements', 'Destination and requested delivery window'],
  // },
  {
    slug: 'industrial-goods',
    name: 'Industrial goods',
    examples: 'Components, equipment & manufacturing inputs',
    code: '03',
    icon: 'cog',
    introduction: 'Start with the technical detail. Define the component, equipment or input your operation needs before exploring potential supply.',
    editorial: 'Practical precision starts with a shared understanding of the requirement.',
    items: [
      { name: 'Components & parts', description: 'Potential sourcing directions based on drawings, part references, tolerances and material specifications.' },
      { name: 'Equipment opportunities', description: 'Clarify performance, configuration, compatibility and support expectations within the initial brief.' },
      { name: 'Manufacturing inputs', description: 'Explore inputs against your process needs, consistency requirements and delivery priorities.' },
    ],
    buyerBrief: ['Product reference, drawing or technical specification', 'Required standards, tolerances and compatibility', 'Quantity and intended application', 'Inspection or acceptance requirements', 'Destination, packing and delivery requirements'],
  },
  {
    slug: 'consumer-essentials',
    name: 'Consumer essentials',
    examples: 'Everyday products with international potential',
    code: '04',
    icon: 'package',
    introduction: 'Explore everyday products through the needs of your customer, the expectations of your market and the details of your brand.',
    editorial: 'Everyday products can open new possibilities when the brief is thoughtfully considered.',
    items: [
      { name: 'Home & everyday goods', description: 'Product possibilities to discuss around function, materials, finish and target market.' },
      { name: 'Retail-ready formats', description: 'Consider unit sizes, assortment, presentation and packaging as part of the product brief.' },
      { name: 'Brand-led opportunities', description: 'Explore product and presentation requirements against your brand direction and commercial goals.' },
    ],
    buyerBrief: ['Product type, target customer and intended market', 'Material, finish and product specifications', 'Branding, packaging and labelling requirements', 'Order quantity and preferred assortment', 'Destination and requested delivery window'],
  },
];

export const steps = [
  { title: 'Understand', text: 'We begin with your product, market, and ambition.' },
  { title: 'Explore', text: 'Consider the possibilities and find the right fit.' },
  { title: 'Coordinate', text: 'Bring requirements, partners, and practical details together.' },
  { title: 'Move forward', text: 'Agree the next steps, with a clear path from the outset.' },
];
