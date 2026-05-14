'use client';
import Link from 'next/link';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileText, Target, TrendingUp, GraduationCap, AlertCircle, DollarSign, Mail } from 'lucide-react';

const monthlyData = [
  { month: 'Aug', students: 3, applications: 5, revenue: 1800 },
  { month: 'Sep', students: 5, applications: 8, revenue: 3200 },
  { month: 'Oct', students: 4, applications: 7, revenue: 2600 },
  { month: 'Nov', students: 7, applications: 12, revenue: 4800 },
  { month: 'Dec', students: 6, applications: 10, revenue: 4200 },
  { month: 'Jan', students: 9, applications: 15, revenue: 6100 },
  { month: 'Feb', students: 8, applications: 13, revenue: 5400 },
  { month: 'Mar', students: 11, applications: 18, revenue: 7200 },
  { month: 'Apr', students: 10, applications: 16, revenue: 6800 },
  { month: 'May', students: 12, applications: 20, revenue: 8400 },
];

const destinationData = [
  { country: '🇲🇾 MY', count: 31 },
  { country: '🇬🇧 UK', count: 8 },
  { country: '🇦🇺 AU', count: 5 },
  { country: '🇺🇸 US', count: 2 },
  { country: '🇨🇦 CA', count: 1 },
];

const applicationsByStatus = [
  { label: 'Enrolled',       count: 18, color: '#22c55e', pct: 78 },
  { label: 'Offer Received', count: 6,  color: '#06b6d4', pct: 52 },
  { label: 'Under Review',   count: 6,  color: '#f97316', pct: 52 },
  { label: 'Submitted',      count: 11, color: '#3b82f6', pct: 48 },
  { label: 'Draft',          count: 4,  color: '#6b7280', pct: 17 },
];

const recentActivity = [
  { dot: '#3b82f6', msg: 'Rahim Uddin submitted application to Taylor\'s University', time: '10 min ago' },
  { dot: '#f97316', msg: 'Nadia Islam uploaded HSC certificate', time: '42 min ago' },
  { dot: '#22c55e', msg: 'APU Malaysia issued offer letter for Karim Hassan', time: '2 hours ago' },
  { dot: '#a855f7', msg: 'New lead: Sadia Rahman (interested in UK)', time: '3 hours ago' },
  { dot: '#3b82f6', msg: 'Farhan Ahmed registered a new account', time: '5 hours ago' },
  { dot: '#22c55e', msg: 'Mitu Begum visa approved — Malaysia', time: '1 day ago' },
  { dot: '#f97316', msg: 'Application deadline reminder sent to 6 students', time: '1 day ago' },
];

