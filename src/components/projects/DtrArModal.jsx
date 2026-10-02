import { useState } from 'react'
import Modal from '../Modal'

const techStack = [
  { name: 'React 18 + Vite', detail: 'Single-page app' },
  { name: 'Material Tailwind + Tailwind CSS', detail: 'UI components and styling' },
  { name: 'React Router', detail: 'Record list and editor routes' },
  { name: '@react-pdf/renderer', detail: 'Print preview and PDF layouts for both reports' },
  { name: 'crypto-js (AES)', detail: 'Records are encrypted before being saved to localStorage' },
  { name: 'moment, notistack', detail: 'Date handling and notification snackbars' },
]

const features = [
  'Daily Time Record: pick a month, period (1 to 15, 16 to end of month, or whole month) and year, then log each day with AM / PM time in and out.',
  'Day types: regular day, holiday, and leave options such as on leave, rest day and official business.',
  'Accomplishment Report: for each day, build a task list from a reusable library, with search and add-new-task, then save it to the day.',
  'Print preview for both reports, laid out with prepared-by and approved-by lines.',
  'Autosave, with everything stored encrypted in the browser. No server needed.',
]

const timeline = [
  { phase: 'July 2023', title: 'Prototype', detail: 'First attendance log with add / delete and hours calculation.' },
  { phase: 'November 2023', title: 'Rebuild', detail: 'New UI, per-period records, encrypted storage and the DTR print layout.' },
  { phase: 'January - March 2024', title: 'Accomplishment Report', detail: 'Task-based daily reports, report print layout, leave options, autosave, changelog and notifications (v0.3 to v0.4).' },
]

const periods = ['1 to 15', '16 to End of the Month', 'Whole Month']
const dtrTypes = ['Regular Day', 'Holiday', 'On Leave', 'Rest Day', 'Official Business']
const arTypes = ['Regular Day', 'Holiday', 'Rest Day']
const sampleTasks = [
  'Reviewed system modules.',
  'Developed a new module.',
  'Fixed reported bugs.',
  'Backed up the database.',
  'Handled a support request.',
]

function monthLabel(now) {
  return now.toLocaleString('default', { month: 'long', year: 'numeric' })
}

