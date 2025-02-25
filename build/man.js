import { getArgv, minActions, printHelp, readMono } from './core/utils/index.js';
import { existsSync } from 'node:fs';
const mono = readMono();
const list = mono
    ? [
        '- yarn fmt',
        '- yarn fmt:site',
        '- yarn fmt:check',
        '- yarn man 〈cmd〉',
        '- yarn new -c 〈path:lang〉',
        '- yarn vars -c 〈path:lang〉 〈list〉',
        '- yarn srv -c -D -p 〈port〉',
        '- yarn wrk -b -d -DCSJHI',
        '- yarn doc',
        '- yarn logo',
    ]
    : [
        '- yarn fmt',
        '- yarn fmt:site 〈site〉',
        '- yarn fmt:check',
        '- yarn man 〈cmd〉',
        '- yarn copy 〈new-site-name〉',
        '- yarn new -c 〈site〉 〈path:lang〉',
        '- yarn vars -c 〈site〉 〈path:lang〉 〈list〉',
        '- yarn srv -c -D -p 〈port〉 〈site〉',
        '- yarn wrk -b -d -DCSJHI 〈site〉',
        '- yarn doc',
        '- yarn logo',
    ];
const argv = getArgv();
const cmd = argv._[0] ?? '';
minActions('man', argv);
if (cmd == '') {
    console.info(list.join('\n'));
}
else if (existsSync(`src/help/yarn-${cmd}.txt`)) {
    printHelp(cmd);
}
else {
    printHelp('man', {
        error: `Unknown command: ${cmd}`,
    });
}
