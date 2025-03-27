// src/components/dashboard/tabs/roadmap/sample.ts
export interface Task {
  id: string;
  title: string;  // We don't use this in the UI but need it to identify tasks
  description: string; // We don't use this in the UI but kept for possible future use
  estimatedTime: {
    value: number;
    unit: 'days' | 'weeks' | 'months';
  };
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tasks: Task[];
  dependencies?: string[];  // IDs of milestones that this one depends on
}

export interface RoadmapData {
  projectName: string;
  projectDescription: string;
  startDate: string;
  milestones: {
    milestone1: Milestone[];
    milestone2: Milestone[];
    milestone3: Milestone[];
    milestone4: Milestone[];
  };
}

export const sampleRoadmapData: RoadmapData = {
  projectName: "Learning Platform MVP",
  projectDescription: "First version of our collaborative learning platform with core features",
  startDate: "2023-06-01",
  milestones: {
    milestone1: [
      {
        id: "ms-1",
        title: "Project Setup & Architecture",
        description: "Initialize repository, set up development environment, and define architecture. This milestone focuses on establishing the foundation for the entire project, ensuring that the team has the necessary tools and environments to work efficiently.",
        priority: "high",
        tasks: [
          { 
            id: "t-1-1", 
            title: "Create repository and project structure", 
            description: "Set up Git repository with branch protection rules",
            estimatedTime: { value: 3, unit: 'days' }
          },
          { 
            id: "t-1-2", 
            title: "Set up CI/CD pipeline", 
            description: "Configure automated testing and deployment",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-1-3", 
            title: "Define database schema", 
            description: "Design database models and relationships",
            estimatedTime: { value: 5, unit: 'days' }
          },
          { 
            id: "t-1-4", 
            title: "Create system architecture diagram", 
            description: "Document the overall system architecture",
            estimatedTime: { value: 3, unit: 'days' }
          }
        ],
        dependencies: []
      },
      {
        id: "ms-2",
        title: "Authentication System",
        description: "Implement user authentication with email and social logins. This system will provide secure access control and user identity management across the platform.",
        priority: "critical",
        tasks: [
          { 
            id: "t-2-1", 
            title: "Implement email authentication", 
            description: "Build registration, login, and verification",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-2-2", 
            title: "Add social login options", 
            description: "Integrate OAuth providers",
            estimatedTime: { value: 4, unit: 'days' }
          },
          { 
            id: "t-2-3", 
            title: "Create user profile storage", 
            description: "Implement database models for profiles",
            estimatedTime: { value: 3, unit: 'days' }
          }
        ],
        dependencies: ["ms-1"]
      }
    ],
    milestone2: [
      {
        id: "ms-3",
        title: "User Profile Management",
        description: "Build profile creation, editing, and skill assessment features. This milestone focuses on allowing users to create rich profiles showcasing their skills and learning goals.",
        priority: "high",
        tasks: [
          { 
            id: "t-3-1", 
            title: "Create profile editing interfaces", 
            description: "Build UI for profile editing",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-3-2", 
            title: "Implement skill selection system", 
            description: "Create a skill taxonomy and selection",
            estimatedTime: { value: 2, unit: 'weeks' }
          },
          { 
            id: "t-3-3", 
            title: "Build profile visibility settings", 
            description: "Implement privacy controls",
            estimatedTime: { value: 3, unit: 'days' }
          },
          { 
            id: "t-3-4", 
            title: "Add progress tracking features", 
            description: "Build learning progress visualizations",
            estimatedTime: { value: 1, unit: 'weeks' }
          }
        ],
        dependencies: ["ms-2"]
      },
      {
        id: "ms-4",
        title: "Matching Algorithm",
        description: "Develop the algorithm to match students with suitable mentors based on skills, learning goals, and availability. The matching system is a core differentiator for the platform.",
        priority: "high",
        tasks: [
          { 
            id: "t-4-1", 
            title: "Research matching algorithms", 
            description: "Investigate recommendation systems",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-4-2", 
            title: "Define matching criteria", 
            description: "Establish parameters for matching",
            estimatedTime: { value: 4, unit: 'days' }
          },
          { 
            id: "t-4-3", 
            title: "Implement matching engine", 
            description: "Build the core algorithm",
            estimatedTime: { value: 2, unit: 'weeks' }
          }
        ],
        dependencies: ["ms-3"]
      }
    ],
    milestone3: [
      {
        id: "ms-5",
        title: "Messaging System",
        description: "Build real-time messaging between mentors and students to facilitate communication and collaboration. The messaging system will support text, attachments, and code snippets.",
        priority: "medium",
        tasks: [
          { 
            id: "t-5-1", 
            title: "Set up WebSocket connections", 
            description: "Implement real-time infrastructure",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-5-2", 
            title: "Create chat UI", 
            description: "Build conversation interfaces",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-5-3", 
            title: "Implement message storage", 
            description: "Design database schema for messages",
            estimatedTime: { value: 4, unit: 'days' }
          }
        ],
        dependencies: ["ms-2"]
      },
      {
        id: "ms-6",
        title: "Virtual Classroom",
        description: "Basic implementation of the shared learning workspace with whiteboarding tools, screen sharing, and collaborative editing. This creates an interactive environment for teaching and learning.",
        priority: "medium",
        tasks: [
          { 
            id: "t-6-1", 
            title: "Research whiteboard solutions", 
            description: "Evaluate whiteboarding libraries",
            estimatedTime: { value: 5, unit: 'days' }
          },
          { 
            id: "t-6-2", 
            title: "Implement screen sharing", 
            description: "Integrate WebRTC for sharing",
            estimatedTime: { value: 2, unit: 'weeks' }
          },
          { 
            id: "t-6-3", 
            title: "Build collaborative editing", 
            description: "Implement document editing",
            estimatedTime: { value: 3, unit: 'weeks' }
          },
          { 
            id: "t-6-4", 
            title: "Create session recording", 
            description: "Add recording functionality",
            estimatedTime: { value: 1, unit: 'weeks' }
          }
        ],
        dependencies: ["ms-5"]
      }
    ],
    milestone4: [
      {
        id: "ms-7",
        title: "Testing & QA",
        description: "Comprehensive testing of all implemented features to ensure quality, security, and performance. This milestone will identify and address issues before launch.",
        priority: "critical",
        tasks: [
          { 
            id: "t-7-1", 
            title: "Write unit tests", 
            description: "Create test suite",
            estimatedTime: { value: 2, unit: 'weeks' }
          },
          { 
            id: "t-7-2", 
            title: "Perform integration testing", 
            description: "Test system components",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-7-3", 
            title: "Conduct user acceptance testing", 
            description: "Get feedback from test users",
            estimatedTime: { value: 2, unit: 'weeks' }
          },
          { 
            id: "t-7-4", 
            title: "Fix identified issues", 
            description: "Address discovered bugs",
            estimatedTime: { value: 3, unit: 'weeks' }
          }
        ],
        dependencies: ["ms-3", "ms-4", "ms-5", "ms-6"]
      },
      {
        id: "ms-8",
        title: "Deployment & Launch",
        description: "Final preparations for production deployment and public launch, including documentation, performance optimization, and setup of monitoring systems.",
        priority: "high",
        tasks: [
          { 
            id: "t-8-1", 
            title: "Optimize performance", 
            description: "Implement performance optimizations",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-8-2", 
            title: "Create documentation", 
            description: "Write user guides and docs",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          { 
            id: "t-8-3", 
            title: "Set up monitoring", 
            description: "Implement logging and alerts",
            estimatedTime: { value: 5, unit: 'days' }
          },
          { 
            id: "t-8-4", 
            title: "Configure production environment", 
            description: "Set up production infrastructure",
            estimatedTime: { value: 1, unit: 'weeks' }
          },
          {
            id: "t-8-5",
            title: "Conduct launch activities",
            description: "Execute marketing for launch",
            estimatedTime: { value: 1, unit: 'weeks' }
          }
        ],
        dependencies: ["ms-7"]
      }
    ]
  }
};