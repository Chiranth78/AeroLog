import type {
  AppSeed,
  AttendanceEntry,
  DailyLog,
  LearningTopic,
  NotificationItem,
  User
} from "./types.js";
const day = 24 * 60 * 60 * 1000;

const isoDate = (offset: number) => new Date(Date.now() + offset * day).toISOString();
const dateOnly = (offset: number) => isoDate(offset).slice(0, 10);

export const users: User[] = [
  {
    id: "u-admin",
    name: "Aarav Sharma",
    email: "aarav@aerodesign.team",
    password: "admin123",
    role: "admin",
    domain: "Simulation",
    year: "Final Year",
    batch: "2026",
    teamRole: "Program Director",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    bio: "Coordinates program reviews, performance and mentor alignment.",
    joinedAt: isoDate(-400),
    phone: "+91 98765 11111",
    status: "active"
  },
  {
    id: "u-lead-aero",
    name: "Nisha Reddy",
    email: "nisha@aerodesign.team",
    password: "lead123",
    role: "lead",
    domain: "Aerodynamics",
    year: "Third Year",
    batch: "2027",
    teamRole: "Aerodynamics Lead",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    bio: "Owns airfoil validation, CFD review, and junior study plans.",
    joinedAt: isoDate(-320),
    phone: "+91 98765 22222",
    status: "active"
  },
  {
    id: "u-lead-struct",
    name: "Vihaan Patel",
    email: "vihaan@aerodesign.team",
    password: "lead123",
    role: "lead",
    domain: "Structures",
    year: "Final Year",
    batch: "2026",
    teamRole: "Structures Lead",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    bio: "Drives fuselage load cases, design reviews, and build readiness.",
    joinedAt: isoDate(-310),
    phone: "+91 98765 33333",
    status: "active"
  },
  {
    id: "u-member-cad",
    name: "Meera Iyer",
    email: "meera@aerodesign.team",
    password: "member123",
    role: "member",
    domain: "CAD",
    year: "Second Year",
    batch: "2028",
    teamRole: "Junior CAD Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    bio: "Improving parametric design workflow and manufacturability checks.",
    joinedAt: isoDate(-210),
    phone: "+91 98765 44444",
    status: "active"
  },
  {
    id: "u-member-electronics",
    name: "Kabir Singh",
    email: "kabir@aerodesign.team",
    password: "member123",
    role: "member",
    domain: "Electronics",
    year: "Second Year",
    batch: "2028",
    teamRole: "Avionics Member",
    avatarUrl: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
    bio: "Works on telemetry validation, wiring quality, and test logging.",
    joinedAt: isoDate(-180),
    phone: "+91 98765 55555",
    status: "inactive"
  },
  {
    id: "u-member-propulsion",
    name: "Sana Khan",
    email: "sana@aerodesign.team",
    password: "member123",
    role: "member",
    domain: "Propulsion",
    year: "Third Year",
    batch: "2027",
    teamRole: "Propulsion Member",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    bio: "Handles propulsion benchmarking, thrust validation and test prep.",
    joinedAt: isoDate(-230),
    phone: "+91 98765 66666",
    status: "active"
  }
];

