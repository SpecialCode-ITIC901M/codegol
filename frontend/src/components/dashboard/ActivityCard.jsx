import { activity } from '../../data/dashboardData'
import SectionHeading from './SectionHeading'

export default function ActivityCard() {
  return <section className="activity-card"><SectionHeading eyebrow="EN TIEMPO REAL" title="Actividad reciente" action="Ver toda" onAction={() => window.alert('La actividad completa estará disponible en una próxima versión.')} /><div className="activity-list">{activity.map((item) => <div className="activity-row" key={item.text}><span className={`activity-icon ${item.tone}`}><i className={`pi ${item.icon}`} /></span><div><b>{item.text}</b><small>{item.detail}</small></div><time>{item.time}</time></div>)}</div><div className="activity-footer"><span className="online-dot" /> Actualizado hace unos segundos</div></section>
}
