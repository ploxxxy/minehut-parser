const object = {
    "server": {
      "categories": [],
      "inheritedCategories": [],
      "purchased_icons": [
        "61bcbadedaa26600c58da35d",
        "61bcbaf3daa26600c58da69f",
        "5eb9c1e69467b81c8d17b0c1",
        "5fdcf5a47968deb9174b320f",
        "6172e14622a0d100928170e9",
        "6172e205ba3e7c00755da63b"
      ],
      "backup_slots": 0,
      "suspended": false,
      "server_version_type": "VELOCITY",
      "proxy": true,
      "connectedServers": [
        "61d0bc47561e360090c68032",
        "61bcc5e619673d00dfcdeac2",
        "61a956baed401a007cb2de08",
        "61d9da4bcda66c00853c93b8",
        "61fea7053d508004a188adb1"
      ],
      "_id": "61d08cfec6e2d60084b78b47",
      "motd": "&dGens &6BoxPVP&a SMP 1.18\n&eParkour&c Lifesteal&4 ❤",
      "visibility": true,
      "server_plan": "MONTHLY_10gb",
      "storage_node": "s1",
      "owner": "618da8b71d99d700867a4e15",
      "name": "PlayInABox",
      "name_lower": "playinabox",
      "creation": 1641057534330,
      "platform": "java",
      "credits_per_day": 293.3333333333333,
      "__v": 0,
      "port": 25575,
      "last_online": 1645054746853,
      "active_icon": "6172e205ba3e7c00755da63b",
      "icon": "TARGET",
      "online": true,
      "playerCount": 194,
      "rawPlan": "MONTHLY_10gb",
      "activeServerPlan": "MH Unlimited"
    }
  }

 
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
