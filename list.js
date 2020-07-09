var useGrid = true;

var insertCss = true;

export default async function (div, data) {
    data.sort((a, b) => b.ts - a.ts);
    data.forEach((x) => {
        x.win.sort();
        x.lose.sort();
    });

    if (useGrid) {
        if (insertCss) {
            insertCss = false;
            var link = document.createElement("link")
            link.setAttribute("rel", "stylesheet")
            link.setAttribute("href", 'https://unpkg.com/gridjs/dist/theme/mermaid.min.css')
            document.getElementsByTagName("head")[0].appendChild(link)
        }

        import('https://unpkg.com/gridjs@1.10.0/dist/gridjs.production.es.min.js')
            .then(({ Grid }) => {

                var grid = new Grid({
                    search: true,
                    sort: true,
                    columns: [
                        {
                            name: 'time',
                        },
                        {
                            name: 'win',
                            sort: false,
                        },
                        {
                            name: 'lose',
                            sort: false,
                        },
                    ],
                    data: data.map(({ ts, win, lose }) => {
                        return [getTimeString(new Date(ts)), win.toString(), lose.toString()]
                    }),
                }).render(div);

                // for second time
                grid.forceRender();
            });
        return '';

    } else {
        var output = [
            '<table>',
            '<thead>',
            '<th>time</th>', '<th>win</th>', '<th>lose</th>',
            '</thead>',
            '<tbody>',
        ];

        output.push(...data.map(({ ts, win, lose }) => {
            return `
<tr>
    <td>${getTimeString(new Date(ts))}</td>
    <td>${win}</td>
    <td>${lose}</td>
</tr>`;
        }));

        output.push('</tbody>', '</table>');
        return output.join('')
    }
}

function getTimeString(date) {
    // return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return `${date.getFullYear()}/${pad2(date.getMonth() + 1)}/${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

function pad2(str) {
    return str.toString().length == 1
        ? '0' + str
        : str;
}