export const logs: DailyLog[] = [
  {
    id: "log-1",
    userId: "u-lead-aero",
    date: dateOnly(-6),
    topicsStudied: ["Finite wing theory", "Lift curve slope"],
    conceptsRevised: ["Reynolds number scaling"],
    tasksCompleted: ["Reviewed CFD mesh quality", "Validated pressure contour notes"],
    toolsPracticed: ["ANSYS Fluent", "Excel"],
    researchWork: ["Compared Clark Y and NACA 4412 for low-speed performance"],
    problemsFaced: ["Inconsistent mesh inflation near wingtip"],
    hoursWorked: 5.5,
    learningSummary: "Locked the next iteration plan and assigned mesh cleanup action items to juniors.",
    status: "Completed",
    attachments: [
      {
        id: "att-1",
        type: "pdf",
        name: "mesh-observations.pdf",
        url: "/uploads/mesh-observations.pdf"
      }
    ],
    links: ["https://ntrs.nasa.gov"],
    approvalStatus: "approved",
    mentorComment: "Solid technical depth and clear delegation."
  },
  {
    id: "log-2",
    userId: "u-lead-struct",
    date: dateOnly(-5),
    topicsStudied: ["Shear force diagrams", "Composite layup basics"],
    conceptsRevised: ["Factor of safety selection"],
    tasksCompleted: ["Prepared fuselage spar checklist"],
    toolsPracticed: ["SolidWorks Simulation"],
    researchWork: ["Reviewed wing root reinforcement references"],
    problemsFaced: ["Need better assumptions for landing load case"],
    hoursWorked: 4.2,
    learningSummary: "Converted mentor comments into a more practical review template for the structures subgroup.",
    status: "Completed",
    attachments: [],
    links: ["https://www.abbottaerospace.com"],
    approvalStatus: "approved",
    mentorComment: "Good translation of theory into team process."
  },
  {
    id: "log-3",
    userId: "u-member-cad",
    date: dateOnly(-4),
    topicsStudied: ["Sketch constraints", "Parametric design intent"],
    conceptsRevised: ["Fillet strategy for manufacturable corners"],
    tasksCompleted: ["Rebuilt fuselage skeleton in CAD", "Cleaned mating references"],
    toolsPracticed: ["Fusion 360"],
    researchWork: ["Watched build tutorials for modular assemblies"],
    problemsFaced: ["Timeline failed after changing master sketch dimensions"],
    hoursWorked: 3.5,
    learningSummary: "I now understand how top-level dimensions affect downstream parts and why naming parameters matters.",
    status: "In Progress",
    attachments: [
      {
        id: "att-2",
        type: "image",
        name: "cad-progress.png",
        url: "/uploads/cad-progress.png"
      }
    ],
    links: ["https://help.autodesk.com"],
    approvalStatus: "pending-review"
  },
  {
    id: "log-4",
    userId: "u-member-propulsion",
    date: dateOnly(-3),
    topicsStudied: ["Static thrust testing", "ESC calibration basics"],
    conceptsRevised: ["Power loading"],
    tasksCompleted: ["Prepared motor comparison sheet", "Verified propeller sizing assumptions"],
    toolsPracticed: ["QGroundControl", "Google Sheets"],
    researchWork: ["Collected supplier specs for two propulsion options"],
    problemsFaced: ["Missing current draw data from one vendor"],
    hoursWorked: 4.8,
    learningSummary: "The trade-off between thrust reserve and battery mass is clearer after comparing the full propulsion stack.",
    status: "Completed",
    attachments: [],
    links: ["https://www.apcprop.com"],
    approvalStatus: "approved",
    mentorComment: "Good use of comparison criteria."
  },
  {
    id: "log-5",
    userId: "u-member-electronics",
    date: dateOnly(-2),
    topicsStudied: ["Voltage regulation basics"],
    conceptsRevised: ["Serial telemetry packets"],
    tasksCompleted: ["Mapped sensor wiring pinout"],
    toolsPracticed: ["KiCad"],
    researchWork: ["Read telemetry troubleshooting notes"],
    problemsFaced: ["Still unclear on noise isolation"],
    hoursWorked: 2.5,
    learningSummary: "I need one more revision cycle on grounding and power filtering before integration.",
    status: "Pending",
    attachments: [],
    links: ["https://www.ti.com"],
    approvalStatus: "changes-requested",
    mentorComment: "Add a clearer testing outcome and next action."
  },
  {
    id: "log-6",
    userId: "u-lead-aero",
    date: dateOnly(-1),
    topicsStudied: ["Boundary conditions", "Drag polar interpretation"],
    conceptsRevised: ["Pressure coefficient"],
    tasksCompleted: ["Reviewed junior revision checklist", "Updated aero roadmap"],
    toolsPracticed: ["Notion", "ANSYS Fluent"],
    researchWork: ["Benchmarked target L/D against past competition data"],
    problemsFaced: ["Need more reliable baseline geometry assumptions"],
    hoursWorked: 6.1,
    learningSummary: "The junior revision tracker is finally aligned with actual domain deliverables instead of generic theory notes.",
    status: "Completed",
    attachments: [],
    links: [],
    approvalStatus: "approved"
  },
  {
    id: "log-7",
    userId: "u-member-cad",
    date: dateOnly(0),
    topicsStudied: ["Assembly references", "Design tables"],
    conceptsRevised: ["Top-down modeling"],
    tasksCompleted: ["Published wing rib family", "Added parameter naming convention"],
    toolsPracticed: ["Fusion 360", "Excel"],
    researchWork: ["Studied lightweight rib patterns"],
    problemsFaced: ["Need review on naming convention for mirrored features"],
    hoursWorked: 4.3,
    learningSummary: "Today felt more structured because I could connect every CAD update to a manufacturable decision.",
    status: "Completed",
    attachments: [],
    links: ["https://www.autodesk.com/products/fusion-360/blog"],
    approvalStatus: "pending-review"
  }
];

