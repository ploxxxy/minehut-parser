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
  resizable: true,
  columns: [
    {
      name: 'ID',
      data: (row) => row[0].staticInfo._id,
      formatter: (cell) =>
        gridjs.html(
          `<a href="./server.html?q=${cell}" target="_blank">${cell}</a>`
        ),
    },
    {
      name: 'Name',
      data: (row) => row[0].name,
    },
    {
      name: 'MOTD',
      data: (row) => row[0].motd,
      formatter: (cell) => {
        try {
          const component = MiniMessage.miniMessage().deserialize(cell)
          return gridjs.html(MiniMessage.toHTML(component))
        } catch (error) {
          return gridjs.html(cell)
        }
      },
      sort: { enabled: false },
    },
    {
      name: 'Players',
      width: '8%',
      data: (row) => `${row[0].playerData.playerCount}/${row[0].maxPlayers || '?'}`,
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
        },
      },
    },
    {
      name: 'Server Plan',
      width: '12%',
      data: (row) => row[0].staticInfo.serverPlan,
      sort: {
        compare: (a, b) => {
          function getWeight(plan) {
            let cleanPlan = plan

            if (plan === 'External Server') {
              cleanPlan = 'External'
            }

            if (plan.includes('Custom plan')) {
              cleanPlan = 'Custom'
            }

            const weight = {
              // idk the actual weights so im going to
              // guess the best sounding ones
              External: 0,
              Starter: 1,
              Standard: 2,
              Pro: 3,
              Ultimate: 4,
              Custom: 5,
            }
            return weight[cleanPlan] || 0
          }

          if (getWeight(a) > getWeight(b)) {
            return 1
          }

          if (getWeight(a) < getWeight(b)) {
            return -1
          }
          
          return 0
        },
      },
    },
    {
      name: 'Connected Servers',
      data: (row) => row[0].staticInfo.connectedServers,
      formatter: (cell) =>
        gridjs.html(
          cell
            .join(' ')
            .replace(
              /([^\s]+)/g,
              '<a href="./server.html?q=$1" target="_blank">$1</a>'
            ) || '-'
        ),
    },
    {
      name: 'Joinable',
      data: (row) => row[0].connectable,
      formatter: (cell) => gridjs.html(cell ? '✔&#xFE0F' : '❌&#xFE0F'),
      sort: { enabled: false },
    },
  ],
  server: {
    url: 'https://api.minehut.com/servers',
    then: (data) => {
      console.log(data)

      return data.servers.map((server) => [server])
    },
  },
  style: {
    td: {
      padding: '6px 12px',
      color: '#ccc',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  language: {
    search: {
      placeholder: '🔍 Search...',
    },
    pagination: {
      showing: 'Displaying',
      results: () => 'servers',
    },
  },
}).render(document.getElementById('table'))
