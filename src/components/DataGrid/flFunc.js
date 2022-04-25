const rows = [
    { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { _id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { _id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { _id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { _id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { _id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { _id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { _id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { _id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

let operators = {
    '==': (a, b) => a == b,
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
}



let fl = [{
    key: "firstName", mt: [{
        label: "Stark", op: "==", with: "Jon",active:false
    }]
}, {
    key: "age", mt: [{
        label: "Stark", op: ">", with: 40,active:true
    }]
}]



let flll=fl.map(_fl=>({..._fl,mt:_fl.mt.filter(each=>each.active)})).filter(e=>e.mt.length)
flll


let ddw = rows.filter(row => {
    for (efl of fl) {
        let key = efl.key
        let mt = efl.mt

        let matches = mt.some(e => operators[e.op](row[key],e.with))

        if (matches) {
            return true
        }


    }

})

let dd = rows.some(e => e._id == 1)


ddw