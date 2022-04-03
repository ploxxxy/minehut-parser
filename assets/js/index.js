new gridjs.Grid({
    fixedHeader: true,
    width: '1460px',
    height: '700px',
    search: true,
    sort: true,
    pagination: {
        enabled: true,
        limit: 10,
        buttonsCount: 1,
    },
    columns: 
    [{
        name: 'ID',
        data: row => row[0].staticInfo._id,
        formatter: (cell) => gridjs.html(`<a href="/server.html?q=${cell}" target="_blank">${cell}</a>`),
    },{
        name: 'Name',
        data: row => row[0].name,
    },{
        name: 'MOTD',
        data: row => row[0].motd,
        formatter: (cell) => cell.replace(/&.{1}/g, ''),
        sort: { enabled: false },
        width: '25%',
    },{
        name: 'Players',
        data: row => `${row[0].playerData.playerCount}/${row[0].staticInfo.planMaxPlayers}`,
        sort: {
            compare: (a, b) => {
                a = Number(a.split('/')[0])
                b = Number(b.split('/')[0])
                if (a > b) {
                    return 1
                } else if (a < b) {
                    return -1
                } else {
                    return 0
                }
            }
        }
    },{
        name: 'Server Plan',
        data: row => row[0].staticInfo.serverPlan,
        sort: {
            compare: (a, b) => {
                function getWeight(plan) {
                    const weight = {
                        'Free': 0,
                        'Daily': 1,
                        'MH20': 2,
                        'YEARLY MH20': 3,
                        'MH35': 4,
                        'YEARLY MH35': 5,
                        'MH75': 6,
                        'YEARLY MH75': 7,
                        'MH Unlimited': 8,
                        'YEARLY MH Unlimited': 9
                    }
                    return weight[plan] || weight['Free']
                }

                if (getWeight(a) > getWeight(b)) {
                    return 1;
                  } else if (getWeight(a) < getWeight(b)) {
                        return -1;
                  } else {
                    return 0;
                  }
            }
        }
    },{
        name: 'Connected Servers',
        data: row => row[0].staticInfo.connectedServers,
        formatter: (cell) => gridjs.html(cell.join(' ').replace(/([^\s]+)/g, '<a href="/server.html?q=$1" target="_blank">$1</a>') || '-'),
    },{
        name: 'Connectable',
        data: row => row[0].connectable,
        formatter: (cell) => gridjs.html(cell ? '✔&#xFE0F' : '❌&#xFE0F'),
        sort: { enabled: false }
    },{
        name: 'Visibility',
        data: row => row[0].visibility,
        formatter: (cell) => gridjs.html(cell ? '✔&#xFE0F' : '❌&#xFE0F'),
        sort: { enabled: false }
    },],
    server: {
        url: 'https://api.minehut.com/servers',
        then: data => data.servers.map(server => [server])
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
