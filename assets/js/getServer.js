new gridjs.Grid({
    width: '1460px',
    columns: [{
        name: 'Name',
        data: row => row.name,
        formatter: cell => { document.title = `${cell} - Minehut server lookup`; return cell },
    },{
        name: 'Categories',
        data: row => row.categories.join(' ') || '-'
    },{
        name: 'Raw Motd',
        data: row => row.motd,
        width: '20%'
    },{
        name: 'Created',
        data: row => row.creation,
        formatter: (cell) => new Date(cell).toLocaleString()
    },{
        name: 'Online',
        data: row => row.online ? `Yes (${row.playerCount} players)` : new Date(row.last_online).toLocaleDateString()
    },{
        name: 'Server Type',
        data: row => row.server_version_type
    },{
        name: 'Active Plan',
        data: row => `${row.activeServerPlan} (${row.rawPlan})` 
    },{
        name: 'Connected Servers',
        data: row => row.connectedServers,
        formatter: (cell) => gridjs.html(cell.join(' ').replace(/([^\s]+)/g, '<a href="/server.html?q=$1" target="_blank">$1</a>') || '-')
    },{
        name: 'Proxy',
        data: row => row.proxy ? 'Yes' : 'No'
    },{
        name: 'Credits per day',
        data: row => row.credits_per_day.toFixed()
    }],

    server: {
        url: 'https://api.minehut.com/server/' + window.location.search.substring(3),
        then: data => [data.server]
    },
    
    style: {
        td: {
            'padding': '6px 12px',
            'color': '#ccc'
        }
    }

}).render(document.getElementById('table'))
