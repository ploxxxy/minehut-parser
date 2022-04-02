new gridjs.Grid({
    fixedHeader: true,
    width: '1360px',
    height: '680px',
    search: true,
    pagination: {
        enabled: true,
        limit: 10,
        buttonsCount: 1,
    },

    columns: 
    [{
        name: 'ID',
    },{
        name: 'Name',
    },{
        name: 'MOTD',
        formatter: (cell) => cell.replace(/&.{1}/g, '')
    },{
        name: 'Players',
        data: (row) => row[3] + '/' + row[4]
    },{
        name: 'test1',
        hidden: true
    },{
        name: 'test2',
        hidden: true
    },{
        name: 'Service Start Date',
        formatter: (cell) => new Date(cell).toLocaleDateString(),
        hidden: true
    },{
        name: 'Server Plan',
    },{
        name: 'Platform',
        hidden: true
    },{
        name: 'Connected Servers',
        // formatter: (cell) => cell.toString().split(',').join(', ') || '-',
        formatter: (cell) => {

        },
        width: '225px'
    },{
        name: 'Connectable',
        formatter: (cell) => cell ? 'Yes' : 'No'
    },{
        name: 'Visibility',
        formatter: (cell) => cell ? 'Yes' : 'No'
    },],

    server: {
        url: 'https://api.minehut.com/servers',
        then: data => data.servers.map(server =>
            [server.staticInfo._id, server.name, server.motd, server.playerData.playerCount, server.staticInfo.planMaxPlayers, server.staticInfo.serviceStartDate, server.staticInfo.serverPlan, server.staticInfo.platform, server.staticInfo.connectedServers, server.connectable, server.visibility]
            ),
        handle: (res) => {
            if (res.status === 404) return {data: []};
            if (res.ok) {
                return res.json();
            }

            throw Error('oh no :(');
        },
    },

    style: {
        td: {
            'padding': '6px 12px',
            'color': '#ccc'
        }
    },

    language: {
        'search': {
            'placeholder': '🔍 Search...'
        },
        'pagination': {
            'showing': 'Displaying',
            'results': () => 'servers'
        }
    }
  }).render(document.getElementById('table'));