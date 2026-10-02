import DtrArModal from './components/projects/DtrArModal'
import AssetTrackingModal from './components/projects/AssetTrackingModal'
import CodeDrivenWorkflowModal from './components/projects/CodeDrivenWorkflowModal'

export const projects = [
  {
    id: 'dtr-ar',
    title: 'Daily Time Record App',
    description: 'A custom built React application that has encoding to print functionality.',
    builtWith: ['react', 'javascript'],
    modal: DtrArModal,
  },
  {
    id: 'asset-tracking',
    title: 'Handheld Asset Tracking App',
    description: 'Custom built asset tracking application for an Android based handheld device.',
    builtWith: ['android', 'java', 'dart', 'flutter'],
    modal: AssetTrackingModal,
  },
  {
    id: 'mtop',
    title: 'Code-driven Workflow System',
    description: 'Basically a workflow orchestration system like jBPM but minus the deployment.',
    builtWith: ['java', 'springboot'],
    modal: CodeDrivenWorkflowModal,
  },
]

export const experience = [
  {
    company: 'Lancesoft Inc.',
    dates: '2025–Present',
    title: 'Software Engineer',
    summary:
      'Recently doing Java now, as part of yet another team. '+
      'Here, I am now owning & managing features on an existing system built with SpringBoot (Java). '+
      'Leading development driven with AI through Agentic Coding via GitHub Copilot. ',
    logo: 'lancesoft',
  },
  {
    company: 'Vertere Global Solutions',
    dates: '2023–2025',
    title: 'Programmer Analyst II',
    summary:
      'This is where I\'ve gone corporate. '+
      'I learned how to work with bigger teams and became a cog within the system. '+
      'My main focus was developing & managing microservices ran with Docker on Azure Kubernetes. '+
      'I managed several interconnected programs on a variety of languages (Java, Go, JavaScript)'+
      ', while maintining security using asymmetric encryption and running a secrets manager to handle passwords. ',
    logo: 'vertere',
  },
  {
    company: 'City Government of San Pablo',
    dates: '2020–2023',
    title: 'Programmer',
    summary:
      'Served as my starting point in my development journey. I mostly learned my stuff here, working on debugging existing systems written in Laravel (PHP) and building new systems that improved their processes.',
    logo: 'san-pablo',
  },
]
