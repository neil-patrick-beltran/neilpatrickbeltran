import { useState } from 'react'
import Modal from '../Modal'

const techStack = [
  { name: 'Flutter', detail: 'UI framework, built for Android only' },
  { name: 'Dart', detail: 'Application logic' },
  { name: 'Android handheld device', detail: 'Hardware-assisted scanning through a device plugin' },
  { name: 'REST API', detail: 'Records fetched and updated over HTTP' },
  { name: 'Local storage', detail: 'Session and cached data on the device' },
]

const timeline = [
  { phase: 'Month 1', title: 'Foundation', detail: 'Project start, device integration, data structure.' },
  { phase: 'Month 2', title: 'Core features', detail: 'Backend integration and the main workflows.' },
  { phase: 'Month 3', title: 'Reporting and release', detail: 'Reporting workflow, fixes, first release.' },
]

const initialItems = [
  { id: 'ITM-001', name: 'Item A', zone: 'Zone 1', registered: false, assigned: false },
  { id: 'ITM-002', name: 'Item B', zone: 'Zone 1', registered: false, assigned: false },
  { id: 'ITM-003', name: 'Item C', zone: 'Zone 2', registered: true, assigned: false },
]

const tabs = ['register', 'assign', 'audit']

function PhoneSimulator() {
  const [items, setItems] = useState(initialItems)
  const [tab, setTab] = useState('register')
  const [selectedId, setSelectedId] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [message, setMessage] = useState('')
  const [zone, setZone] = useState(null)

  const selected = items.find((i) => i.id === selectedId)
  const pending = items.filter((i) => !i.registered)
  const registered = items.filter((i) => i.registered)
  const zones = [...new Set(registered.map((i) => i.zone))]

  function update(id, changes) {
    setItems((current) => current.map((i) => (i.id === id ? { ...i, ...changes } : i)))
  }

  function switchTab(next) {
    setTab(next)
    setSelectedId(null)
    setConfirming(false)
    setZone(null)
    setMessage('')
  }

  function confirmRegister() {
    update(selected.id, { registered: true })
    setConfirming(false)
    setSelectedId(null)
    setMessage('Item registered.')
  }

  function beginScan() {
    if (!registered.length) {
      setMessage('No registered items found.')
      return
    }
    setScanning(true)
    setMessage('')
    setTimeout(() => {
      setScanning(false)
      setSelectedId(registered[Math.floor(Math.random() * registered.length)].id)
    }, 1000)
  }

  function handleReset() {
    setItems(initialItems)
    switchTab('register')
    setScanning(false)
  }

  function renderDetails(actions) {
    return (
      <div className="phone-sim-detail">
        <strong>{selected.name}</strong>
        <span>ID: {selected.id}</span>
        <span>Zone: {selected.zone}</span>
        {actions}
        <button type="button" onClick={() => setSelectedId(null)}>Back</button>
      </div>
    )
  }

  function renderList(list, onPick) {
    return (
      <ul className="phone-sim-list">
        {list.map((i) => (
          <li key={i.id}>
            <button type="button" onClick={() => onPick(i.id)}>
              <strong>{i.name}</strong>
              <span>{i.id}</span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  let screen
  if (tab === 'register') {
    if (selected) {
      screen = confirming ? (
        <div className="phone-sim-detail">
          <strong>Confirm</strong>
          <p>Register this item?</p>
          <button type="button" onClick={confirmRegister}>YES</button>
          <button type="button" onClick={() => setConfirming(false)}>NO</button>
        </div>
      ) : (
        renderDetails(<button type="button" onClick={() => setConfirming(true)}>REGISTER</button>)
      )
    } else {
      screen = (
        <>
          <div className="phone-sim-counts">
            <span>Registered: {registered.length}</span>
            <span>Pending: {pending.length}</span>
          </div>
          {renderList(pending, setSelectedId)}
        </>
      )
    }
  } else if (tab === 'assign') {
    if (selected) {
      screen = renderDetails(
        <button
          type="button"
          onClick={() => {
            update(selected.id, { assigned: !selected.assigned })
            setSelectedId(null)
            setMessage(selected.assigned ? 'Item returned.' : 'Item assigned.')
          }}
        >
          {selected.assigned ? 'RETURN' : 'ASSIGN'}
        </button>,
      )
    } else {
      screen = (
        <div className="phone-sim-detail">
          <p>{scanning ? 'Scanning...' : 'Scan an item:'}</p>
          <button type="button" onClick={beginScan} disabled={scanning}>Begin Scan</button>
        </div>
      )
    }
  } else if (selected) {
    screen = renderDetails(
      <button type="button" onClick={() => { setSelectedId(null); setMessage('Report submitted.') }}>
        SUBMIT REPORT
      </button>,
    )
  } else if (zone) {
    screen = (
      <>
        <div className="phone-sim-counts"><span>{zone}</span></div>
        {renderList(registered.filter((i) => i.zone === zone), setSelectedId)}
        <button type="button" className="phone-sim-link" onClick={() => setZone(null)}>Back to zones</button>
      </>
    )
  } else {
    screen = (
      <ul className="phone-sim-list">
        {zones.map((name) => (
          <li key={name}>
            <button type="button" onClick={() => { setZone(name); setMessage('') }}>
              <strong>{name}</strong>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="phone-sim">
      <div className="phone-sim-screen">
        <div className="phone-sim-bar">Dashboard</div>
        <div className="phone-sim-body">{screen}</div>
        <p className="phone-sim-message" aria-live="polite">{message}</p>
        <nav className="phone-sim-nav">
          {tabs.map((name) => (
            <button
              key={name}
              type="button"
              aria-current={tab === name ? 'page' : undefined}
              onClick={() => switchTab(name)}
            >
              {name.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>
      <button type="button" className="phone-sim-reset" onClick={handleReset}>
        Reset demo
      </button>
    </div>
  )
}

function AssetTrackingModal({ project, onClose }) {
  return (
    <Modal
      title={project.title}
      onClose={onClose}
      demo={
        <>
          <h4>Try it out</h4>
          <p>A simplified, generic simulation of the Android app. Names, data and flows are illustrative only.</p>
          <PhoneSimulator />
        </>
      }
    >
      <p>{project.description}</p>

      <h4>Tech used</h4>
      <ul className="modal-list">
        {techStack.map((tech) => (
          <li key={tech.name}>
            <strong>{tech.name}</strong> - {tech.detail}
          </li>
        ))}
      </ul>

      <h4>Development timeline</h4>
      <ol className="modal-list">
        {timeline.map((step) => (
          <li key={step.phase}>
            <strong>{step.phase}: {step.title}</strong> - {step.detail}
          </li>
        ))}
      </ol>

    </Modal>
  )
}

export default AssetTrackingModal