export const attendance: AttendanceEntry[] = [
  { id: "attend-1", userId: "u-lead-aero", date: dateOnly(-6), status: "Present", markedAt: isoDate(-6) },
  { id: "attend-2", userId: "u-lead-aero", date: dateOnly(-1), status: "Present", markedAt: isoDate(-1) },
  { id: "attend-3", userId: "u-lead-struct", date: dateOnly(-5), status: "Late", markedAt: isoDate(-5) },
  { id: "attend-4", userId: "u-member-cad", date: dateOnly(-4), status: "Present", markedAt: isoDate(-4) },
  { id: "attend-5", userId: "u-member-cad", date: dateOnly(0), status: "Present", markedAt: isoDate(0) },
  { id: "attend-6", userId: "u-member-propulsion", date: dateOnly(-3), status: "Present", markedAt: isoDate(-3) },
  {
    id: "attend-7",
    userId: "u-member-electronics",
    date: dateOnly(-2),
    status: "Absent",
    reason: "Lab exam conflict",
    markedAt: isoDate(-2)
  },
  { id: "attend-8", userId: "u-admin", date: dateOnly(0), status: "Present", markedAt: isoDate(0) },
  { id: "attend-9", userId: "u-member-propulsion", date: dateOnly(0), status: "Late", markedAt: isoDate(0) },
  { id: "attend-10", userId: "u-lead-struct", date: dateOnly(0), status: "On Leave", reason: "Industry visit", markedAt: isoDate(0) }
];

export const learningTopics: LearningTopic[] = [
  {
    id: "learn-1",
    userId: "u-member-cad",
    title: "Parametric fuselage skeleton fundamentals",
    domain: "CAD",
    category: "Core CAD",
    roadmapStage: "Week 2",
    assignedBy: "u-lead-struct",
    status: "in-progress",
    revisionComplete: false,
    mentorFeedback: "Focus on naming parameters and maintaining stable references.",
    skillTags: ["Fusion 360", "Design intent", "Assemblies"]
  },
  {
    id: "learn-2",
    userId: "u-member-electronics",
    title: "Sensor grounding and noise isolation",
    domain: "Electronics",
    category: "Fundamentals",
    roadmapStage: "Week 1",
    assignedBy: "u-admin",
    status: "not-started",
    revisionComplete: false,
    mentorFeedback: "Revise grounding topologies before the next integration test.",
    skillTags: ["Grounding", "Telemetry", "Power regulation"]
  },
  {
    id: "learn-3",
    userId: "u-member-propulsion",
    title: "Propulsion system trade studies",
    domain: "Propulsion",
    category: "Analysis",
    roadmapStage: "Week 3",
    assignedBy: "u-lead-aero",
    status: "completed",
    revisionComplete: true,
    mentorFeedback: "Great comparison framing. Push this into the team selection deck.",
    skillTags: ["Motor selection", "Battery sizing", "Static thrust"],
    completedAt: isoDate(-2)
  },
  {
    id: "learn-4",
    userId: "u-lead-aero",
    title: "CFD validation checklist for juniors",
    domain: "Aerodynamics",
    category: "Mentoring",
    roadmapStage: "Week 4",
    assignedBy: "u-admin",
    status: "completed",
    revisionComplete: true,
    mentorFeedback: "Use this as the baseline mentor checklist.",
    skillTags: ["CFD", "Mentorship", "Validation"],
    completedAt: isoDate(-1)
  },
  {
    id: "learn-5",
    userId: "u-lead-struct",
    title: "Landing load case assumptions",
    domain: "Structures",
    category: "Fundamentals",
    roadmapStage: "Week 2",
    assignedBy: "u-admin",
    status: "in-progress",
    revisionComplete: false,
    mentorFeedback: "Document assumptions and connect them to material choices.",
    skillTags: ["Loads", "Composite basics", "Safety factors"]
  }
];

export const notifications: NotificationItem[] = [
  {
    id: "note-1",
    title: "Daily update reminder",
    body: "Please submit today’s technical log before 9:30 PM.",
    type: "reminder",
    createdAt: isoDate(0),
    audience: "all"
  },
  {
    id: "note-2",
    title: "Weekly review on Saturday",
    body: "Team leads should verify pending entries and add mentor comments before the review stand-up.",
    type: "announcement",
    createdAt: isoDate(-1),
    audience: "lead"
  },
  {
    id: "note-3",
    title: "Missed update alert",
    body: "Kabir has no completed submission for today and needs a fundamentals follow-up.",
    type: "alert",
    createdAt: isoDate(0),
    audience: "admin"
  },
  {
    id: "note-4",
    title: "Weekly progress summary",
    body: "Aerodynamics and Propulsion showed the strongest completion trend this week.",
    type: "summary",
    createdAt: isoDate(-1),
    audience: "all"
  }
];

export const appSeed: AppSeed = {
  users,
  logs,
  attendance,
  learningTopics,
  notifications
};
