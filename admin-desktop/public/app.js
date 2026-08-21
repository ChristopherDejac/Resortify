// ---- Mock Data ----
const mockData = {
  stats: {
    totalUsers: 1250,
    activeResorts: 48,
    totalBookings: 3420,
    revenue: 284500,
  },
  recentUsers: [
    { id: 1, name: "Maria Santos", email: "maria@email.com", role: "owner", status: "active", joined: "2026-06-28" },
    { id: 2, name: "Jose Garcia", email: "jose@email.com", role: "customer", status: "active", joined: "2026-06-25" },
    { id: 3, name: "Ana Lopez", email: "ana@email.com", role: "owner", status: "pending", joined: "2026-06-22" },
    { id: 4, name: "Pedro Cruz", email: "pedro@email.com", role: "customer", status: "suspended", joined: "2026-06-20" },
    { id: 5, name: "Lisa Reyes", email: "lisa@email.com", role: "owner", status: "active", joined: "2026-06-18" },
  ],
  monthlyRevenue: [
    { month: "Jan", revenue: 18000 },
    { month: "Feb", revenue: 22000 },
    { month: "Mar", revenue: 28000 },
    { month: "Apr", revenue: 25000 },
    { month: "May", revenue: 32000 },
    { month: "Jun", revenue: 35000 },
  ],
};

// ---- Layout Component ----
function Layout({ activePage, onNavigate, children }) {
  return React.createElement('div', { className: 'layout' },
    React.createElement('aside', { className: 'sidebar' },
      React.createElement('div', { className: 'sidebar-brand' },
        React.createElement('h1', null, 'HanaPin'),
        React.createElement('span', null, 'ADMIN PANEL')
      ),
      React.createElement('nav', { className: 'sidebar-nav' },
        [
          { page: 'dashboard', label: 'Dashboard', icon: '📊' },
          { page: 'users', label: 'Users', icon: '👥' },
          { page: 'resorts', label: 'Resorts', icon: '🏖️' },
          { page: 'settings', label: 'Settings', icon: '⚙️' },
        ].map(item =>
          React.createElement('button', {
            key: item.page,
            className: 'nav-item' + (activePage === item.page ? ' active' : ''),
            onClick: () => onNavigate(item.page),
          },
            React.createElement('span', { className: 'nav-icon' }, item.icon),
            item.label
          )
        )
      ),
      React.createElement('div', { className: 'sidebar-footer' },
        React.createElement('button', {
          className: 'nav-item',
          onClick: () => { if (confirm('Logout?')) onNavigate('logout'); },
        },
          React.createElement('span', { className: 'nav-icon' }, '🚪'),
          'Logout'
        )
      )
    ),
    React.createElement('div', { className: 'main' },
      React.createElement('header', { className: 'header' },
        React.createElement('h2', null, activePage === 'dashboard' ? 'Dashboard' : activePage === 'users' ? 'Users' : activePage === 'resorts' ? 'Resorts' : 'Settings'),
        React.createElement('div', { className: 'header-right' },
          React.createElement('div', { className: 'admin-badge' },
            React.createElement('span', null, '🛡️'),
            'Admin'
          )
        )
      ),
      React.createElement('div', { className: 'content' }, children)
    )
  );
}

