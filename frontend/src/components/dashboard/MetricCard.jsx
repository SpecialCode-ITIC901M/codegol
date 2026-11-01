export default function MetricCard({ metric }) {
  return <article className="metric-card"><div className={`metric-icon ${metric.tone}`}><i className={`pi ${metric.icon}`} /></div><span className="metric-menu"><i className="pi pi-ellipsis-h" /></span><p>{metric.label}</p><strong>{metric.value}</strong><small className="metric-change"><i className="pi pi-arrow-up-right" /> {metric.change}</small></article>
}