const stats = [
  { label: 'Total Students',    value: '47',   sub: '+8 this month', icon: Users,         color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  { label: 'Active Applications', value: '23', sub: '6 under review', icon: FileText,     color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  { label: 'New Leads',         value: '12',   sub: '5 uncontacted', icon: Target,         color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  { label: 'Visa Success',      value: '98%',  sub: 'All time record', icon: TrendingUp,   color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  { label: 'Enrolled / Month',  value: '9',    sub: 'MY·UK·AU', icon: GraduationCap,       color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
  { label: 'Pending Docs',      value: '14',   sub: 'Across 8 students', icon: AlertCircle, color: '#eab308', bg: 'rgba(234,179,8,0.12)' },
  { label: 'Revenue (Est.)',    value: '$12.4k', sub: 'Service fees', icon: DollarSign,   color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  { label: 'Offer Letters',     value: '6',    sub: 'This week', icon: Mail,               color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
];

const darkTooltip = {
  contentStyle: { background: '#1c2333', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', fontSize: '0.78rem' },
  labelStyle: { color: 'rgba(255,255,255,0.6)' },
  cursor: { stroke: 'rgba(255,255,255,0.1)' },
};

export default function AdminOverviewPage() {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <style>{`
        .ao-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
        .ao-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0 0 4px; }
        .ao-date { font-size: 0.82rem; color: rgba(255,255,255,0.35); }
        .ao-btn-row { display: flex; gap: 10px; }
        .ao-btn { padding: 10px 20px; border-radius: 10px; font-size: 0.83rem; font-weight: 700; text-decoration: none; cursor: pointer; border: none; font-family: inherit; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
        .ao-btn-orange { background: #ff7a00; color: #fff; }
        .ao-btn-orange:hover { background: #e06a00; }
        .ao-btn-ghost { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.1); }
        .ao-btn-ghost:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .ao-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .ao-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 20px;
          display: flex; flex-direction: column; gap: 10px;
          transition: all 0.2s;
        }
        .ao-stat:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }
        .ao-stat-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ao-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.4); font-weight: 500; }
        .ao-stat-value { font-size: 1.6rem; font-weight: 900; color: #fff; line-height: 1; }
        .ao-stat-sub { font-size: 0.7rem; color: rgba(255,255,255,0.3); }

        .ao-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .ao-grid3 { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; margin-bottom: 20px; }
        .ao-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 22px;
        }
        .ao-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .ao-card-title { font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.8); }
        .ao-card-link { font-size: 0.75rem; color: #3b82f6; text-decoration: none; font-weight: 600; }
        .ao-card-link:hover { color: #60a5fa; }

        .ao-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .ao-bar-label { font-size: 0.75rem; color: rgba(255,255,255,0.5); width: 110px; flex-shrink: 0; }
        .ao-bar-track { flex: 1; height: 6px; background: rgba(255,255,255,0.07); border-radius: 100px; overflow: hidden; }
        .ao-bar-fill { height: 100%; border-radius: 100px; transition: width 0.6s ease; }
        .ao-bar-val { font-size: 0.75rem; color: rgba(255,255,255,0.4); width: 24px; text-align: right; flex-shrink: 0; }

        .ao-activity-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ao-activity-item:last-child { border-bottom: none; }
        .ao-activity-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .ao-activity-msg { font-size: 0.82rem; color: rgba(255,255,255,0.65); line-height: 1.5; }
        .ao-activity-time { font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-top: 2px; }

        .ao-tasks { display: flex; flex-direction: column; gap: 0; }
        .ao-task { display: flex; align-items: center; gap: 10px; padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .ao-task:last-child { border-bottom: none; }
        .ao-task-text { flex: 1; font-size: 0.82rem; color: rgba(255,255,255,0.65); }
        .ao-urgency { font-size: 0.62rem; font-weight: 700; padding: 2px 8px; border-radius: 100px; }

        .ao-quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ao-qa-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 14px; border-radius: 12px;
          text-decoration: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.2s; cursor: pointer;
        }
        .ao-qa-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); transform: translateY(-1px); }
        .ao-qa-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
        .ao-qa-label { font-size: 0.78rem; font-weight: 700; color: rgba(255,255,255,0.7); }

        @media (max-width: 1100px) {
          .ao-stats { grid-template-columns: repeat(2, 1fr); }
          .ao-grid2, .ao-grid3 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HEADER */}
      <div className="ao-header">
        <div>
          <h1 className="ao-title">Admin Overview</h1>
          <p className="ao-date">{today}</p>
        </div>
        <div className="ao-btn-row">
          <Link href="/admin/dashboard/leads" className="ao-btn ao-btn-orange">+ New Lead</Link>
          <Link href="/admin/dashboard/applications" className="ao-btn ao-btn-ghost">View Applications</Link>
        </div>
      </div>

      {/* KPI STATS */}
      <div className="ao-stats">
        {stats.map((s, i) => (
          <div key={i} className="ao-stat">
            <div className="ao-stat-icon" style={{ background: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <div className="ao-stat-label">{s.label}</div>
              <div className="ao-stat-value">{s.value}</div>
              <div className="ao-stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="ao-grid3">
        {/* Area chart — students & applications trend */}
        <div className="ao-card">
          <div className="ao-card-header">
            <span className="ao-card-title">📈 Students & Applications Trend</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...darkTooltip} />
              <Area type="monotone" dataKey="applications" stroke="#f97316" fill="url(#gradOrange)" strokeWidth={2} name="Applications" />
              <Area type="monotone" dataKey="students" stroke="#3b82f6" fill="url(#gradBlue)" strokeWidth={2} name="Students" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart — destinations */}
        <div className="ao-card">
          <div className="ao-card-header">
            <span className="ao-card-title">🌍 By Destination</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={destinationData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="country" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...darkTooltip} />
              <Bar dataKey="count" fill="#0b3d91" radius={[6, 6, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="ao-grid2">
        {/* Applications by status + Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="ao-card">
            <div className="ao-card-header">
              <span className="ao-card-title">📋 Applications by Status</span>
              <Link href="/admin/dashboard/applications" className="ao-card-link">Manage →</Link>
            </div>
            {applicationsByStatus.map((item, i) => (
              <div key={i} className="ao-bar-row">
                <span className="ao-bar-label">{item.label}</span>
                <div className="ao-bar-track">
                  <div className="ao-bar-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
                <span className="ao-bar-val">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="ao-card">
            <div className="ao-card-header">
              <span className="ao-card-title">⚡ Quick Actions</span>
            </div>
            <div className="ao-quick-actions">
              {[
                { href: '/admin/dashboard/users',        icon: '👥', label: 'Manage Students',    bg: 'rgba(59,130,246,0.12)' },
                { href: '/admin/dashboard/applications', icon: '📋', label: 'Review Applications', bg: 'rgba(249,115,22,0.12)' },
                { href: '/admin/dashboard/leads',        icon: '🎯', label: 'Follow Up Leads',     bg: 'rgba(168,85,247,0.12)' },
                { href: '/admin/dashboard/ai',           icon: '🤖', label: 'AI Assistant',        bg: 'rgba(34,197,94,0.12)' },
              ].map((a, i) => (
                <Link key={i} href={a.href} className="ao-qa-btn">
                  <div className="ao-qa-icon" style={{ background: a.bg }}>{a.icon}</div>
                  <span className="ao-qa-label">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Activity + Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="ao-card">
            <div className="ao-card-header">
              <span className="ao-card-title">⚡ Recent Activity</span>
            </div>
            {recentActivity.map((item, i) => (
              <div key={i} className="ao-activity-item">
                <div className="ao-activity-dot" style={{ background: item.dot }} />
                <div>
                  <div className="ao-activity-msg">{item.msg}</div>
                  <div className="ao-activity-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ao-card">
            <div className="ao-card-header">
              <span className="ao-card-title">📌 Pending Tasks</span>
            </div>
            <div className="ao-tasks">
              {[
                { text: 'Follow up with 5 new leads',              urgency: 'high',   icon: '🎯' },
                { text: 'Review 3 submitted applications',         urgency: 'high',   icon: '📋' },
                { text: 'Chase 4 students for missing documents',  urgency: 'medium', icon: '📄' },
                { text: 'Send intake reminder to July applicants', urgency: 'low',    icon: '📅' },
              ].map((task, i) => (
                <div key={i} className="ao-task">
                  <span style={{ fontSize: '1rem' }}>{task.icon}</span>
                  <span className="ao-task-text">{task.text}</span>
                  <span className="ao-urgency" style={{
                    background: task.urgency === 'high' ? 'rgba(239,68,68,0.15)' : task.urgency === 'medium' ? 'rgba(234,179,8,0.15)' : 'rgba(255,255,255,0.07)',
                    color: task.urgency === 'high' ? '#f87171' : task.urgency === 'medium' ? '#fbbf24' : 'rgba(255,255,255,0.35)',
                  }}>
                    {task.urgency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