// ---- Dashboard Page ----
function DashboardPage() {
  const { stats, recentUsers, monthlyRevenue } = mockData;

  // Simple bar chart using divs
  const maxRevenue = Math.max(...monthlyRevenue.map(r => r.revenue));

  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'stats-grid' },
      [
        { label: 'Total Users', value: stats.totalUsers, change: '+12%', up: true },
        { label: 'Active Resorts', value: stats.activeResorts, change: '+3', up: true },
        { label: 'Total Bookings', value: stats.totalBookings.toLocaleString(), change: '+8%', up: true },
        { label: 'Revenue', value: '$' + stats.revenue.toLocaleString(), change: '+15%', up: true },
      ].map(stat =>
        React.createElement('div', { key: stat.label, className: 'stat-card' },
          React.createElement('div', { className: 'stat-label' }, stat.label),
          React.createElement('div', { className: 'stat-value' }, stat.value),
          React.createElement('div', { className: 'stat-change ' + (stat.up ? 'up' : 'down') }, stat.change)
        )
      )
    ),
    React.createElement('div', { className: 'charts-row' },
      React.createElement('div', { className: 'chart-card' },
        React.createElement('h3', null, 'Revenue Trend'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', paddingTop: '8px' } },
          monthlyRevenue.map(r =>
            React.createElement('div', {
              key: r.month,
              style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%' },
            },
              React.createElement('div', {
                style: {
                  flex: 1, width: '100%', maxWidth: '40px',
                  background: '#083F4A', borderRadius: '6px 6px 0 0',
                  height: (r.revenue / maxRevenue) * 100 + '%',
                  transition: 'height 0.3s',
                },
              }),
              React.createElement('span', { style: { fontSize: '11px', color: '#7a8a9a' } }, r.month)
            )
          )
        )
      ),
      React.createElement('div', { className: 'chart-card' },
        React.createElement('h3', null, 'User Distribution'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
          [
            { label: 'Owners', count: 180, color: '#083F4A' },
            { label: 'Customers', count: 1040, color: '#0E7A56' },
            { label: 'Admins', count: 30, color: '#9aa8b2' },
          ].map(group => {
            const total = 1250;
            const pct = (group.count / total) * 100;
            return React.createElement('div', { key: group.label },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px' } },
                React.createElement('span', { style: { fontWeight: '600' } }, group.label),
                React.createElement('span', { style: { color: '#7a8a9a' } }, group.count + ' (' + Math.round(pct) + '%)')
              ),
              React.createElement('div', { style: { height: '8px', background: '#f0f2f4', borderRadius: '4px', overflow: 'hidden' } },
                React.createElement('div', { style: { height: '100%', width: pct + '%', background: group.color, borderRadius: '4px' } })
              )
            );
          })
        )
      )
    ),
    React.createElement('div', { className: 'table-card' },
      React.createElement('h3', null, 'Recent Users'),
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Name'),
            React.createElement('th', null, 'Email'),
            React.createElement('th', null, 'Role'),
            React.createElement('th', null, 'Status'),
            React.createElement('th', null, 'Joined')
          )
        ),
        React.createElement('tbody', null,
          recentUsers.map(user =>
            React.createElement('tr', { key: user.id },
              React.createElement('td', { style: { fontWeight: '600' } }, user.name),
              React.createElement('td', null, user.email),
              React.createElement('td', null,
                React.createElement('span', { className: 'role-badge ' + user.role },
                  user.role.charAt(0).toUpperCase() + user.role.slice(1)
                )
              ),
              React.createElement('td', null,
                React.createElement('span', { className: 'status ' + user.status },
                  user.status.charAt(0).toUpperCase() + user.status.slice(1)
                )
              ),
              React.createElement('td', null, user.joined)
            )
          )
        )
      )
    )
  );
}

// ---- Users Page ----
function UsersPage() {
  const users = mockData.recentUsers.concat([
    { id: 6, name: "Carlo Mendez", email: "carlo@email.com", role: "customer", status: "active", joined: "2026-06-15" },
    { id: 7, name: "Sofia Tan", email: "sofia@email.com", role: "owner", status: "active", joined: "2026-06-12" },
  ]);

  return React.createElement('div', null,
    React.createElement('div', { className: 'users-header' },
      React.createElement('input', {
        className: 'search-input',
        type: 'text',
        placeholder: 'Search users...',
      }),
      React.createElement('button', { className: 'btn btn-primary' }, '+ Add User')
    ),
    React.createElement('div', { className: 'table-card' },
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Name'),
            React.createElement('th', null, 'Email'),
            React.createElement('th', null, 'Role'),
            React.createElement('th', null, 'Status'),
            React.createElement('th', null, 'Actions')
          )
        ),
        React.createElement('tbody', null,
          users.map(user =>
            React.createElement('tr', { key: user.id },
              React.createElement('td', { style: { fontWeight: '600' } }, user.name),
              React.createElement('td', null, user.email),
              React.createElement('td', null,
                React.createElement('span', { className: 'role-badge ' + user.role },
                  user.role.charAt(0).toUpperCase() + user.role.slice(1)
                )
              ),
              React.createElement('td', null,
                React.createElement('span', { className: 'status ' + user.status },
                  user.status.charAt(0).toUpperCase() + user.status.slice(1)
                )
              ),
              React.createElement('td', null,
                React.createElement('button', {
                  className: 'btn btn-primary',
                  style: { marginRight: '6px', padding: '4px 12px' },
                  onClick: () => alert('Edit user: ' + user.name),
                }, 'Edit'),
                React.createElement('button', {
                  className: 'btn btn-danger',
                  style: { padding: '4px 12px' },
                  onClick: () => alert('Suspend user: ' + user.name),
                }, 'Suspend')
              )
            )
          )
        )
      )
    )
  );
}