function dayRange(now, period) {
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const start = period === periods[1] ? 16 : 1
  const end = period === periods[0] ? 15 : last
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function hoursBetween(start, end) {
  if (!start || !end) return 0
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  return Math.max(0, (eh * 60 + em - (sh * 60 + sm)) / 60)
}

function PreviewSheet({ title, label, children, onBack }) {
  return (
    <div className="dtr-sheet" aria-label="Print preview">
      <strong>{title}</strong>
      <span>{label}</span>
      {children}
      <div className="dtr-head">
        <span>Prepared and submitted by: ____________</span>
        <span>Approved by: ____________</span>
      </div>
      <button type="button" onClick={onBack}>Back to editing</button>
    </div>
  )
}

function ReportsDemo() {
  const now = new Date()
  const [tab, setTab] = useState('dtr')
  const [period, setPeriod] = useState(periods[0])
  const [previewing, setPreviewing] = useState(false)
  const [dtr, setDtr] = useState([])
  const [ar, setAr] = useState([])

  const [dtrDay, setDtrDay] = useState('')
  const [dtrType, setDtrType] = useState(dtrTypes[0])
  const [times, setTimes] = useState({ amIn: '08:00', amOut: '12:00', pmIn: '13:00', pmOut: '17:00' })
  const [note, setNote] = useState('')

  const [arDay, setArDay] = useState('')
  const [arType, setArType] = useState(arTypes[0])
  const [library, setLibrary] = useState(sampleTasks)
  const [dayTasks, setDayTasks] = useState([])
  const [search, setSearch] = useState('')

  const days = dayRange(now, period)
  const freeDtrDays = days.filter((d) => !dtr.some((e) => e.day === d))
  const freeArDays = days.filter((d) => !ar.some((e) => e.day === d))
  const selectedDtrDay = freeDtrDays.includes(Number(dtrDay)) ? dtrDay : String(freeDtrDays[0] ?? '')
  const selectedArDay = freeArDays.includes(Number(arDay)) ? arDay : String(freeArDays[0] ?? '')
  const hasWorkTimes = dtrType === dtrTypes[0]
  const filteredLibrary = library.filter((t) => t.toLowerCase().includes(search.toLowerCase()))
  const canAddNew = search.trim() && !library.some((t) => t.toLowerCase() === search.trim().toLowerCase())

  function switchTab(next) {
    setTab(next)
    setPreviewing(false)
  }

  function addDtr(event) {
    event.preventDefault()
    if (!selectedDtrDay) return
    const entry = { day: Number(selectedDtrDay), type: dtrType, note: hasWorkTimes ? '' : note, ...(hasWorkTimes ? times : {}) }
    setDtr((current) => [...current, entry].sort((a, b) => a.day - b.day))
    setNote('')
  }

  function addAr(event) {
    event.preventDefault()
    if (!selectedArDay) return
    const regular = arType === arTypes[0]
    setAr((current) => [...current, { day: Number(selectedArDay), type: arType, tasks: regular ? dayTasks : [] }].sort((a, b) => a.day - b.day))
    setDayTasks([])
  }

  function addNewTask() {
    const task = search.trim()
    setLibrary((current) => [...current, task])
    setDayTasks((current) => [...current, task])
    setSearch('')
  }

  function setTime(key, value) {
    setTimes((current) => ({ ...current, [key]: value }))
  }

  const label = `${monthLabel(now)} - ${period}`

  if (previewing && tab === 'dtr') {
    return (
      <div className="dtr-demo">
        <PreviewSheet title="Daily Time Record" label={label} onBack={() => setPreviewing(false)}>
          <table>
            <thead><tr><th>Day</th><th>AM In</th><th>AM Out</th><th>PM In</th><th>PM Out</th><th>Hours</th></tr></thead>
            <tbody>
              {dtr.map((e) => (
                <tr key={e.day}>
                  <td>{e.day}</td>
                  {e.type === dtrTypes[0] ? (
                    <>
                      <td>{e.amIn}</td><td>{e.amOut}</td><td>{e.pmIn}</td><td>{e.pmOut}</td>
                      <td>{(hoursBetween(e.amIn, e.amOut) + hoursBetween(e.pmIn, e.pmOut)).toFixed(2)}</td>
                    </>
                  ) : (
                    <td colSpan={5}>{e.type}{e.note ? `: ${e.note}` : ''}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </PreviewSheet>
      </div>
    )
  }

  if (previewing && tab === 'ar') {
    return (
      <div className="dtr-demo">
        <PreviewSheet title="Accomplishment Report" label={label} onBack={() => setPreviewing(false)}>
          <table>
            <thead><tr><th>Day</th><th>Accomplishments</th></tr></thead>
            <tbody>
              {ar.map((e) => (
                <tr key={e.day}>
                  <td>{e.day}</td>
                  <td>
                    {e.type === arTypes[0]
                      ? <ul className="dtr-cell-list">{e.tasks.map((t) => <li key={t}>{t}</li>)}</ul>
                      : e.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PreviewSheet>
      </div>
    )
  }

  const entries = tab === 'dtr' ? dtr : ar

  return (
    <div className="dtr-demo">
      <div className="dtr-actions">
        <button type="button" aria-pressed={tab === 'dtr'} onClick={() => switchTab('dtr')}>Time Record</button>
        <button type="button" aria-pressed={tab === 'ar'} onClick={() => switchTab('ar')}>Accomplishment Report</button>
      </div>

      <label>Period ({monthLabel(now)})
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          {periods.map((p) => <option key={p}>{p}</option>)}
        </select>
      </label>

      {tab === 'dtr' ? (
        <form className="dtr-form" onSubmit={addDtr}>
          <label>Date
            <select value={selectedDtrDay} onChange={(e) => setDtrDay(e.target.value)} disabled={!freeDtrDays.length}>
              {freeDtrDays.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label>Type of Day
            <select value={dtrType} onChange={(e) => setDtrType(e.target.value)}>
              {dtrTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          {hasWorkTimes ? (
            <>
              <label>AM In<input type="time" value={times.amIn} onChange={(e) => setTime('amIn', e.target.value)} /></label>
              <label>AM Out<input type="time" value={times.amOut} onChange={(e) => setTime('amOut', e.target.value)} /></label>
              <label>PM In<input type="time" value={times.pmIn} onChange={(e) => setTime('pmIn', e.target.value)} /></label>
              <label>PM Out<input type="time" value={times.pmOut} onChange={(e) => setTime('pmOut', e.target.value)} /></label>
            </>
          ) : (
            <label>Note (optional)<input value={note} onChange={(e) => setNote(e.target.value)} /></label>
          )}
          <button type="submit" disabled={!freeDtrDays.length}>Add</button>
        </form>
      ) : (
        <form className="dtr-form" onSubmit={addAr}>
          <label>Date
            <select value={selectedArDay} onChange={(e) => setArDay(e.target.value)} disabled={!freeArDays.length}>
              {freeArDays.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label>Type of Day
            <select value={arType} onChange={(e) => setArType(e.target.value)}>
              {arTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          {arType === arTypes[0] && (
            <>
              <label className="dtr-wide">Search / add task
                <input value={search} onChange={(e) => setSearch(e.target.value)} />
              </label>
              {canAddNew && <button type="button" onClick={addNewTask}>Add as new task</button>}
              <ul className="dtr-logs dtr-wide" aria-label="Task list">
                {filteredLibrary.map((t) => (
                  <li key={t}>
                    <span>{t}</span>
                    <button type="button" onClick={() => setDayTasks((c) => [...c, t])} disabled={dayTasks.includes(t)}>+</button>
                  </li>
                ))}
              </ul>
              <ul className="dtr-logs dtr-wide" aria-label="Day tasks">
                {dayTasks.length === 0 && <li>Day tasks is empty.</li>}
                {dayTasks.map((t) => (
                  <li key={t}>
                    <span>{t}</span>
                    <button type="button" onClick={() => setDayTasks((c) => c.filter((x) => x !== t))}>-</button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button type="submit" disabled={!freeArDays.length || (arType === arTypes[0] && !dayTasks.length)}>Add</button>
        </form>
      )}

      <ul className="dtr-logs">
        {entries.length === 0 && <li>No entries yet.</li>}
        {entries.map((e) => (
          <li key={e.day}>
            <span>
              Day {e.day}: {e.type}
              {tab === 'dtr' && e.type === dtrTypes[0] && ` (${e.amIn}-${e.amOut}, ${e.pmIn}-${e.pmOut})`}
              {tab === 'ar' && e.type === arTypes[0] && ` (${e.tasks.length} tasks)`}
            </span>
            <button
              type="button"
              onClick={() => (tab === 'dtr' ? setDtr : setAr)((c) => c.filter((x) => x.day !== e.day))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="dtr-actions">
        <button type="button" onClick={() => setPreviewing(true)} disabled={!entries.length}>Print preview</button>
      </div>
    </div>
  )
}

function DtrArModal({ project, onClose }) {
  return (
    <Modal
      title={project.title}
      onClose={onClose}
      demo={
        <>
          <h4>Try it out</h4>
          <p>A simplified version of the app. Switch between the two reports, add entries, then preview the printout. Nothing is saved.</p>
          <ReportsDemo />
        </>
      }
    >
      <p>{project.description}</p>

      <h4>What it does</h4>
      <ul className="modal-list">
        {features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>

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

export default DtrArModal
