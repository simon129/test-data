
export default async function (data) {
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

function getTimeString(date) {
    // return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return `${date.getFullYear()}/${pad2(date.getMonth() + 1)}/${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

function pad2(str) {
    return str.toString().length == 1
        ? '0' + str
        : str;
}