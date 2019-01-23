let fs = require('fs'),
    file = process.argv[2] || '1897_Dv_adr-kal1.xml';

// console.log('\n file:', file, ':');

let content = fs.readFileSync('in/' + file, 'utf8');
if (content) {
	let arr = content.split('\n'),
		famReg = /<f>(.+)<\/f>/,
		cnt = 0,
		outArr = [];

	for (let i = 0, st = '', len = arr.length; i < len; i++) {
		let it = arr[i],
			pt = famReg.exec(it);
		if(pt && pt.length === 2) {
			let nst = pt[1];
			if(st && nst === '—') {
				it = it.replace(famReg, '<f>' + st + '</f>');
				cnt++;
			} else {
				st = nst;
			}
		}
		outArr.push(it);
	}
	fs.writeFileSync('dist/' + file, outArr.join('\n'));
	console.log('\n Замен: ', cnt);
} else {
	console.log('Файл: ', file, ' не найден.');
}
