import { useEffect, useState } from 'react'
import Modal from '../Modal'

const techStack = [
  { name: 'Java', detail: 'Workflows are plain annotated classes' },
  { name: 'Spring Boot', detail: 'Hosts the engine and discovers annotated workflow classes' },
  { name: 'Maven', detail: 'Packaged as a drop-in module replacing the KIE Server jBPM one' },
]

const workflows = [
  { name: 'OrderApproval', steps: ['validateOrder', 'checkCredit', 'approve', 'notifyCustomer'] },
  { name: 'EmployeeOnboarding', steps: ['createAccount', 'assignEquipment', 'sendWelcome'] },
]

const STEP_MS = 900

function WorkflowDemo() {
  const [instances, setInstances] = useState([])
  const [nextId, setNextId] = useState(1)
  const [workflowName, setWorkflowName] = useState(workflows[0].name)

  const workflow = workflows.find((w) => w.name === workflowName)
  const running = instances.some((i) => i.status === 'running')

  useEffect(() => {
    if (!running) return undefined
    const timer = setInterval(() => {
      setInstances((current) =>
        current.map((instance) => {
          if (instance.status !== 'running') return instance
          const total = workflows.find((w) => w.name === instance.workflow).steps.length
          const next = instance.current + 1
          return next >= total
            ? { ...instance, current: total, status: 'completed' }
            : { ...instance, current: next }
        }),
      )
    }, STEP_MS)
    return () => clearInterval(timer)
  }, [running])

  function start() {
    setInstances((current) => [...current, { id: nextId, workflow: workflowName, current: 0, status: 'running' }])
    setNextId((id) => id + 1)
  }

  return (
    <div className="wf-demo">
      <div className="wf-code">
        <pre>
          <code>
            <span className="wf-annot">@Workflow</span>
            {`\npublic class ${workflow.name} {\n`}
            {workflow.steps.map((step) => (
              <span key={step}>
                {'\n  '}
                <span className="wf-annot">@Step</span>
                {`\n  public void ${step}() { ... }\n`}
              </span>
            ))}
            {'}'}
          </code>
        </pre>
      </div>

      <div className="wf-controls">
        <label>
          Workflow{' '}
          <select value={workflowName} onChange={(event) => setWorkflowName(event.target.value)}>
            {workflows.map((w) => (
              <option key={w.name} value={w.name}>{w.name}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={start}>Start instance</button>
        <button type="button" onClick={() => setInstances([])} disabled={!instances.length}>Clear</button>
      </div>

      {instances.length === 0 && <p>Start one or more instances to watch them run in parallel.</p>}

      {instances.map((instance) => {
        const def = workflows.find((w) => w.name === instance.workflow)
        return (
          <div className="wf-instance" key={instance.id}>
            <div className="wf-instance-title">
              <strong>{instance.workflow}</strong> #{instance.id} - {instance.status}
            </div>
            <ol className="wf-steps">
              {def.steps.map((step, index) => {
                const state =
                  index < instance.current ? 'done' : index === instance.current ? 'active' : 'pending'
                return (
                  <li key={step} className={`wf-step wf-${state}`}>
                    {step}()
                  </li>
                )
              })}
            </ol>
          </div>
        )
      })}
    </div>
  )
}

function CodeDrivenWorkflowModal({ project, onClose }) {
  return (
    <Modal
      title={project.title}
      onClose={onClose}
      demo={
        <>
          <h4>Workflow visualization</h4>
          <p>Illustrative demo. Annotation and workflow names are examples.</p>
          <WorkflowDemo />
        </>
      }
    >
      <p>{project.description}</p>

      <h4>How it works</h4>
      <ul className="modal-list">
        <li>Each class annotated as a workflow is one workflow definition; every run of it is an instance.</li>
        <li>Each method inside is a step, executed in order for that instance.</li>
        <li>No separate deployment of process definitions, unlike jBPM: the workflow is the code.</li>
      </ul>

      <h4>Tech used</h4>
      <ul className="modal-list">
        {techStack.map((tech) => (
          <li key={tech.name}>
            <strong>{tech.name}</strong> - {tech.detail}
          </li>
        ))}
      </ul>

    </Modal>
  )
}

export default CodeDrivenWorkflowModal