// ---- Resorts Page ----
function ResortsPage() {
  const resorts = [
    { id: 1, name: "Sunset Bay Resort", owner: "Maria Santos", location: "Palawan", status: "active", bookings: 234, rating: 4.8 },
    { id: 2, name: "Mountain Peak Lodge", owner: "Jose Garcia", location: "Baguio", status: "active", bookings: 189, rating: 4.6 },
    { id: 3, name: "Island Paradise Resort", owner: "Ana Lopez", location: "Cebu", status: "pending", bookings: 0, rating: 0 },
    { id: 4, name: "Green Valley Farmstay", owner: "Lisa Reyes", location: "Tagaytay", status: "active", bookings: 156, rating: 4.4 },
  ];

  return React.createElement('div', null,
    React.createElement('div', { className: 'users-header' },
      React.createElement('input', {
        className: 'search-input',
        type: 'text',
        placeholder: 'Search resorts...',
      }),
      React.createElement('button', { className: 'btn btn-primary' }, '+ Add Resort')
    ),
    React.createElement('div', { className: 'table-card' },
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Resort'),
            React.createElement('th', null, 'Owner'),
            React.createElement('th', null, 'Location'),
            React.createElement('th', null, 'Status'),
            React.createElement('th', null, 'Bookings'),
            React.createElement('th', null, 'Rating'),
            React.createElement('th', null, 'Actions')
          )
        ),
        React.createElement('tbody', null,
          resorts.map(resort =>
            React.createElement('tr', { key: resort.id },
              React.createElement('td', { style: { fontWeight: '600' } }, resort.name),
              React.createElement('td', null, resort.owner),
              React.createElement('td', null, resort.location),
              React.createElement('td', null,
                React.createElement('span', { className: 'status ' + resort.status },
                  resort.status.charAt(0).toUpperCase() + resort.status.slice(1)
                )
              ),
              React.createElement('td', null, resort.bookings),
              React.createElement('td', null, resort.rating > 0 ? '★ ' + resort.rating : '—'),
              React.createElement('td', null,
                React.createElement('button', {
                  className: 'btn btn-primary',
                  style: { padding: '4px 12px' },
                  onClick: () => alert('Manage resort: ' + resort.name),
                }, 'Manage')
              )
            )
          )
        )
      )
    )
  );
}

// ---- Settings Page ----
function SettingsPage() {
  return React.createElement('div', null,
    React.createElement('div', { className: 'settings-section' },
      React.createElement('h3', null, 'General Settings'),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Platform Name'),
        React.createElement('input', { type: 'text', value: 'Resortify', readOnly: true })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Default Currency'),
        React.createElement('select', { defaultValue: 'USD' },
          React.createElement('option', { value: 'USD' }, 'USD ($)'),
          React.createElement('option', { value: 'PHP' }, 'PHP (₱)'),
          React.createElement('option', { value: 'EUR' }, 'EUR (€)')
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', null, 'Commission Rate (%)'),
        React.createElement('input', { type: 'number', defaultValue: 10 })
      )
    ),
    React.createElement('div', { className: 'settings-section' },
      React.createElement('h3', null, 'System Health'),
      React.createElement('div', { style: { display: 'flex', gap: '24px' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: '13px', color: '#7a8a9a' } }, 'Server Status'),
          React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', color: '#0E7A56', marginTop: '4px' } }, '✅ Online')
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: '13px', color: '#7a8a9a' } }, 'API Response'),
          React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', color: '#0E7A56', marginTop: '4px' } }, '~45ms')
        ),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: '13px', color: '#7a8a9a' } }, 'Active Sessions'),
          React.createElement('div', { style: { fontSize: '16px', fontWeight: '700', marginTop: '4px' } }, '342')
        )
      )
    ),
    React.createElement('div', { className: 'settings-section' },
      React.createElement('h3', null, 'Danger Zone'),
      React.createElement('button', {
        className: 'btn btn-danger',
        onClick: () => { if (confirm('Are you sure?')) alert('Action performed'); },
      }, 'Clear Cache'),
      React.createElement('button', {
        className: 'btn btn-danger',
        style: { marginLeft: '8px' },
        onClick: () => { if (confirm('Export all data?')) alert('Export started'); },
      }, 'Export Data')
    )
  );
}

// ---- App ----
function App() {
  const [page, setPage] = React.useState('dashboard');
  const [key, setKey] = React.useState(0);

  const handleNavigate = (p) => {
    if (p === 'logout') {
      alert('Logged out');
      return;
    }
    setPage(p);
    setKey(k => k + 1);
  };

  const pages = {
    dashboard: DashboardPage,
    users: UsersPage,
    resorts: ResortsPage,
    settings: SettingsPage,
  };

  const PageComponent = pages[page] || DashboardPage;

  return React.createElement(Layout, { activePage: page, onNavigate: handleNavigate },
    React.createElement(PageComponent, { key: key })
  );
}

// ---- Mount ----
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
