// data/taskProtocols.js

export default [
  {
    id: "make_bed",
    title: "Make Your Bed",
    type: "microtask",
    steps: [
      "Pull the blanket halfway up — easy win first.",
      "Smooth the pillows. Don’t overthink symmetry.",
      "Take a deep breath; this is your cognitive reset.",
      "Finish the edges. Bask in 10 seconds of victory.",
    ],
    voiceAnchors: [
      "Tiny wins, big dopamine.",
      "Your environment just mirrored your mind’s order."
    ],
    reinforcement: [
      "Micro-mastery complete. You’re reprogramming habit circuitry."
    ]
  },
  {
    id: "clean_kitchen",
    title: "Clean the Kitchen",
    type: "ritual",
    steps: [
      "Pick one dish. Just one.",
      "Rinse it, feel the water — sensory anchor.",
      "Stack it. Momentum engaged.",
      "Now wipe one surface. That’s the completion cue."
    ],
    reinforcement: [
      "Focus beats frenzy. You’re rewiring impulse control right now."
    ]
  },
  {
    id: "shop_walmart",
    title: "Trip to Walmart",
    type: "focus_loop",
    focusAnchors: [
      "Your cart is a mission zone. One aisle, one target.",
      "Ignore shiny chaos. You’re here for the list.",
      "Beat your baseline by leaving one distraction unbought."
    ],
    reflectionPrompt: [
      "Did you buy fewer distractions than last time? That’s the win."
    ]
  },
  {
    id: "laundry",
    title: "Laundry Launch Sequence",
    type: "microtask",
    steps: [
      "Find the pile. Don’t judge it. Just find it.",
      "Touch one piece of clothing. That’s activation.",
      "Sort one color group. Micro-focus engaged.",
      "Press start — and that’s a ritual complete."
    ],
    reinforcement: [
      "You triggered your ‘action bias.’ That’s the secret neurochemical move."
    ]
  },
  {
    id: "grounding_breath",
    title: "Grounding Breath",
    type: "mind_reset",
    steps: [
      "Inhale through the nose for four counts.",
      "Hold for two.",
      "Exhale slowly through the mouth for six.",
      "Repeat once. You’re here again."
    ],
    reinforcement: [
      "Heart rate stabilized. Cognitive load reset."
    ]
  }
];

